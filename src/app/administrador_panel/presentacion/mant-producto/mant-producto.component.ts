import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { detail_phone_response } from 'src/app/bandeja-principal/components/details-phone/response/detail-phone.response';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { NewPhoneComponent } from '../new-phone/new-phone.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { CelularResponse} from '../../domain/response/administrador_response';
import { GestionaCelularRequest, PhoneListaRequest } from '../../domain/request/administrador_request';
import { DialogYesOrNot } from 'src/app/message_custom/YesOrNot/yesOrNot';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mant-producto',
  templateUrl: './mant-producto.component.html',
  styleUrls: ['./mant-producto.component.css']
})
export class MantProductoComponent {
  constructor(public dialog: MatDialog,private apiService: ApiService,private messageService: MessageService){}

  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }
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
    const values = this.group.value
    const user_request:PhoneListaRequest  = <PhoneListaRequest >{}
    user_request.name_phone = values.description_phone != null ? values.description_phone : '%',
    this.apiService.getCelulares(user_request).subscribe(
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, row:any): void {
    const dialogRef = this.dialog.open(DialogYesOrNot, {
      width: '350px',
      height: '160px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Delete Phone',
        message: 'Are you sure you want to delete phone?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePhone(row.id_celular)
      } else {
      }
    });
  }

  deletePhone(id:number){
    const celulares_request:GestionaCelularRequest = <GestionaCelularRequest>{}
    celulares_request.p_accion = 'D'
    celulares_request.p_marca_cod = ''
    celulares_request.p_modelo = ''
    celulares_request.p_cantidad = 0
    celulares_request.p_precio_completo = 0
    celulares_request.p_descripcion = ''
    celulares_request.p_imagen = ''
    celulares_request.p_partes = []
    celulares_request.p_celular_id = id

    this.apiService.gestionaCelular(celulares_request).subscribe(
      (data: CelularResponse[]) => {
        this.show('success', 'Celular Eliminado');
        this.muestraPhone()
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  editPhone(item:any) {
    const dialogRef = this.dialog.open(NewPhoneComponent, {
      width: '100vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.muestraPhone()
      } else {
      }
    });
  }

}
