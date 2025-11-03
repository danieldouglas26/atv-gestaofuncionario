import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gestao-de-pessoal';

  isAuthenticated$: Observable<boolean>;
  userEmail: string | null = null;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.authState$;
  }


  ngOnInit(): void {

    this.authService.authState$.subscribe(isAuth => {
      if (isAuth) {
        this.userEmail = this.authService.getUserEmail();
      } else {
        this.userEmail = null;
      }
    });
  }


  logout(): void {
    this.authService.logout();
  }
}
