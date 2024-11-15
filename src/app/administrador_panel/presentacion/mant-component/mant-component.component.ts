import { Component } from '@angular/core';
import { Tipos } from '../../domain/response/administrador_response';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { ApiService } from 'src/app/services/services_api';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { TipoListaRequest } from '../../domain/request/administrador_request';

@Component({
  selector: 'app-mant-component',
  templateUrl: './mant-component.component.html',
  styleUrls: ['./mant-component.component.css']
})
export class MantComponentComponent {
  constructor(public dialog: MatDialog,private apiService: ApiService){}

  group!:FormGroup

  initializeForm(){
    this.group = new FormGroup({
      description_component : new FormControl (null,null)
    });
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

  addMark() {
    this.dialog.open(NewPhoneComponent, {
      width: '100vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      // data: item
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

}
