import { Component } from '@angular/core';
import { Tipos } from '../../domain/response/administrador_response';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { ApiService } from 'src/app/services/services_api';
import { NewPhoneComponent } from '../new-phone/new-phone.component';

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
      description_phone : new FormControl (null,null)
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
    this.apiService.getTipos('COM').subscribe(
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
