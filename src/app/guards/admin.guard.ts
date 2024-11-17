import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from '../services/services_api';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.apiService.getProfile().pipe(
      tap(profile => {
        if (!profile.is_admin) {
          this.router.navigate(['/']); // Redirigir a la página de inicio o a donde quieras
        }
      }),
      // Si el perfil no es admin, retornar false
      map(profile => profile.is_admin)
    );
  }
}
