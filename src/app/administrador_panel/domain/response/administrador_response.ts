export interface Tipos {
  id_tipo:number,
  tab_tabla:string,
  des_tipo:string,
  cod_tipo:string
}

export interface ParteResponse {
    nombre: string;
    cod_parte: string;
    precio: number;
    cantidad: number;
}

export interface CelularResponse {
    id_celular: number;
    marca: string;
    cod_marca:string;
    modelo: string; //modelo
    precio_completo: number;//precio
    descripcion?: string;  // Este campo es opcional
    fecha_agregado: string;
    imagen?: string;  // Esto es opcional, dependerá de si envías la imagen o no
    isInWishlist?: boolean; // Esta propiedad es opcional
    partes: ParteResponse[];  // Lista de partes
}

export interface UserResponse {
  id_user: number,
  username: string,
  email: string,
  is_admin: number,
  created_at: Date,
  updated_at: Date,
  nombre_completo: string,
  doi_tag: string,
  doi_cod: string,
  doi_number: string,
  nacionalidad_cod: string,
  nacionalidad_tag: string
}

export interface WishListResponse{
  id_celular: number,
  modelo: string,
  en_lista_deseos: number,
  imagen:string
}
