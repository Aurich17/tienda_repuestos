import { Component,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { detail_phone_response } from './response/detail-phone.response';
import { ParteResponse } from 'src/app/administrador_panel/domain/response/administrador_response';

@Component({
  selector: 'app-details-phone',
  templateUrl: './details-phone.component.html',
  styleUrls: ['./details-phone.component.css']
})
export class DetailsPhoneComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data
    this.dataTable = data.partes || [];
  }
  //ESTO TRAE LOS DATOS DEL CELULAR
  item:any
  columnsToView: string[] = ['attribute', 'value', 'available', 'actions'];
  dataTable!: ParteResponse[]
  metadataTable: MetadataTable[] = [
    { field: "nombre_parte", title: "Attribute" },
    { field: "precio", title: "Value" },
    { field: "cantidad", title: "Available" } // Solo debe estar una vez
  ];
  getRowClass(row: any): string {
    return row.cantidad >  0 ? 'available-yes' : 'available-no';
  }
}
