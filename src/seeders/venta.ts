import { _createVenta } from "../service/venta";
import { query } from "../util/query";

const ventas: any = [
  {
    codigo: "5942f1",
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-01",
    totalBruto: 150.0,
    totalIgv: 27.0,
    totalNeto: 177.0,
    tipoPago: 2,
    dni: "87654321",
    ruc: "20123456789",
    direccion: "Calle Los Pinos 123",
    telefono: "987654321",
    nombre: "Juan Perez",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 1,
        codigo: "XYZ123",
        cantidad: 3,
        precioUnitario: 50.0,
        precioNeto: 142.5,
        igv: 25.65,
      },
    ],
  },
  {
    codigo: "5942f2",
    tipoVenta: 2,
    tipoComprobante: 2,
    fecha: "2024-10-02",
    totalBruto: 300.0,
    totalIgv: 54.0,
    totalNeto: 354.0,
    tipoPago: 1,
    dni: "98765432",
    ruc: "20987654321",
    direccion: "Avenida Sol 789",
    telefono: "912345678",
    nombre: "Ana Lopez",
    tienda_id: 2,
    detalles: [
      {
        productoDetalle_id: 2,
        codigo: "LMN456",
        cantidad: 2,
        precioUnitario: 150.0,
        precioNeto: 285.0,
        igv: 51.3,
      },
    ],
  },
  {
    codigo: "5942f3",
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-03",
    totalBruto: 100.0,
    totalIgv: 18.0,
    totalNeto: 118.0,
    tipoPago: 2,
    dni: "65432198",
    ruc: "20876543210",
    direccion: "Calle Lima 345",
    telefono: "987654321",
    nombre: "Carlos Sanchez",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 3,
        codigo: "OPQ789",
        cantidad: 1,
        precioUnitario: 100.0,
        precioNeto: 95.0,
        igv: 17.1,
      },
    ],
  },
  {
    codigo: "5942f4",
    tipoVenta: 2,
    tipoComprobante: 1,
    fecha: "2024-10-04",
    totalBruto: 80.0,
    totalIgv: 14.4,
    totalNeto: 94.4,
    tipoPago: 1,
    dni: "87654312",
    ruc: "20432198765",
    direccion: "Calle Amazonas 456",
    telefono: "912345678",
    nombre: "Lucia Castro",
    tienda_id: 2,
    detalles: [
      {
        productoDetalle_id: 4,
        codigo: "RST123",
        cantidad: 1,
        precioUnitario: 80.0,
        precioNeto: 75.0,
        igv: 13.5,
      },
    ],
  },
  {
    codigo: "5942f5",
    tipoVenta: 1,
    tipoComprobante: 1,
    fecha: "2024-10-05",
    totalBruto: 200.0,
    totalIgv: 36.0,
    totalNeto: 236.0,
    tipoPago: 2,
    dni: "54321678",
    ruc: "20765432109",
    direccion: "Avenida Central 123",
    telefono: "987654321",
    nombre: "Jose Fernandez",
    tienda_id: 1,
    detalles: [
      {
        productoDetalle_id: 5,
        codigo: "UVW456",
        cantidad: 4,
        precioUnitario: 50.0,
        precioNeto: 190.0,
        igv: 34.2,
      },
    ],
  },
];

export const createVenta = async () => {
  for (const venta of ventas) {
    try {
      const result = await query("select * from venta where codigo = ?", [
        venta.codigo,
      ]);

      if (result.data.length === 0) {
        await _createVenta(venta);
      }
    } catch (error) {
      console.log("Error al crear producto:", error);
    }
  }
};
