import { Component } from '@angular/core';
import { AuthService } from './services/auth_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  title = 'tienda_repuestos';
  ngOnInit(){
    console.log('ESTO ES DEL PRINCIPAL')
    console.log(this.authService.isAdmin())
  }
}
