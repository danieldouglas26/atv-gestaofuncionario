import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestao-funcionarios-frontend';

  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {

    this.isAuthenticated$ = this.authService.authState$;
  }
}
