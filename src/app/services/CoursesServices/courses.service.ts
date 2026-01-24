import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../../interfaces/response.model';
import { AuthService } from '../AuthServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  listar(url: string): Observable<response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<response>(url, { headers });
  }
}
