import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response.model';
import { response } from '../../interfaces/response.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(url: string, data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url, data).pipe(
      tap((authResult) => this.setSession(authResult)),
      shareReplay(),
    );
  }

  private setSession(authResult: AuthResponse): void {
    const expiresAt = new Date(authResult.jwt.exp);
    localStorage.setItem('id_token', authResult.jwt.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user_id', authResult.id.toString());
    localStorage.setItem('username', authResult.username);
    localStorage.setItem('roles', JSON.stringify(authResult.roles));
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('user_id');
    return id ? parseInt(id, 10) : null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getRolesFromStorage(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  public isLoggedIn() {
    const expiration = this.getExpiration();
    if (!expiration) {
      return false;
    }
    return Date.now() < expiration.getTime();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration(): Date | null {
    const expiration = localStorage.getItem('expires_at');
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return new Date(expiresAt);
  }

  getRoles(): string | null{
    return localStorage.getItem('roles');
  }
}
