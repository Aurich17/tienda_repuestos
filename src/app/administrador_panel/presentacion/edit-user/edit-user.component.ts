import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tipos } from '../../domain/response/administrador_response';
import { ApiService } from 'src/app/services/services_api';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoListaRequest, UserRequest } from '../../domain/request/administrador_request';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private apiService: ApiService,private snackBar: MatSnackBar,public dialogRef: MatDialogRef<EditUserComponent>){}
  nacionalidades: Tipos[] = [];
  documentos: Tipos[] = []
  group!:FormGroup

  ngOnInit(){
    this.loadTipos()
    this.initializeForm()
  }

  initializeForm(){
    this.group = new FormGroup({
      nombreCompleto : new FormControl (this.data.nombre_completo,null),
      user : new FormControl(this.data.username,null),
      email: new FormControl(this.data.email,null),
      documentoTipo: new FormControl(this.data.doi_cod,null),
      numDocumento: new FormControl(this.data.doi_number,null),
      naciolidadTipo: new FormControl(this.data.nacionalidad_cod,null),
      isAdmin: new FormControl(this.data.is_admin.toString(),null)
    });
   }

  loadTipos(): void {
    const tipo_request:TipoListaRequest = <TipoListaRequest>{}
    tipo_request.tabla_tab = 'NAC'
    tipo_request.desc_tipos = '%'
    this.apiService.getTipos(tipo_request).pipe(
      switchMap((data: Tipos[]) => {
        this.nacionalidades = data;
        // Aquí haces la segunda llamada API
        tipo_request.tabla_tab = 'DOI'
        return this.apiService.getTipos(tipo_request);
      })
    ).subscribe(
      (response) => {
        console.log('Resultado de la segunda API:', response);
        this.documentos = response
      }
    );
  }

  updateUser(){
    const user_request:UserRequest = <UserRequest>{}
    const values = this.group.value

    user_request.accion = 'U'
    user_request.email = values.email
    user_request.is_admin = values.isAdmin
    user_request.password = ''
    user_request.user_id = this.data.id_user
    user_request.username = values.user
    user_request.nom_completo = values.nombreCompleto
    user_request.doi_cod = values.documentoTipo
    user_request.num_doi = values.numDocumento
    user_request.nac_cod = values.naciolidadTipo

    this.apiService.apiUserManage(user_request).subscribe({
      next: (response) => {
        this.snackBar.open('Usuario actualizado con exito', 'OK', {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "end"
        });
        this.onConfirm()
        // this.muestraUser()
      },
      error: (err) => {
        this.snackBar.open('Error al actualizar usuario', 'OK', {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "end"
        });
      }
    });
  }

  // Método para cerrar el diálogo con 'Yes'
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  // Método para cerrar el diálogo con 'No'
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
