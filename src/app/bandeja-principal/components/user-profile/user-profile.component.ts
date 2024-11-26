import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs';
import { TipoListaRequest } from 'src/app/administrador_panel/domain/request/administrador_request';
import { Tipos } from 'src/app/administrador_panel/domain/response/administrador_response';
import { ApiService } from 'src/app/services/services_api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadTipos()
    this.initializeForm()
  }

  soloLectura:boolean = true
  group!:FormGroup
  documentos: Tipos[] = []
  nacionalidades: Tipos[] = [];
  selectedDocument!: Tipos;
  name_user = localStorage.getItem('user_name')?.toString().toUpperCase()
  first_letter = this.name_user != null ? this.name_user[0].toUpperCase() : ''

  initializeForm(){
    this.group = new FormGroup({
      nombre_completo : new FormControl (localStorage.getItem('nombre_completo'),null),
      email: new FormControl(localStorage.getItem('email'),null),
      documentoTipo: new FormControl(null,null),
      numDocumento: new FormControl(null,null)
    });
   }

  loadTipos(): void {
    const tipo_request:TipoListaRequest = <TipoListaRequest>{}
    tipo_request.tabla_tab = 'NAC'
    tipo_request.desc_tipos = '%'
    this.apiService.getTipos(tipo_request).pipe(
      switchMap((data: Tipos[]) => {
        this.nacionalidades = data;
        // Aquí haces la segunda llamada API
        tipo_request.tabla_tab = 'DOI'
        return this.apiService.getTipos(tipo_request);
      })
    ).subscribe(
      (response) => {
        this.documentos = response
      }
    );
  }
}
