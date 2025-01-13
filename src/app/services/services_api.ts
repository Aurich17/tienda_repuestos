import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, shareReplay, tap, throwError } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../login/domain/request/login_request';
import {CelularResponse,Tipos, UserResponse, WishListResponse } from '../administrador_panel/domain/response/administrador_response';
import {
  GestionaCelularRequest,
  InsertaCelularRequest,
  InsertTiposRequest,
  insertWishListRequest,
  listaWishListRequest,
  paypalRequest,
  PhoneListaRequest,
  TipoListaRequest,
  UserListaRequest,
  UserRequest } from '../administrador_panel/domain/request/administrador_request';
import { PayPalResponse } from '../bandeja-principal/components/shopping-cart/response/response_shopping';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlMoney = 'https://economia.awesomeapi.com.br/json/last/USD-PEN';
  private apiUrl = 'http://localhost:8000';
  // private apiUrl = 'https://davfix.com'

  //PARA ALMACENAR LOS DATOS QUE SON DE UNA SOLA CARGA
  private celularesCache$: BehaviorSubject<CelularResponse[] | null> = new BehaviorSubject<CelularResponse[] | null>(null);

  clearCache() {
    this.celularesCache$.next(null); // Limpiar el caché cuando sea necesario
  }

  constructor(private http: HttpClient) {}

  insertaUsuario(item: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, item);
  }

  loginUsuario(loginRequest: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', loginRequest.username);
    body.set('password', loginRequest.password);
    body.set('token', loginRequest.token);

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
      return throwError('Token is missing');
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/api/users/profile`, { headers });
  }


  getCelulares(phone_request: PhoneListaRequest, forceReload: boolean = false): Observable<CelularResponse[]> {
    if (!forceReload && this.celularesCache$.value) {
      return of(this.celularesCache$.value);
    }

    return this.http.post<CelularResponse[]>(`${this.apiUrl}/api/celulares`, phone_request).pipe(
      tap((data) => this.celularesCache$.next(data)), // Guardar los datos en caché
      shareReplay(1)  // Compartir la respuesta entre suscriptores
    );
  }



  createPayment(total: number, currency: string): Observable<PayPalResponse> {
    return this.http.post<PayPalResponse>(`${this.apiUrl}/api/paypal/create-order`, { total, currency });
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

  gestionaCelular(formData: GestionaCelularRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/gestionaCelular`, formData);
  }

  getUsers(user_request:UserListaRequest): Observable<UserResponse[]> {
    return this.http.post<UserResponse[]>(`${this.apiUrl}/api/user`,user_request);  // Cambiar tab_table por tabla_tab
  }

  apiUserManage(requestUser: UserRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/usuario/manage`, requestUser);
  }

  insertTipos(requestTipos:InsertTiposRequest):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/insertTipos`, requestTipos);
  }

  insertWishList(requesWishList:insertWishListRequest):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/gestionaWishList`, requesWishList);
  }

  listaWishList(request:listaWishListRequest):Observable<WishListResponse[]>{
    return this.http.post<WishListResponse[]>(`${this.apiUrl}/api/listaWishList`, request);
  }

  userRegister(request:RegisterRequest):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/usuario/newUser`, request);
  }

  //PARA OBTENER EL CAMBIO DE SOLES A DOLARES
  getExchangeRate(): Observable<any> {
    return this.http.get(this.apiUrlMoney);
  }
}
