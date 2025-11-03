import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.authService.authState$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
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
