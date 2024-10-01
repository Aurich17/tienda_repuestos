import { Component } from '@angular/core';
import { CelularResponse } from '../../domain/response/administrador_response';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';

@Component({
  selector: 'app-mant-users',
  templateUrl: './mant-users.component.html',
  styleUrls: ['./mant-users.component.css']
})
export class MantUsersComponent {
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
