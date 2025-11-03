import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'authToken';
  private readonly EMAIL_KEY = 'userEmail';


  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  public authState$ = this.authState.asObservable();

  constructor(private router: Router) {

    this.authState.next(this.isAuthenticated());
  }


  login(email: string): void {

    const mockToken = `mock-token-${new Date().getTime()}`;
    localStorage.setItem(this.TOKEN_KEY, mockToken);
    localStorage.setItem(this.EMAIL_KEY, email);


    this.authState.next(true);


    this.router.navigate(['/departamentos']);
  }


  logout(): void {

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);


    this.authState.next(false);


    this.router.navigate(['/login']);
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }


  getUserEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
