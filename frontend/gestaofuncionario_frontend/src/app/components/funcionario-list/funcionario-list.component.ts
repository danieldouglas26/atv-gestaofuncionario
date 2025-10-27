import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';


import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent implements OnInit {


  funcionarios$!: Observable<Funcionario[]>;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.funcionarios$ = this.funcionarioService.listar().pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar funcionários.' });
        return of([]);
      })
    );
  }


  novo(): void {
    this.router.navigate(['/funcionarios/novo']);
  }


  editar(id: number): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }


  inativar(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja inativar este funcionário?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.funcionarioService.inativar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Funcionário inativado.' });
            this.loadFuncionarios();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.erro || 'Falha ao inativar.' });
          }
        });
      }
    });
  }
}
