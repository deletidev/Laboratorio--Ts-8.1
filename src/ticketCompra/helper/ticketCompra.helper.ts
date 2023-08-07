import {
  Ivas,
  LineaTicket,
  ResultadoLineaTicket,
  TipoIVA,
  TotalPorTipoIva
} from '../modelo';

//ivas en porcentajes??
const ivas: Ivas = {
  general: 0.21,
  reducido: 0.1,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0,
  sinIva: 0
};

const calcularIva = (precioSinIva: number, tipoIva: TipoIVA): number =>
  precioSinIva * ivas[tipoIva];

export const obtenerLineasTiquet = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  if (!lineasTicket || !Array.isArray(lineasTicket)) {
    throw 'LineaTicket[] no es válido';
  }

  return lineasTicket.map(linea => {
    const { producto, cantidad } = linea;
    const { nombre, precio, tipoIva } = producto;
    const precionSinIva = precio * cantidad;
    const iva = calcularIva(precionSinIva, tipoIva);
    const precioConIva = precionSinIva + iva;

    return {
      nombre,
      cantidad,
      precionSinIva,
      tipoIva,
      precioConIva
    };
  });
};

export const totalPorTipoIva = (
  lineasTicket: LineaTicket[]
): TotalPorTipoIva[] => {
  if (!lineasTicket) {
    throw 'LineaTicket[] no es válido';
  }

  const miro = lineasTicket.reduce((acc, linea: LineaTicket) => {
    const { producto, cantidad } = linea;
    const { precio, tipoIva } = producto;
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

export const sumarTotalSinIva = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) {
    throw 'lineasTicket[] no es válido';
  }
  return lineasTicket.reduce(
    (acc, linea) => (acc += linea.producto.precio * linea.cantidad),
    0
  );
};

export const sumarTotalIvas = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) {
    throw 'lineasTicket[] no es válido';
  }

  return lineasTicket.reduce((acc, linea) => {
    const { producto, cantidad } = linea;
    const { precio, tipoIva } = producto;
    const precionSinIva = precio * cantidad;
    const iva = calcularIva(precionSinIva, tipoIva);

    acc += iva;

    //+acc.toFixed(2) o Number(acc.toFixed(2)), es necesario para sumar números menores que 0
    //y que me devuelva sólo dos decimales, parseInt me devuelve 0
    return Number(acc.toFixed(2));
  }, 0);
};
