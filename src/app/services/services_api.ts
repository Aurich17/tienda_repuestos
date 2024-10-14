import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../login/domain/request/login_request';
import {CelularResponse,Tipos } from '../administrador_panel/domain/response/administrador_response';
import { InsertaCelularRequest } from '../administrador_panel/domain/request/administrador_request';
import { PayPalResponse } from '../bandeja-principal/components/shopping-cart/response/response_shopping';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';  // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  insertaUsuario(item: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, item);
  }

  loginUsuario(loginRequest: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', loginRequest.username);
    body.set('password', loginRequest.password);

    return this.http.post(`${this.apiUrl}/api/login`, body.toString(), { headers }).pipe(
      tap((response: any) => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
      }),
      catchError((error) => {
        console.error('Error en la solicitud de login:', error);
        return throwError(error);
      })
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No token found in localStorage');
      return throwError('Token is missing');
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    console.log(headers);

    return this.http.get(`${this.apiUrl}/api/users/profile`, { headers });
  }

  getCelulares(): Observable<CelularResponse[]> {  // Cambia el tipo a Observable<Marca[]>
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<CelularResponse[]>(`${this.apiUrl}/api/celulares/`, { headers });  // Usa el endpoint correcto
  }

  createPayment(total: number, currency: string): Observable<PayPalResponse> {
    // Suponiendo que haces una solicitud POST a tu API
    return this.http.post<PayPalResponse>(`${this.apiUrl}/create-payment`, { total, currency });
  }

  executePayment(paymentId: string, payerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/payment/success?paymentId=${paymentId}&PayerID=${payerId}`);
  }

  getPayPalClientId(): Observable<any> {
    return this.http.get(`${this.apiUrl}/paypal-client-id`);
  }

  getTipos(tabla_tab: string): Observable<Tipos[]> {
    return this.http.post<Tipos[]>(`${this.apiUrl}/api/tipos`, {tabla_tab});  // Cambiar tab_table por tabla_tab
  }

  insertPhone(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/insert_celular`, formData);
  }
}
