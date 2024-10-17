export interface Tipos {
  id_tipo:number,
  tab_tabla:string,
  des_tipo:string,
  cod_tipo:string
}

export interface ParteResponse {
    nombre: string;
    precio: number;
    cantidad: number;
}

export interface CelularResponse {
    celular_id: number;
    marca: string;
    modelo: string; //modelo
    precio_completo: number;//precio
    descripcion?: string;  // Este campo es opcional
    fecha_agregado: string;
    imagen?: string;  // Esto es opcional, dependerá de si envías la imagen o no
    partes: ParteResponse[];  // Lista de partes
}

export interface UserResponse {
  id_user: number,
  username: string,
  email: string,
  is_admin: number,
  created_at: Date,
  updated_at: Date
}

export interface UserRequest {
  accion: string,
  user_id: number,
  username: string,
  email: string,
  password: string,
  is_admin: number
}
