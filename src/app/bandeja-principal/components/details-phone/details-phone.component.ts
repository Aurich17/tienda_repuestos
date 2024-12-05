import { Component,Inject, Input,HostListener, ChangeDetectorRef} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { detail_phone_response } from './response/detail-phone.response';
import { CelularResponse, ParteResponse} from 'src/app/administrador_panel/domain/response/administrador_response';
import { CartService } from 'src/app/services/shoppin_cart_service';
import { ApiService } from 'src/app/services/services_api';
import { ActivatedRoute, Router } from '@angular/router';
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
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Escucha cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      const phoneId = params['id']; // Obtiene el nuevo ID del celular
      this.muestraPhone(phoneId); // Llama al método para actualizar los datos del celular
    });
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
  carrusel_celulares_detaller !:CelularResponse[]

  muestraPhone(id: string | null) {
    this.carrusel_celulares_detaller = [];
    const user_request: PhoneListaRequest = <PhoneListaRequest>{};
    user_request.name_phone = '%';

    this.apiService.getCelulares(user_request, true).subscribe(
      (data: CelularResponse[]) => {
        this.item = data.find(celular => celular.id_celular.toString() === id);
        if (this.item) {
          this.dataTable = this.item.partes;
        } else {
          this.show('error', 'Celular no encontrado');
        }
        this.carrusel_celulares_detaller = data.filter(celular => celular.id_celular.toString() !== id);
        this.imageObject = this.carrusel_celulares_detaller.map(celular => celular.imagen);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener el celular', error);
      }
    );
  }

  goToDetails(id: number): void {
    this.router.navigate(['/details-phone', id]);
  }
}
