import {
  LineaTicket,
  ResultadoLineaTicket,
  TipoIVA,
  TotalPorTipoIva
} from '../modelo';

interface Ivas {
  general: number;
  reducido: number;
  superreducidoA: number;
  superreducidoB: number;
  superreducidoC: number;
  sinIva: number;
}

//ivas en porcentajes??
const ivas: Ivas = {
  general: 0.21,
  reducido: 0.1,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0,
  sinIva: 0
};

export const calcularIva = (precioSinIva: number, tipoIva: TipoIVA): number => {
  if (!precioSinIva || !tipoIva) {
    throw 'No se puede calcular IVA';
  }
  return precioSinIva * ivas[tipoIva];
};

export const obtenerLineasTiquet = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  if (!lineasTicket) {
    throw 'LineaTicket[] no es válido';
  }

  return lineasTicket.reduce(
    (acc: ResultadoLineaTicket[], linea: LineaTicket) => {
      const { producto, cantidad } = linea;
      const { nombre, precio, tipoIva } = producto;
      const precionSinIva = precio * cantidad;
      const iva = calcularIva(precionSinIva, tipoIva);
      const precioConIva = precionSinIva + iva;
      acc = [
        ...acc,
        {
          nombre,
          cantidad,
          precionSinIva,
          tipoIva,
          precioConIva
        }
      ];
      return acc;
    },
    []
  );
};

export const totalPorTipoIva = (
  lineasTicket: LineaTicket[]
): TotalPorTipoIva[] => {
  if (!lineasTicket) {
    throw 'LineaTicket[] no es válido';
  }

  const miro = lineasTicket.reduce((acc, linea: LineaTicket) => {
    const { producto, cantidad } = linea;
    const precio = producto.precio;
    const tipoIva = producto.tipoIva;
    const precionSinIva = precio * cantidad;
    const iva = calcularIva(precionSinIva, tipoIva);
    if (iva > 0) {
      acc[tipoIva]
        ? (acc[tipoIva].cuantia += iva)
        : (acc[tipoIva] = { tipoIva, cuantia: iva });
    }
    return acc;
  }, {} as { [Key in TipoIVA]: TotalPorTipoIva });

  return Object.values(miro);
};

export const sumarTotalSinIva = (
  resultadoLineasTicket: ResultadoLineaTicket[]
) => {
  if (!resultadoLineasTicket) {
    throw 'resultadoLineasTicket[] no es válido';
  }
  return resultadoLineasTicket.reduce(
    (acc, linea) => (acc += linea.precionSinIva),
    0
  );
};

//test por aqui
export const sumarTotalIvas = (resultadoTotalPorIva: TotalPorTipoIva[]) => {
  if (!resultadoTotalPorIva) {
    throw 'resultadoTotalPorIva[] no es válido';
  }
  return resultadoTotalPorIva.reduce((acc, tipo) => (acc += tipo.cuantia), 0);
};
