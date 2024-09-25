import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { detail_phone_response } from './response/detail-phone.response';

@Component({
  selector: 'app-details-phone',
  templateUrl: './details-phone.component.html',
  styleUrls: ['./details-phone.component.css']
})
export class DetailsPhoneComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data
  }
  //ESTO TRAE LOS DATOS DEL CELULAR
  item:any
  columnsToView: string[] = ['attribute', 'value', 'available', 'actions'];
  dataTable: detail_phone_response[] = [
    { attribute: "Cámara", value: "200", available: "Yes"},
    { attribute: "Pantalla", value: "100", available: "No"},
    { attribute: "Procesador", value: "250", available: "No"},
    { attribute: "Batería", value: "100", available: "No"},
    { attribute: "Memoria RAM", value: "120", available: "Yes"},
    { attribute: "Almacenamiento Interno", value: "250", available: "Yes"},
    { attribute: "Cargador Rápido", value: "30", available: "Yes"}
  ];
  metadataTable: MetadataTable[] = [
    { field: "attribute", title: "Attribute" },
    { field: "value", title: "Value" },
    { field: "available", title: "Available" } // Solo debe estar una vez
  ];
  getRowClass(row: any): string {
    return row.available === 'Yes' ? 'available-yes' : 'available-no';
  }
}
