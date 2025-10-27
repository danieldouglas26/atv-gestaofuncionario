import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Removido RouterLink
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';

// --- NOVOS IMPORTS ---
import { DropdownModule } from 'primeng/dropdown';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // RouterLink, // Removido
    PanelModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    ToastModule,
    DropdownModule // Adicionado
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit {

  form: FormGroup;
  isEditMode = false;
  funcionarioId: number | null = null;
  formTitle = 'Novo Funcionário';

  departamentos$!: Observable<Departamento[]>;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required]],
      salario: [null, [Validators.required, Validators.min(0.01)]],
      dataAdmissao: [null, [Validators.required]],
      departamentoId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDepartamentos();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.funcionarioId = +idParam;
      this.formTitle = 'Editar Funcionário';

      this.funcionarioService.buscarPorId(this.funcionarioId).subscribe({
        next: (func) => {
          const dataAdmissaoDate = new Date(func.dataAdmissao + 'T00:00:00');
          this.form.patchValue({
            ...func,
            dataAdmissao: dataAdmissaoDate
          });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar funcionário.' });
          this.router.navigate(['/funcionarios']);
        }
      });
    }
  }

  loadDepartamentos(): void {
    this.departamentos$ = this.departamentoService.listarAtivos().pipe(
      catchError(err => {
        this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Não foi possível carregar os departamentos.' });
        return of([]);
      })
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    const dataFormatada = this.formatarData(formData.dataAdmissao);

    const requestData = {
      ...formData,
      dataAdmissao: dataFormatada
    };

    const request = this.isEditMode
      ? this.funcionarioService.atualizar(this.funcionarioId!, requestData)
      : this.funcionarioService.criar(requestData);

    request.pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.erro || 'Falha ao salvar.' });
        return throwError(() => err);
      })
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Funcionário ${this.isEditMode ? 'atualizado' : 'criado'}!` });
        this.router.navigate(['/funcionarios']);
      }
    });
  }

  private formatarData(date: Date): string {
    if (!date) return '';
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60000));
    return localDate.toISOString().split('T')[0];
  }

  cancelar(): void {
    this.location.back();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
