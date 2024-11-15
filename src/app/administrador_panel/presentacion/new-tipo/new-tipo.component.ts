import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/services_api';

@Component({
  selector: 'app-new-tipo',
  templateUrl: './new-tipo.component.html',
  styleUrls: ['./new-tipo.component.css']
})
export class NewTipoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private apiService: ApiService,private snackBar: MatSnackBar,public dialogRef: MatDialogRef<NewTipoComponent>){}
}
