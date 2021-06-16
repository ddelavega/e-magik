export interface Product {
  name: string;
  price: number;
  reducedPrice: number;
  picture?: any;
  id: string;
  fecha: Date;
}
export interface Uid {
  uid?: string;
}
export interface Client {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  nombre?: string;
  celular?: string;
  foto?: any;
  referencia?: string;
  ubicacion?: any;
  fecha?: Date;
}
export interface ProductoPedido {
  producto?: Product;
  cantidad: number;
}

export interface Pedido {
  id: string;
  cliente?: Client;
  productos?: ProductoPedido[];
  precioTotal: number;
  estado: EstadoPedido;
  fecha: Date;
  valoracion: number;
}

export type EstadoPedido = 'recibido' | 'en proceso' | 'enviado' | 'visto' | 'camino' | 'entregado';


