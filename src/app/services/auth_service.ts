// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string = '';

  private loggedIn = new BehaviorSubject<boolean>(false); // Estado inicial (no logueado)

  // Observable para el estado de autenticación
  public isLoggedIn$ = this.loggedIn.asObservable();

  // Función para iniciar sesión
  login() {
    this.loggedIn.next(true); // Actualizar el estado a logueado
  }

  // Función para cerrar sesión
  logout() {
    this.loggedIn.next(false); // Actualizar el estado a no logueado
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    // Aquí puedes implementar tu lógica para verificar si el usuario está logueado
    return !!this.userRole;
  }
}
