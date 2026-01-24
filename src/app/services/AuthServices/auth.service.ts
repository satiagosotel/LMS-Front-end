import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(url: string, data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url, data).pipe(
      tap((authResult) => this.setSession(authResult)),
      shareReplay()
    );
  }

  private setSession(authResult: AuthResponse): void {
    const expiresAt = new Date(authResult.exp * 1000);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
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
}
