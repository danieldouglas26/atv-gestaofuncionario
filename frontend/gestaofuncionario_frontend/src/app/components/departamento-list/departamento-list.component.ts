import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento.service';

// Importações do PrimeNG e Angular
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-departamento-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './departamento-list.component.html',
  styleUrl: './departamento-list.component.scss'
})
export class DepartamentoListComponent implements OnInit {

  departamentos$!: Observable<Departamento[]>;

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  loadDepartamentos(): void {
    this.departamentos$ = this.departamentoService.listar().pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar departamentos.' });
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  editar(id: number): void {
    this.router.navigate(['/departamentos/editar', id]);
  }

  inativar(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja inativar este departamento?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.departamentoService.inativar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Departamento inativado.' });
            this.loadDepartamentos(); // Recarrega a lista
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.erro || 'Falha ao inativar.' });
          }
        });
      }
    });
  }

  novo(): void {
    this.router.navigate(['/departamentos/novo']);
  }
}
