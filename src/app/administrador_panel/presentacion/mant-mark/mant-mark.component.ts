import { Component } from '@angular/core';
import { CelularResponse, Tipos } from '../../domain/response/administrador_response';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { InsertTiposRequest, TipoListaRequest } from '../../domain/request/administrador_request';
import { NewTipoComponent } from '../new-tipo/new-tipo.component';
import { DialogYesOrNot } from 'src/app/message_custom/YesOrNot/yesOrNot';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mant-mark',
  templateUrl: './mant-mark.component.html',
  styleUrls: ['./mant-mark.component.css']
})
export class MantMarkComponent {
  constructor(private messageService: MessageService,public dialog: MatDialog,private apiService: ApiService){}

  group!:FormGroup

  initializeForm(){
    this.group = new FormGroup({
      description_mark : new FormControl (null,null)
    });
   }
   show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }
  //description_phone
  ngOnInit():void{
    this.initializeForm()
    this.muestraMarca()
  }

  dataTable: Tipos[] = [];
  metadataTable: MetadataTable[] = [
    { field: "cod_tipo", title: "COD Marca" },
    { field: "des_tipo", title: "Marca" },
  ];

  addMark() {
    const dialogRef = this.dialog.open(NewTipoComponent, {
      width: '60vw',  // ancho
      height: '40vh',  // altura
      disableClose: true,
      data: {
        'title':'AGREGA MARCA',
        'index':this.dataTable[this.dataTable.length-1].cod_tipo,
        'tab_tabla':'MAR'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.muestraMarca()
      } else {
      }
    });
  }

  editMark(row:any) {
    const dialogRef = this.dialog.open(NewTipoComponent, {
      width: '60vw',  // ancho
      height: '40vh',  // altura
      disableClose: true,
      data: {
        'title':'EDITA MARCA',
        'index':row.cod_tipo,
        'tab_tabla':'MAR',
        'id': row.id_tipo,
        'desc': row.des_tipo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.muestraMarca()
      } else {
      }
    });
  }


  celulares!:CelularResponse[]

  muestraMarca(){
    const values = this.group.value
    const tipo_request:TipoListaRequest = <TipoListaRequest>{}
    tipo_request.tabla_tab = 'MAR'
    tipo_request.desc_tipos = values.description_mark != null ? values.description_mark : '%'
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
      this.muestraMarca()
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
        message: 'Are you sure you want to delete mark?'
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
