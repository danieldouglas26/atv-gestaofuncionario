import { Component, OnInit, inject, signal } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent implements OnInit {

  private service = inject(FuncionarioService);
  private router = inject(Router);

  public funcionarios = signal<Funcionario[]>([]);
  public isLoading = signal(false);

  public filtroCargo = signal('');
  public filtroStatus = signal('');

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.isLoading.set(true);

    const cargo = this.filtroCargo();
    const status = this.filtroStatus();

    let ativo: boolean | undefined = undefined;
    if (status === 'true') ativo = true;
    if (status === 'false') ativo = false;

    this.service.listar(cargo, ativo).subscribe({
      next: (data) => {
        this.funcionarios.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários', err);
        alert('Não foi possível carregar a lista de funcionários.');
        this.isLoading.set(false);
      }
    });
  }

  onEditar(id: number): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }

  onInativar(id: number, nome: string): void {
    if (confirm(`Deseja realmente inativar o funcionário ${nome}?`)) {
      this.service.inativar(id).subscribe({
        next: () => {
          alert('Funcionário inativado com sucesso!');
          this.carregarFuncionarios();
        },
        error: (err) => {
          console.error('Erro ao inativar', err);
          alert(err.error?.erro || 'Erro ao inativar funcionário.');
        }
      });
    }
  }
}
