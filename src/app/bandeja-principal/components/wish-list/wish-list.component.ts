import { Component } from '@angular/core';
import { insertWishListRequest, listaWishListRequest } from 'src/app/administrador_panel/domain/request/administrador_request';
import { WishListResponse } from 'src/app/administrador_panel/domain/response/administrador_response';
import { ApiService } from 'src/app/services/services_api';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  listaDeseos:WishListResponse[] = []
  name_user = localStorage.getItem('user_name')?.toString().toUpperCase()
  first_letter = this.name_user != null ? this.name_user[0].toUpperCase() : ''

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.listaWishList()
  }

  listaWishList(){
    const reques_wishList:listaWishListRequest = <listaWishListRequest>{}
    reques_wishList.p_id_usuario = localStorage.getItem('user_id') !== null? Number(localStorage.getItem('user_id')) : undefined;
    this.apiService.listaWishList(reques_wishList).subscribe(
      (data: WishListResponse[]) => {
        this.listaDeseos = data
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  eliminarDeLista(producto:any) {
    const wishList_request: insertWishListRequest = <insertWishListRequest>{};
    wishList_request.p_id_usuario = localStorage.getItem('user_id') !== null? Number(localStorage.getItem('user_id')) : undefined;
    wishList_request.p_id_celular = producto.id_celular;
    wishList_request.p_deseado = false;
    this.apiService.insertWishList(wishList_request).subscribe(
      () => {
        // Actualiza la lista de deseos eliminando el producto
        this.listaDeseos = this.listaDeseos.filter(p => p.id_celular !== producto.id_celular);
      },
      error => {
        console.error('Error al eliminar el producto de la lista de deseos', error);
      }
    );
  }
}
