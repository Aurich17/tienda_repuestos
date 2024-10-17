import { Component,Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { detail_phone_response } from './response/detail-phone.response';
import { CelularResponse, ParteResponse } from 'src/app/administrador_panel/domain/response/administrador_response';
import { CartService } from 'src/app/services/shoppin_cart_service';
import { ApiService } from 'src/app/services/services_api';

@Component({
  selector: 'app-details-phone',
  templateUrl: './details-phone.component.html',
  styleUrls: ['./details-phone.component.css']
})
export class DetailsPhoneComponent {
  @Input() item_cart: any; // Recibe el producto actual
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cartService: CartService,private apiService: ApiService) {
    this.item = data
    this.dataTable = data.partes || [];
  }

  ngOnInit(){
    this.muestraPhone()
  }
  //ESTO TRAE LOS DATOS DEL CELULAR
  imageObject: { thumbImage: string; title?: string }[] = [];
  item:any
  columnsToView: string[] = ['attribute', 'value', 'available', 'actions'];
  dataTable!: ParteResponse[]
  metadataTable: MetadataTable[] = [
    { field: "nombre", title: "Attribute" },
    { field: "precio", title: "Value" },
    { field: "cantidad", title: "Available" } // Solo debe estar una vez
  ];

  getRowClass(row: any): string {
    return row.cantidad >  0 ? 'available-yes' : 'available-no';
  }

  addToCart(item: any, row:any) {
    this.cartService.addToCart(item,row);
  }

  celulares!:CelularResponse[]

  muestraPhone(){
    this.apiService.getCelulares().subscribe(
      (data: CelularResponse[]) => {
        this.celulares = data;
        for(let i = 0; i<this.celulares.length; i++){
          const item = {
            // image: 'data:image/jpeg;base64,'+this.celulares[i].imagen,
            thumbImage: 'data:image/jpeg;base64,'+this.celulares[i].imagen,
            title: this.celulares[i].modelo
          }
          this.imageObject.push(item)
        }
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }
}
