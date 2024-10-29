// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './services_api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string = '';
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenPresent()); // Inicializa con el estado actual del token
  // Observable para el estado de autenticación
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private apiService: ApiService, private router: Router) {}
  // Función para verificar si hay un token en localStorage
  private isTokenPresent(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
  // private loggedIn = new BehaviorSubject<boolean>(false); // Estado inicial (no logueado)

  // // Observable para el estado de autenticación
  // public isLoggedIn$ = this.loggedIn.asObservable();

  // Función para iniciar sesión
  login() {
    this.loggedIn.next(true);  // Actualizar el observable
  }

  // Función para cerrar sesión
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    this.loggedIn.next(false); // Actualizar el observable
    this.router.navigate(['/store']);
  }

  isAdmin(): boolean {
    return localStorage.getItem('user_role') === 'admin';
  }

  setUserRole(role: string) {
    localStorage.setItem('user_role', role); // Almacenar el rol
  }


  getUserRole(): string {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return this.isTokenPresent(); // Revisa si hay un token en localStorage
  }


   // Método para chequear el estado del login
   checkLoginStatus() {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Si el token está presente, asumimos que sigue logueado
      this.apiService.getProfile().subscribe(
        (profile) => {
          let rol = profile.is_admin == true ? 'admin' : 'user';
          this.setUserRole(rol); // Define el rol según el perfil
          this.loggedIn.next(true); // Actualizar el observable a logueado
        },
        (error) => {
          console.error('Error al obtener el perfil:', error);
          this.logout(); // Si falla, cerrar sesión
        }
      );
    } else {
      this.loggedIn.next(false); // Actualizar el observable a no logueado
      this.logout();
    }
  }
}
