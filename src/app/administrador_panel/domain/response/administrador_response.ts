export interface Tipos {
  id_tipo:number,
  tab_tabla:string,
  des_tipo:string,
  cod_tipo:string
}

export interface ParteResponse {
    nombre_parte: string;
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
