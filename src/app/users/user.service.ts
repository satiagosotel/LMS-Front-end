import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response.model';
import { AuthService } from '../services/AuthServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authService = inject(AuthService);

  constructor(private http:HttpClient) { }


  listar(url: string): Observable<response> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.get<response>(url, { headers });
    }
  
    crear(url: string, data: any): Observable<response> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.post<response>(url, data, { headers });
    }
  
    actualizar(url: string, data: any): Observable<response> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.put<response>(url, data, { headers });
    }
  
    eliminar(url: string): Observable<response> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });
      return this.http.delete<response>(url, { headers });
    }
}
