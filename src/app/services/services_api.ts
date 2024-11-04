import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from '../login/domain/request/login_request';
import {CelularResponse,Tipos, UserResponse } from '../administrador_panel/domain/response/administrador_response';
import { InsertaCelularRequest, paypalRequest, PhoneListaRequest, TipoListaRequest, UserListaRequest, UserRequest } from '../administrador_panel/domain/request/administrador_request';
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

  getCelulares(phone_request:PhoneListaRequest): Observable<CelularResponse[]> {
    return this.http.post<CelularResponse[]>(`${this.apiUrl}/api/celulares`,phone_request);
  }

  createPayment(total: number, currency: string): Observable<PayPalResponse> {
    // Suponiendo que haces una solicitud POST a tu API
    return this.http.post<PayPalResponse>(`${this.apiUrl}/api/create-payment`, { total, currency });
  }

  executePayment(request:paypalRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/payment/success`,request);
  }

  getPayPalClientId(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/paypal-client-id`);
  }

  getTipos(request:TipoListaRequest): Observable<Tipos[]> {
    return this.http.post<Tipos[]>(`${this.apiUrl}/api/tipos`,request);  // Cambiar tab_table por tabla_tab
  }

  insertPhone(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/insert_celular`, formData);
  }

  getUsers(user_request:UserListaRequest): Observable<UserResponse[]> {
    return this.http.post<UserResponse[]>(`${this.apiUrl}/api/user`,user_request);  // Cambiar tab_table por tabla_tab
  }

  apiUserManage(requestUser: UserRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user_manage`, requestUser);
 }
}
