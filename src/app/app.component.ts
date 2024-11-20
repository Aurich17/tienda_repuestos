import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth_service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isBandejaPrincipal = false;
  constructor(public authService: AuthService,private router: Router) {}
  title = 'tienda_repuestos';
  ngOnInit(){
  }
}
