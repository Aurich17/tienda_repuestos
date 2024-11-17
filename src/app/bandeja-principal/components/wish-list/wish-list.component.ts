import { Component } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {
  name_user = localStorage.getItem('user_name')?.toString().toUpperCase()
  first_letter = this.name_user != null ? this.name_user[0].toUpperCase() : ''
}
