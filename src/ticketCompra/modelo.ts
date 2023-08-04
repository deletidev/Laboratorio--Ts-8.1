export type TipoIVA =
  | 'general'
  | 'reducido'
  | 'superreducidoA'
  | 'superreducidoB'
  | 'superreducidoC'
  | 'sinIva';

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIVA;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precionSinIva: number;
  tipoIva: TipoIVA;
  precioConIva: number;
}

export interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

export interface TotalPorTipoIva {
  tipoIva: TipoIVA;
  cuantia: number;
}

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

export interface Ivas {
  general: number;
  reducido: number;
  superreducidoA: number;
  superreducidoB: number;
  superreducidoC: number;
  sinIva: number;
}
