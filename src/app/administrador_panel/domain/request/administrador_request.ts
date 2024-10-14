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
