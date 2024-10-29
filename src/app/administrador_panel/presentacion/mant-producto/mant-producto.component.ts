import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { detail_phone_response } from 'src/app/bandeja-principal/components/details-phone/response/detail-phone.response';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { CelularResponse } from '../../domain/response/administrador_response';

@Component({
  selector: 'app-mant-producto',
  templateUrl: './mant-producto.component.html',
  styleUrls: ['./mant-producto.component.css']
})
export class MantProductoComponent {
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
    this.muestraPhone()
  }

  dataTable: CelularResponse[] = [];
  metadataTable: MetadataTable[] = [
    { field: "modelo", title: "Model" },
    { field: "precio_completo", title: "Price" },
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

  celulares!:CelularResponse[]

  muestraPhone(){
    this.apiService.getCelulares().subscribe(
      (data: CelularResponse[]) => {
        this.celulares = data;
        this.dataTable = this.celulares
        console.log(this.celulares)
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
