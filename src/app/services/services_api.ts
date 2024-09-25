import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';  // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  insertaUsuario(item: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/insert_user`, item);
  }

  loginUsuario(item: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('username', item.username);
    body.set('password', item.password);

    return this.http.post(`${this.apiUrl}/token`, body.toString(), { headers });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get(`${this.apiUrl}/users/profile`, { headers });
  }

}
