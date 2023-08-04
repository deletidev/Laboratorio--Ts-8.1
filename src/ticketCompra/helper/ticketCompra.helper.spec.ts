import { LineaTicket } from '../modelo';
import {
  obtenerLineasTiquet,
  sumarTotalIvas,
  sumarTotalSinIva,
  totalPorTipoIva
} from './ticketCompra.helper';

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

  it('Debería devolver la suma de la cuantia de todos los tipos de iva de los productos', () => {
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
          nombre: 'Mijo',
          precio: 5,
          tipoIva: 'reducido'
        },
        cantidad: 1
      }
    ];
    // Act
    const result = sumarTotalIvas(lineasTicket);
    // Assert
    const expected = 1.34;
    expect(result).toBe(expected);
  });
  it('Debería devolver la suma de la cuantia de todos los tipos de iva de los productos', () => {
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
    const result = sumarTotalIvas(lineasTicket);
    // Assert
    const expected = 13.94;
    expect(result).toBe(expected);
  });
});

describe('sumarTotalSinIva', () => {
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
  it('Debería devolver la suma del precio de todos los productos sin iva', () => {
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
          nombre: 'Arroz',
          precio: 5,
          tipoIva: 'reducido'
        },
        cantidad: 1
      }
    ];
    // Act
    const result = sumarTotalSinIva(lineasTicket);
    // Assert
    const expected = 9;
    expect(result).toBe(expected);
  });
  it('Debería devolver la suma del precio de todos los productos sin iva', () => {
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
    const result = sumarTotalSinIva(lineasTicket);
    // Assert
    const expected = 69;
    expect(result).toBe(expected);
  });
});
