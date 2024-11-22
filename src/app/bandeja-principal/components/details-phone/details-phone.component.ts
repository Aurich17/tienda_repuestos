import { Component,Inject, Input,HostListener} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { detail_phone_response } from './response/detail-phone.response';
import { CelularResponse, ParteResponse} from 'src/app/administrador_panel/domain/response/administrador_response';
import { CartService } from 'src/app/services/shoppin_cart_service';
import { ApiService } from 'src/app/services/services_api';
import { ActivatedRoute } from '@angular/router';
import { PhoneListaRequest } from 'src/app/administrador_panel/domain/request/administrador_request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-details-phone',
  templateUrl: './details-phone.component.html',
  styleUrls: ['./details-phone.component.css']
})
export class DetailsPhoneComponent {
  responsiveOptions: any[] = [];
  @Input() item_cart: any; // Recibe el producto actual
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    const phoneId = this.route.snapshot.paramMap.get('id'); // Obtiene el parámetro de la URL
    this.muestraPhone(phoneId);
    this.onResize();
  }
  //ESTO TRAE LOS DATOS DEL CELULAR
  imageVisible:number = 4
  screenWidth!: number;
  imageObject:any = [];
  item:any
  columnsToView: string[] = ['attribute', 'value', 'available', 'actions'];
  dataTable!: ParteResponse[]
  metadataTable: MetadataTable[] = [
    { field: "nombre", title: "Componente" },
    { field: "precio", title: "Precio" },
    { field: "cantidad", title: "Stock" } // Solo debe estar una vez
  ];

  //TAMANIO PANTALLA
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.imageVisible = 1

    }
    // Puedes usar `this.screenWidth` para aplicar lógica condicional aquí
  }

  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message });
  }

  getRowClass(row: any): string {
    return row.cantidad >  0 ? 'available-yes' : 'available-no';
  }

  addToCart(item: any, row:any) {
    if(localStorage.getItem('access_token') != null){
      this.cartService.addToCart(item,row);
    }else{
      this.show('error', 'Inicio de sesion necesario')
    }
  }

  celulares!:CelularResponse[]

  muestraPhone(id: string | null) {
    // phone_request
    const user_request:PhoneListaRequest  = <PhoneListaRequest >{}
    user_request.name_phone = '%',
    this.apiService.getCelulares(user_request).subscribe(
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
