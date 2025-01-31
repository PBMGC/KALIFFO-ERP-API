import { _createVenta } from "../service/venta";
import { query } from "../util/query";

const ventas: any = [
  {
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-06 14:30:00",
    totalBruto: 120.0,
    totalIgv: 21.6,
    totalNeto: 141.6,
    tipoPago: 2,
    dni: "12345678",
    ruc: "20123456789",
    direccion: "Calle Los Álamos 123",
    telefono: "987654321",
    nombre: "María Ruiz",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 1,
        codigo: "ABC123",
        cantidad: 2,
        precioUnitario: 40.0,
        precioNeto: 76.0,
        igv: 13.68,
      },
      {
        productoDetalle_id: 6,
        codigo: "DEF456",
        cantidad: 1,
        precioUnitario: 80.0,
        precioNeto: 72.0,
        igv: 12.96,
      },
    ],
  },
  {
    tipoVenta: 2,
    tipoComprobante: 2,
    fecha: "2024-10-07 09:45:00",
    totalBruto: 200.0,
    totalIgv: 36.0,
    totalNeto: 236.0,
    tipoPago: 1,
    dni: "23456789",
    ruc: "20876543210",
    direccion: "Calle Larga 456",
    telefono: "912345678",
    nombre: "Carlos García",
    tienda_id: 2,
    detalles: [
      {
        productoDetalle_id: 2,
        codigo: "GHI789",
        cantidad: 3,
        precioUnitario: 60.0,
        precioNeto: 180.0,
        igv: 32.4,
      },
    ],
  },
  {
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-08 16:20:00",
    totalBruto: 250.0,
    totalIgv: 45.0,
    totalNeto: 295.0,
    tipoPago: 2,
    dni: "34567890",
    ruc: "20765432109",
    direccion: "Avenida de los Olivos 789",
    telefono: "987654321",
    nombre: "Pedro López",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 7,
        codigo: "JKL321",
        cantidad: 4,
        precioUnitario: 50.0,
        precioNeto: 190.0,
        igv: 34.2,
      },
      {
        productoDetalle_id: 8,
        codigo: "MNO654",
        cantidad: 1,
        precioUnitario: 60.0,
        precioNeto: 57.0,
        igv: 10.26,
      },
      {
        productoDetalle_id: 12,
        codigo: "XYZ654",
        cantidad: 2,
        precioUnitario: 30.0,
        precioNeto: 58.0,
        igv: 10.44,
      },
    ],
  },
  {
    tipoVenta: 2,
    tipoComprobante: 2,
    fecha: "2024-10-09 12:00:00",
    totalBruto: 150.0,
    totalIgv: 27.0,
    totalNeto: 177.0,
    tipoPago: 1,
    dni: "45678901",
    ruc: "20432198765",
    direccion: "Calle del Sol 234",
    telefono: "912345678",
    nombre: "Ana Jiménez",
    tienda_id: 2,
    detalles: [
      {
        productoDetalle_id: 3,
        codigo: "PQR987",
        cantidad: 2,
        precioUnitario: 75.0,
        precioNeto: 142.5,
        igv: 25.65,
      },
      {
        productoDetalle_id: 5,
        codigo: "ABC654",
        cantidad: 1,
        precioUnitario: 50.0,
        precioNeto: 47.0,
        igv: 8.46,
      },
    ],
  },
  {
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-10 10:15:00",
    totalBruto: 100.0,
    totalIgv: 18.0,
    totalNeto: 118.0,
    tipoPago: 2,
    dni: "56789012",
    ruc: "20345678901",
    direccion: "Jr. Miraflores 123",
    telefono: "987654321",
    nombre: "Luis Torres",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 4,
        codigo: "STU321",
        cantidad: 1,
        precioUnitario: 100.0,
        precioNeto: 95.0,
        igv: 17.1,
      },
      {
        productoDetalle_id: 3,
        codigo: "PQR987",
        cantidad: 2,
        precioUnitario: 35.0,
        precioNeto: 65.0,
        igv: 11.7,
      },
    ],
  },
  {
    tipoVenta: 2,
    tipoComprobante: 1,
    fecha: "2024-10-11 14:50:00",
    totalBruto: 300.0,
    totalIgv: 54.0,
    totalNeto: 354.0,
    tipoPago: 1,
    dni: "67890123",
    ruc: "20987654321",
    direccion: "Calle Pescadores 567",
    telefono: "912345678",
    nombre: "Julio Sánchez",
    tienda_id: 2,
    detalles: [
      {
        productoDetalle_id: 5,
        codigo: "VWX654",
        cantidad: 3,
        precioUnitario: 100.0,
        precioNeto: 285.0,
        igv: 51.3,
      },
      {
        productoDetalle_id: 9,
        codigo: "YZA987",
        cantidad: 1,
        precioUnitario: 15.0,
        precioNeto: 15.0,
        igv: 2.7,
      },
      {
        productoDetalle_id: 6,
        codigo: "DEF456",
        cantidad: 2,
        precioUnitario: 80.0,
        precioNeto: 160.0,
        igv: 28.8,
      },
    ],
  },
  {
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-12 18:30:00",
    totalBruto: 180.0,
    totalIgv: 32.4,
    totalNeto: 212.4,
    tipoPago: 2,
    dni: "78901234",
    ruc: "20876543210",
    direccion: "Calle Los Cedros 345",
    telefono: "987654321",
    nombre: "Fernando Ruiz",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 10,
        codigo: "BCD123",
        cantidad: 2,
        precioUnitario: 90.0,
        precioNeto: 172.0,
        igv: 31.2,
      },
      {
        productoDetalle_id: 6,
        codigo: "DEF456",
        cantidad: 1,
        precioUnitario: 80.0,
        precioNeto: 72.0,
        igv: 12.96,
      },
      {
        productoDetalle_id: 2,
        codigo: "XYZ123",
        cantidad: 2,
        precioUnitario: 35.0,
        precioNeto: 68.0,
        igv: 12.24,
      },
    ],
  },
  {
    tipoVenta: 2,
    tipoComprobante: 1,
    fecha: "2024-10-13 11:00:00",
    totalBruto: 130.0,
    totalIgv: 23.4,
    totalNeto: 153.4,
    tipoPago: 1,
    dni: "89012345",
    ruc: "20987654321",
    direccion: "Calle El Sol 789",
    telefono: "912345678",
    nombre: "Elena Gutiérrez",
    tienda_id: 2,
    detalles: [
      {
        productoDetalle_id: 11,
        codigo: "EFG321",
        cantidad: 2,
        precioUnitario: 65.0,
        precioNeto: 124.0,
        igv: 22.32,
      },
      {
        productoDetalle_id: 4,
        codigo: "STU321",
        cantidad: 1,
        precioUnitario: 65.0,
        precioNeto: 55.0,
        igv: 9.9,
      },
    ],
  },
];

export const createVenta = async () => {
  for (const venta of ventas) {
    try {
      const result = await query("select * from venta where dni = ?", [
        venta.dni,
      ]);

      if (result.data.length === 0) {
        await _createVenta(venta);
      }
    } catch (error) {
      console.log("Error al crear producto:", error);
    }
  }
};

//modelo de base datos
//normalizo
