
export interface Tokens{

    datos: { status:number,totalRegistro: number , result:result },
    meta: {mensaje}
   // accessToken: string ;
   // refreshToken: string ; 
}

export interface result{
    codigoempresa : string ,
    desEmpresa: string,
    nombreUsuario:string ,
    token:string;
    menu: Menu;
}


export interface Menu{

    title : string ,
    group:boolean 
    grupomenu : GroupMenu[],
    active:boolean
    codigoRol:number
  
  }
  
  export interface GroupMenu{
  
    title : string ,
    group:boolean ,
  
    children : Children[],
    active:boolean
  }
  
  export interface Children{
    title: string,
    icon: string,
    link: string 
    children: Children[]
    active:boolean
  }
  

