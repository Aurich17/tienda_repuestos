export interface Marca {
    id: number;
    nombre_marca: string;
  }

export interface ParteResponse {
    nombre_parte: string;
    precio: number;
    cantidad: number;
}

export interface CelularResponse {
    celular_id: number;
    marca: string;
    modelo: string;
    precio_completo: number;
    descripcion?: string;  // Este campo es opcional
    fecha_agregado: string;
    imagen?: string;  // Esto es opcional, dependerá de si envías la imagen o no
    partes: ParteResponse[];  // Lista de partes
}
