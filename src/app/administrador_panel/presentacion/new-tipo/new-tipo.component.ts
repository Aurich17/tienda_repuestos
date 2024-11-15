import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/services_api';
import { InsertTiposRequest } from '../../domain/request/administrador_request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-tipo',
  templateUrl: './new-tipo.component.html',
  styleUrls: ['./new-tipo.component.css']
})
export class NewTipoComponent {
  constructor(private messageService: MessageService,@Inject(MAT_DIALOG_DATA) public data: any,private apiService: ApiService,private snackBar: MatSnackBar,public dialogRef: MatDialogRef<NewTipoComponent>){}

  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }
  group!:FormGroup

  ngOnInit(){
    this.initializeForm()
  }

  initializeForm(){
    if(this.data != null){
      this.group = new FormGroup({
        name_tipo : new FormControl (this.data.desc,null)
      });
    }else{
      this.group = new FormGroup({
        name_tipo : new FormControl (null,null)
      });
    }
   }

  guardaTipo(){
    const values = this.group.value
    const request:InsertTiposRequest = <InsertTiposRequest>{}
    const incrementIndex = (index: string): string => {
      const numericIndex = parseInt(index, 10); // Elimina los ceros iniciales
      const incrementedIndex = numericIndex + 1;
      return incrementedIndex.toString().padStart(index.length, '0');
    };
    request.accion = this.data.id != null ? 'U' : 'I'
    request.p_id_tipo = this.data.id != null ? this.data.id : 0
    request.p_cod_tipo = this.data.id != null ? this.data.index : incrementIndex(this.data.index);
    request.p_des_tipo = values.name_tipo
    request.p_tab_tabla = this.data.tab_tabla

    this.apiService.insertTipos(request).subscribe(response => {
      this.show('success', 'GUARDADO CORRECTAMENTE');
      if(this.data.id != null){
        this.dialogRef.close(true);
      }
      this.limpiarFormulario()
    });
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

  limpiarFormulario() {
    this.group.reset();
  }
}
