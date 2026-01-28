import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../../interfaces/response.model';
import { AuthService } from '../../auth/AuthServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authService = inject(AuthService);

  constructor(private http:HttpClient) { }


  listar(url: string,page:number=0,size:number=2): Observable<response> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      });

      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

      return this.http.get<response>(url, { headers,params });
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
