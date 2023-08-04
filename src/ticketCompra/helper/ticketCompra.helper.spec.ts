import {
  LineaTicket,
  ResultadoLineaTicket,
  TipoIVA,
  TotalPorTipoIva
} from '../modelo';
import {
  calcularIva,
  obtenerLineasTiquet,
  sumarTotalIvas,
  sumarTotalSinIva,
  totalPorTipoIva
} from './ticketCompra.helper';

describe('calcularIva', () => {
  it('Debería devolver un throw si las entradas son undefined', () => {
    // Arrange
    const precioSinIva: any = undefined;
    const tipoIva: any = undefined;
    // Act
    const result = () => calcularIva(precioSinIva, tipoIva);
    // Assert
    expect(result).toThrow('No se puede calcular IVA');
  });

  it('Debería devolver un throw si las entradas son null', () => {
    // Arrange
    const precioSinIva: any = null;
    const tipoIva: any = null;
    // Act
    const result = () => calcularIva(precioSinIva, tipoIva);
    // Assert
    expect(result).toThrow('No se puede calcular IVA');
  });

  it('Debería devolver 0.42, si el precioSinIva 2 y tipoIVA es general', () => {
    // Arrange
    const precioSinIva = 2;
    const tipoIva: TipoIVA = 'general';
    // Act
    const result = calcularIva(precioSinIva, tipoIva);
    // Assert
    const expected = 0.42;
    expect(result).toBe(expected);
  });

  it('Debería devolver 0.4, si el precioSinIva 4 y tipoIVA es reducido', () => {
    // Arrange
    const precioSinIva = 4;
    const tipoIva: TipoIVA = 'reducido';
    // Act
    const result = calcularIva(precioSinIva, tipoIva);
    // Assert
    const expected = 0.4;
    expect(result).toBe(expected);
  });

  it('Debería devolver 0, si el precioSinIva 4 y tipoIVA es sinIva', () => {
    // Arrange
    const precioSinIva = 4;
    const tipoIva: TipoIVA = 'sinIva';
    // Act
    const result = calcularIva(precioSinIva, tipoIva);
    // Assert
    const expected = 0;
    expect(result).toBe(expected);
  });

  it('Debería devolver 0.25, si el precioSinIva es 5 y tipoIVA es superreducidoA', () => {
    // Arrange
    const precioSinIva = 5;
    const tipoIva: TipoIVA = 'superreducidoA';
    // Act
    const result = calcularIva(precioSinIva, tipoIva);
    // Assert
    const expected = 0.25;
    expect(result).toBe(expected);
  });

  it('Debería devolver 0.24, si el precioSinIva es 6 y tipoIVA es superreducidoB', () => {
    // Arrange
    const precioSinIva = 6;
    const tipoIva: TipoIVA = 'superreducidoB';
    // Act
    const result = calcularIva(precioSinIva, tipoIva);
    // Assert
    const expected = 0.24;
    expect(result).toBe(expected);
  });

  it('Debería devolver 0, si el precioSinIva es 7 y tipoIVA es superreducidoC', () => {
    // Arrange
    const precioSinIva = 7;
    const tipoIva: TipoIVA = 'superreducidoC';
    // Act
    const result = calcularIva(precioSinIva, tipoIva);
    // Assert
    const expected = 0;
    expect(result).toBe(expected);
  });
});

describe('obtenerLineasTiquet', () => {
  it('Debería devolver un throw si entrada es undefined', () => {
    // Arrange
    const lineasTicket: any = undefined;

    // Act
    const result = () => obtenerLineasTiquet(lineasTicket);
    // Assert
    expect(result).toThrow('LineaTicket[] no es válido');
  });

  it('Debería devolver un throw si las entradas son null', () => {
    // Arrange
    const lineasTicket: any = null;
    // Act
    const result = () => obtenerLineasTiquet(lineasTicket);
    // Assert
    expect(result).toThrow('LineaTicket[] no es válido');
  });

  it('Debería devolver las lineas de ticket de los productos en base a una lista de productos', () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
      {
        producto: {
          nombre: 'Legumbres',
          precio: 2,
          tipoIva: 'general'
        },
        cantidad: 2
      },
      {
        producto: {
          nombre: 'Perfume',
          precio: 20,
          tipoIva: 'general'
        },
        cantidad: 3
      }
    ];
    // Act
    const result = obtenerLineasTiquet(lineasTicket);
    // Assert
    const expected = [
      {
        nombre: 'Legumbres',
        cantidad: 2,
        precionSinIva: 4,
        tipoIva: 'general',
        precioConIva: 4.84
      },
      {
        nombre: 'Perfume',
        cantidad: 3,
        precionSinIva: 60,
        tipoIva: 'general',
        precioConIva: 72.6
      }
    ];
    expect(result).toEqual(expected);
  });
});

describe('totalPorTipoIva', () => {
  it('Debería devolver un throw si entrada es undefined', () => {
    // Arrange
    const lineasTicket: any = undefined;

    // Act
    const result = () => totalPorTipoIva(lineasTicket);
    // Assert
    expect(result).toThrow('LineaTicket[] no es válido');
  });

  it('Debería devolver un throw si las entradas son null', () => {
    // Arrange
    const lineasTicket: any = null;
    // Act
    const result = () => totalPorTipoIva(lineasTicket);
    // Assert
    expect(result).toThrow('LineaTicket[] no es válido');
  });

  it('Debería devolver los desgloses por tipo de ivas de los productos', () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
      {
        producto: {
          nombre: 'Legumbres',
          precio: 2,
          tipoIva: 'general'
        },
        cantidad: 2
      },
      {
        producto: {
          nombre: 'Perfume',
          precio: 20,
          tipoIva: 'general'
        },
        cantidad: 3
      },
      {
        producto: {
          nombre: 'Arroz',
          precio: 5,
          tipoIva: 'reducido'
        },
        cantidad: 1
      }
    ];
    // Act
    const result = totalPorTipoIva(lineasTicket);
    // Assert
    const expected = [
      { tipoIva: 'general', cuantia: 13.44 },
      { tipoIva: 'reducido', cuantia: 0.5 }
    ];
    expect(result).toEqual(expected);
  });
});

describe('sumarTotalIvas', () => {
  it('Debería devolver un throw si entrada es undefined', () => {
    // Arrange
    const resultadoTotalPorIva: any = null;
    // Act
    const result = () => sumarTotalIvas(resultadoTotalPorIva);
    // Assert
    expect(result).toThrow('resultadoTotalPorIva[] no es válido');
  });

  it('Debería devolver un throw si las entradas son null', () => {
    // Arrange
    const resultadoTotalPorIva: any = null;
    // Act
    const result = () => sumarTotalIvas(resultadoTotalPorIva);
    // Assert
    expect(result).toThrow('resultadoTotalPorIva[] no es válido');
  });
  it('Debería devolver la suma de la cuantia de todos los tipos de iva de los productos', () => {
    // Arrange
    const resultadoTotalPorIva: TotalPorTipoIva[] = [
      { tipoIva: 'general', cuantia: 13.44 },
      { tipoIva: 'reducido', cuantia: 0.5 }
    ];
    // Act
    const result = sumarTotalIvas(resultadoTotalPorIva);
    // Assert
    const expected = 13.94;
    expect(result).toBe(expected);
  });
  it('Debería devolver la suma de la cuantia de todos los tipos de iva de los productos', () => {
    // Arrange
    const resultadoTotalPorIva: TotalPorTipoIva[] = [
      { tipoIva: 'general', cuantia: 5 },
      { tipoIva: 'reducido', cuantia: 12 }
    ];
    // Act
    const result = sumarTotalIvas(resultadoTotalPorIva);
    // Assert
    const expected = 17;
    expect(result).toBe(expected);
  });
});

describe('sumarTotalSinIva', () => {
  it('Debería devolver un throw si entrada es undefined', () => {
    // Arrange
    const resultadoLineasTicket: any = null;
    // Act
    const result = () => sumarTotalSinIva(resultadoLineasTicket);
    // Assert
    expect(result).toThrow('resultadoLineasTicket[] no es válido');
  });

  it('Debería devolver un throw si las entradas son null', () => {
    // Arrange
    const resultadoLineasTicket: any = null;
    // Act
    const result = () => sumarTotalSinIva(resultadoLineasTicket);
    // Assert
    expect(result).toThrow('resultadoLineasTicket[] no es válido');
  });
  it('Debería devolver la suma del precio de todos los productos sin iva', () => {
    // Arrange
    const resultadoLineasTicket: ResultadoLineaTicket[] = [
      {
        nombre: 'Legumbres',
        cantidad: 2,
        precionSinIva: 4,
        tipoIva: 'general',
        precioConIva: 4.84
      },
      {
        nombre: 'Perfume',
        cantidad: 3,
        precionSinIva: 60,
        tipoIva: 'general',
        precioConIva: 72.6
      }
    ];
    // Act
    const result = sumarTotalSinIva(resultadoLineasTicket);
    // Assert
    const expected = 64;
    expect(result).toBe(expected);
  });
  it('Debería devolver la suma de la cuantia de todos los tipos de iva de los productos', () => {
    // Arrange
    const resultadoLineasTicket: ResultadoLineaTicket[] = [
      {
        nombre: 'Patatas',
        cantidad: 2,
        precionSinIva: 4,
        tipoIva: 'general',
        precioConIva: 4.84
      },
      {
        nombre: 'Cerveza',
        cantidad: 3,
        precionSinIva: 18,
        tipoIva: 'general',
        precioConIva: 21.78
      }
    ];
    // Act
    const result = sumarTotalSinIva(resultadoLineasTicket);
    // Assert
    const expected = 22;
    expect(result).toBe(expected);
  });
});
