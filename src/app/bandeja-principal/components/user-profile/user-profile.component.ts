import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  name_user = localStorage.getItem('user_name')?.toString().toUpperCase()
  first_letter = this.name_user != null ? this.name_user[0].toUpperCase() : ''
}
