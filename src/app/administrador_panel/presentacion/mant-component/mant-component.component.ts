import { Component } from '@angular/core';
import { Tipos } from '../../domain/response/administrador_response';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { ApiService } from 'src/app/services/services_api';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { InsertTiposRequest, TipoListaRequest } from '../../domain/request/administrador_request';
import { NewTipoComponent } from '../new-tipo/new-tipo.component';
import { DialogYesOrNot } from 'src/app/message_custom/YesOrNot/yesOrNot';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mant-component',
  templateUrl: './mant-component.component.html',
  styleUrls: ['./mant-component.component.css']
})
export class MantComponentComponent {
  constructor(private messageService: MessageService,public dialog: MatDialog,private apiService: ApiService){}

  group!:FormGroup

  initializeForm(){
    this.group = new FormGroup({
      description_component : new FormControl (null,null)
    });
   }

   show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }
  //description_phone
  ngOnInit():void{
    this.initializeForm()
    this.muestraComponente()
  }

  dataTable: Tipos[] = [];
  metadataTable: MetadataTable[] = [
    { field: "cod_tipo", title: "COD Component" },
    { field: "des_tipo", title: "Component" },
  ];

  addComponent() {
    const dialogRef = this.dialog.open(NewTipoComponent, {
      width: '60vw',  // ancho
      height: '40vh',  // altura
      data: {
        'title':'AGREGA COMPONENTE',
        'index':this.dataTable[this.dataTable.length-1].cod_tipo,
        'tab_tabla':'COM'}
      //border-radius: '20px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.muestraComponente()
      } else {
      }
    });
  }

  editComponent(row:any) {
    const dialogRef = this.dialog.open(NewTipoComponent, {
      width: '60vw',  // ancho
      height: '40vh',  // altura
      disableClose: true,
      data: {
        'title':'EDITA COMPONENTE',
        'index':row.cod_tipo,
        'tab_tabla':'COM',
        'id': row.id_tipo,
        'desc': row.des_tipo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.muestraComponente()
      } else {
      }
    });
  }


  muestraComponente(){
    const values = this.group.value
    const tipo_request:TipoListaRequest = <TipoListaRequest>{}
    tipo_request.tabla_tab = 'COM'
    tipo_request.desc_tipos = values.description_component != null ? values.description_component : '%'
    this.apiService.getTipos(tipo_request).subscribe(
      (data: Tipos[]) => {
        this.dataTable = data
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  deleteComponent(row:any){
    const request:InsertTiposRequest = <InsertTiposRequest>{}

    request.accion = 'D';
    request.p_id_tipo = row.id_tipo;
    request.p_cod_tipo = '';
    request.p_des_tipo = '';
    request.p_tab_tabla = '';

    this.apiService.insertTipos(request).subscribe(response => {
      this.show('success', 'ELIMINADO CORRECTAMENTE');
      this.muestraComponente()
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, row:any): void {
    const dialogRef = this.dialog.open(DialogYesOrNot, {
      width: '350px',
      height: '160px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Delete Component',
        message: 'Are you sure you want to delete component?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComponent(row)
      } else {
      }
    });
  }

}
