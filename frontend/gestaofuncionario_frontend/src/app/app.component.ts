import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  // Adicionar imports
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestaofuncionario-frontend';
}
