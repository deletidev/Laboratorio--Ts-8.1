import { LineaTicket } from './modelo';
import { calculaTicket } from './ticketCompra';

describe('calculaTicket', () => {
  it('Debería devolver un throw si el ticket es undefined', () => {
    // Arrange
    const productos: any = undefined;

    // Act
    const result = () => calculaTicket(productos);
    // Assert
    expect(result).toThrow('No existe el ticket');
  });
  it('Debería devolver un throw si el ticket es null', () => {
    // Arrange
    const productos: any = null;

    // Act
    const result = () => calculaTicket(productos);
    // Assert
    expect(result).toThrow('No existe el ticket');
  });
  it('Debería devolver un ticket', () => {
    // Arrange
    const productos: LineaTicket[] = [
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
          nombre: 'Leche',
          precio: 1,
          tipoIva: 'superreducidoC'
        },
        cantidad: 6
      },
      {
        producto: {
          nombre: 'Lasaña',
          precio: 5,
          tipoIva: 'superreducidoA'
        },
        cantidad: 1
      }
    ];

    // Act
    const result = calculaTicket(productos);

    // Assert
    expect(result).toEqual({
      lineas: [
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
        },
        {
          nombre: 'Leche',
          cantidad: 6,
          precionSinIva: 6,
          tipoIva: 'superreducidoC',
          precioConIva: 6
        },
        {
          nombre: 'Lasaña',
          cantidad: 1,
          precionSinIva: 5,
          tipoIva: 'superreducidoA',
          precioConIva: 5.25
        }
      ],
      total: { totalSinIva: 75, totalConIva: 88.69, totalIva: 13.69 },
      desgloseIva: [
        { tipoIva: 'general', cuantia: 13.44 },
        { tipoIva: 'superreducidoA', cuantia: 0.25 }
      ]
    });
  });
  it('Debería devolver un ticket', () => {
    // Arrange
    const productos: LineaTicket[] = [
      {
        producto: {
          nombre: 'Legumbres',
          precio: 2,
          tipoIva: 'general'
        },
        cantidad: 2
      }
    ];

    // Act
    const result = calculaTicket(productos);

    // Assert
    expect(result).toEqual({
      lineas: [
        {
          nombre: 'Legumbres',
          cantidad: 2,
          precionSinIva: 4,
          tipoIva: 'general',
          precioConIva: 4.84
        }
      ],
      total: { totalSinIva: 4, totalConIva: 4.84, totalIva: 0.84 },
      desgloseIva: [{ tipoIva: 'general', cuantia: 0.84 }]
    });
  });
});
