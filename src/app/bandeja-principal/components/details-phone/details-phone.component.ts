import { Component,Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { detail_phone_response } from './response/detail-phone.response';
import { CelularResponse, ParteResponse } from 'src/app/administrador_panel/domain/response/administrador_response';
import { CartService } from 'src/app/services/shoppin_cart_service';
import { ApiService } from 'src/app/services/services_api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-phone',
  templateUrl: './details-phone.component.html',
  styleUrls: ['./details-phone.component.css']
})
export class DetailsPhoneComponent {
  @Input() item_cart: any; // Recibe el producto actual
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const phoneId = this.route.snapshot.paramMap.get('id'); // Obtiene el parámetro de la URL
    this.muestraPhone(phoneId);
  }
  //ESTO TRAE LOS DATOS DEL CELULAR
  imageObject:any = [];
  item:any
  columnsToView: string[] = ['attribute', 'value', 'available', 'actions'];
  dataTable!: ParteResponse[]
  metadataTable: MetadataTable[] = [
    { field: "nombre", title: "Componente" },
    { field: "precio", title: "Precio" },
    { field: "cantidad", title: "Stock" } // Solo debe estar una vez
  ];

  getRowClass(row: any): string {
    return row.cantidad >  0 ? 'available-yes' : 'available-no';
  }

  addToCart(item: any, row:any) {
    this.cartService.addToCart(item,row);
  }

  celulares!:CelularResponse[]

  muestraPhone(id: string | null) {
    this.apiService.getCelulares().subscribe(
      (data: CelularResponse[]) => {
        this.celulares = data;
        this.item = this.celulares.find(celular => celular.id_celular.toString() === id); // Filtra el celular correcto
        if (this.item) {
          this.dataTable = this.item.partes
        }
        for(let i =0; i<this.celulares.length;i++){
          this.imageObject.push(this.celulares[i].imagen);
        }
      },
      (error) => {
        console.error('Error al obtener el celular', error);
      }
    );
  }
}
