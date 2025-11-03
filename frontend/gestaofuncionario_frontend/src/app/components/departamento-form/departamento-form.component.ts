import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { DepartamentoService } from '../../services/departamento.service';
import { catchError, throwError } from 'rxjs';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PanelModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './departamento-form.component.html',
  styleUrl: './departamento-form.component.scss'
})


export class DepartamentoFormComponent implements OnInit, CanComponentDeactivate {

  form: FormGroup;
  isEditMode = false;
  departamentoId: number | null = null;
  formTitle = 'Novo Departamento';

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      sigla: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.departamentoId = +idParam;
      this.formTitle = 'Editar Departamento';

      this.departamentoService.buscarPorId(this.departamentoId).subscribe({
        next: (depto) => {
          this.form.patchValue(depto);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar departamento.' });
          this.router.navigate(['/departamentos']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.isEditMode
      ? this.departamentoService.atualizar(this.departamentoId!, this.form.value)
      : this.departamentoService.criar(this.form.value);

    request.pipe(
      catchError(err => {

        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.erro || 'Falha ao salvar.' });
        return throwError(() => err);
      })
    ).subscribe({
      next: () => {

        this.form.reset(this.form.value);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Departamento ${this.isEditMode ? 'atualizado' : 'criado'}!` });
        this.router.navigate(['/departamentos']);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/departamentos']);
  }


  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }


  hasUnsavedChanges(): boolean {

    if (this.form.dirty) {
      return true;
    }

    return false;
  }
}
