import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { LoginComponent } from './login/login.component';
import { DepartamentoListComponent } from './components/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './components/departamento-form/departamento-form.component';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'departamentos',
    component: DepartamentoListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'departamentos/novo',
    component: DepartamentoFormComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'departamentos/:id',
    component: DepartamentoFormComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },

  {
    path: 'funcionarios',
    component: FuncionarioListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'funcionarios/novo',
    component: FuncionarioFormComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'funcionarios/:id',
    component: FuncionarioFormComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },

  { path: '**', redirectTo: 'login' }
];
