import { Component } from '@angular/core';
import { CelularResponse, Tipos } from '../../domain/response/administrador_response';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { TipoListaRequest } from '../../domain/request/administrador_request';

@Component({
  selector: 'app-mant-mark',
  templateUrl: './mant-mark.component.html',
  styleUrls: ['./mant-mark.component.css']
})
export class MantMarkComponent {
  constructor(public dialog: MatDialog,private apiService: ApiService){}

  group!:FormGroup

  initializeForm(){
    this.group = new FormGroup({
      description_mark : new FormControl (null,null)
    });
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
    this.dialog.open(NewPhoneComponent, {
      width: '100vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      // data: item
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

  buscaPhone(){
    console.log('')
  }
}
