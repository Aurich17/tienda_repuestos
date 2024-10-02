import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../login/domain/request/login_request';
import {CelularResponse, Marca } from '../administrador_panel/domain/response/administrador_response';
import { CelularConPartes } from '../administrador_panel/domain/request/administrador_request';
import { PayPalResponse } from '../bandeja-principal/components/shopping-cart/response/response_shopping';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';  // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  insertaUsuario(item: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, item);
  }

  loginUsuario(loginRequest: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', loginRequest.username);
    body.set('password', loginRequest.password);

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers }).pipe(
      tap((response: any) => {
        // Suponiendo que el token viene en la respuesta como "access_token"
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
      })
    );
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

  registrarCelular(celular: CelularConPartes, imagen: File): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append('marca_id', celular.marca_id.toString());
    formData.append('modelo', celular.modelo);
    formData.append('precio_completo', celular.precio_completo.toString());
    formData.append('descripcion', celular.descripcion);
    formData.append('imagen', imagen);  // Imagen como archivo
    formData.append('partes', JSON.stringify(celular.partes));  // Convertir las partes a string JSON

    return this.http.post(`${this.apiUrl}/registrar_celular`, formData, { headers });
  }

  getCelulares(): Observable<CelularResponse[]> {  // Cambia el tipo a Observable<Marca[]>
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<CelularResponse[]>(`${this.apiUrl}/celulares/`, { headers });  // Usa el endpoint correcto
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
}
