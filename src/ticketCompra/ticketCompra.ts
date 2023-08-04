import { LineaTicket, TicketFinal } from './modelo';

import {
  obtenerLineasTiquet,
  totalPorTipoIva,
  sumarTotalSinIva,
  sumarTotalIvas
} from './helper/ticketCompra.helper';

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  if (!lineasTicket) {
    throw 'No existe el ticket';
  }

  const lineas = obtenerLineasTiquet(lineasTicket);
  const desgloseIva = totalPorTipoIva(lineasTicket);
  const totalSinIva = sumarTotalSinIva(lineasTicket);
  const totalIva = sumarTotalIvas(lineasTicket);

  return {
    lineas,
    total: { totalSinIva, totalConIva: totalSinIva + totalIva, totalIva },
    desgloseIva
  };
};
