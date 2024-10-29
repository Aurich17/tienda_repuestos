import { Component } from '@angular/core';
import { CelularResponse, UserListaRequest, UserRequest, UserResponse } from '../../domain/response/administrador_response';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { DialogYesOrNot } from 'src/app/message_custom/YesOrNot/yesOrNot';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-mant-users',
  templateUrl: './mant-users.component.html',
  styleUrls: ['./mant-users.component.css']
})
export class MantUsersComponent {
  constructor(public dialog: MatDialog,private apiService: ApiService,private snackBar: MatSnackBar){}

  group!:FormGroup

  initializeForm(){
    this.group = new FormGroup({
      user_name : new FormControl (null,null)
    });
   }
  //description_phone
  ngOnInit():void{
    this.initializeForm()
    this.muestraUser()
  }

  dataTable: UserResponse[] = [];
  metadataTable: MetadataTable[] = [
    { field: "username", title: "Username" },
    { field: "email", title: "Email" },
    // { field: "available", title: "Available" }
  ];

  addPhone() {
    this.dialog.open(NewPhoneComponent, {
      width: '100vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      // data: item
    });
  }

  users!:UserResponse[]

  muestraUser(){
    const values = this.group.value
    const user_request:UserListaRequest  = <UserListaRequest >{}

    user_request.name_user = values.user_name != null ? values.user_name : '%',
    this.users = []
    this.apiService.getUsers(user_request).subscribe(
      (data: UserResponse[]) => {
        this.users = data;
        this.dataTable = this.users
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  deleteUser(row:any){
    const user_request:UserRequest = <UserRequest>{}

    user_request.accion = 'D'
    user_request.email = ''
    user_request.is_admin = 0
    user_request.password = ''
    user_request.user_id = row.id_user
    user_request.username =''
    user_request.nom_completo = ''
    user_request.doi_cod = ''
    user_request.num_doi = ''
    user_request.nac_cod = ''

    this.apiService.apiUserManage(user_request).subscribe({
      next: (response) => {
        this.snackBar.open('Usuario eliminado con exito', 'OK', {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "end"
        });
        this.muestraUser()
      },
      error: (err) => {
        this.snackBar.open('Error al elminar usuario', 'OK', {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "end"
        });
      }
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, row:any): void {
    const dialogRef = this.dialog.open(DialogYesOrNot, {
      width: '350px',
      height: '160px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete user?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(row)
      } else {
      }
    });
  }

  editUser(item:any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '100vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.muestraUser()
      } else {
      }
    });
  }


}
