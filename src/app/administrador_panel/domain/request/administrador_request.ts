export interface Parte {
    nombre_parte: string;
    precio: number;
    cantidad: number;
}

export interface CelularConPartes {
    marca_id: number;
    modelo: string;
    precio_completo: number;
    descripcion: string;
    partes: Parte[];  // Lista de partes del celular
  }
