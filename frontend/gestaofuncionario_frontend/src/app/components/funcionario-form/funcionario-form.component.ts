import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionarioRequest } from '../../models/funcionario.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private service = inject(FuncionarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public funcionarioForm: FormGroup;


  private funcionarioId = signal<number | null>(null);
  public isEditMode = computed(() => this.funcionarioId() !== null);
  public isLoading = signal(false);

  constructor() {

    this.funcionarioForm = this.fb.group({

      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      salario: [null, [Validators.required, Validators.min(0.01)]],
      dataAdmissao: [null, [Validators.required, this.dataNaoFuturaValidator]]
    });
  }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.funcionarioId.set(id);
      this.carregarFuncionario(id);
    }
  }


  private dataNaoFuturaValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataInput = new Date(control.value + 'T00:00:00');

    return dataInput > hoje ? { dataFutura: true } : null;
  }

  carregarFuncionario(id: number): void {
    this.isLoading.set(true);
    this.service.buscarPorId(id).subscribe({
      next: (func) => {

        this.funcionarioForm.patchValue(func);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar funcionário', err);
        alert('Funcionário não encontrado.');
        this.router.navigate(['/funcionarios']);
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.funcionarioForm.invalid) {
      this.funcionarioForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const request: FuncionarioRequest = this.funcionarioForm.value;

    if (this.isEditMode()) {

      this.service.atualizar(this.funcionarioId()!, request).subscribe({
        next: () => this.handleSuccess('Funcionário atualizado com sucesso!'),
        error: (err) => this.handleError(err)
      });
    } else {

      this.service.criar(request).subscribe({
        next: () => this.handleSuccess('Funcionário cadastrado com sucesso!'),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleSuccess(mensagem: string): void {
    alert(mensagem);
    this.isLoading.set(false);
    this.router.navigate(['/funcionarios']);
  }

 private handleError(err: HttpErrorResponse): void {
  console.error('Erro ao salvar', err);
  this.isLoading.set(false);

  alert(err.error?.erro || 'Ocorreu um erro ao salvar.');
}

  get nome() { return this.funcionarioForm.get('nome'); }
  get email() { return this.funcionarioForm.get('email'); }
  get cargo() { return this.funcionarioForm.get('cargo'); }
  get salario() { return this.funcionarioForm.get('salario'); }
  get dataAdmissao() { return this.funcionarioForm.get('dataAdmissao'); }
}
