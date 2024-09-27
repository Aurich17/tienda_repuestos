import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../login/domain/request/login_request';
import { Marca } from '../administrador_panel/domain/response/administrador_response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';  // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  insertaUsuario(item: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/insert_user`, item);
  }

  loginUsuario(item: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('username', item.username);
    body.set('password', item.password);

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get(`${this.apiUrl}/users/profile`, { headers });
  }

  getMarcas(): Observable<Marca[]> {  // Cambia el tipo a Observable<Marca[]>
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<Marca[]>(`${this.apiUrl}/marcas/`, { headers });  // Usa el endpoint correcto
  }
}
