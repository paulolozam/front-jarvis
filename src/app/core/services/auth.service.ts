// src/app/core/services/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface TokenResponse {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;

  // Signal para saber si está autenticado
  private _token = signal<string | null>(localStorage.getItem('access_token'));
  isAuthenticated = computed(() => !!this._token());

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string | null {
    return this._token();
  }

login(username: string, password: string) {
  return this.http.post<TokenResponse>(`${this.base}/rbac/users/login/`, { username, password })
    .pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this._token.set(res.access);
      })
    );
}

refresh() {
  const refreshToken = localStorage.getItem('refresh_token');
  return this.http.post<{ access: string }>(`${this.base}/token/refresh/`, { refresh: refreshToken })
    .pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access);
        this._token.set(res.access);
      })
    );
}

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._token.set(null);
    this.router.navigate(['/login']);
  }
}
