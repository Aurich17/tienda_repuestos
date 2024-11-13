export interface Parte {
    componente_cod: string;
    precio: number;
    cantidad: number;
}

export interface InsertaCelularRequest {
    p_marca_cod:string
    p_modelo:string
    p_cantidad:number
    p_precio_completo:number
    p_descripcion:string
    partes: Parte[];  // Lista de partes del celular
}

export interface UserRequest {
  accion: string,
  user_id: number,
  username: string,
  email: string,
  password: string,
  is_admin: number,
  nom_completo:string
  doi_cod:string
  num_doi:string
  nac_cod:string
}

export interface UserListaRequest {
  name_user: string,
}

export interface PhoneListaRequest {
  name_phone: string,
}

export interface paypalRequest{
  paymentId: string,
  payerId: string
}

export interface TipoListaRequest{
  tabla_tab: string,
  desc_tipos?: string
}


// export interface
