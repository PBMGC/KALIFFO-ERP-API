import {
  _createProducto,
  _createProductoCompleto,
  _createProductoDetalle,
  _createProductoTalla,
} from "../service/producto";
import { query } from "../util/query";

const productos: any = [
  {
    nombre: "Jeans Skinny Azul",
    stockTotal: 0,
    precioBase: 49.99,
    descuento: 10,
    estado: 1,
  },
  {
    nombre: "Jeans Recto Negro",
    stockTotal: 0,
    precioBase: 59.99,
    descuento: 15,
    estado: 1,
  },
  {
    nombre: "Jeans Slim Fit Gris",
    stockTotal: 0,
    precioBase: 54.99,
    descuento: 5,
    estado: 1,
  },
  {
    nombre: "Jeans Boyfriend Azul Claro",
    stockTotal: 0,
    precioBase: 44.99,
    descuento: 20,
    estado: 1,
  },
  {
    nombre: "Jeans Mom Fit Celeste",
    stockTotal: 0,
    precioBase: 39.99,
    descuento: 12,
    estado: 1,
  },
  {
    nombre: "Jeans Bootcut Azul Oscuro",
    stockTotal: 0,
    precioBase: 64.99,
    descuento: 18,
    estado: 1,
  },
  {
    nombre: "Jeans Wide Leg Beige",
    stockTotal: 0,
    precioBase: 69.99,
    descuento: 8,
    estado: 1,
  },
  {
    nombre: "Jeans High-Waist Gris Oscuro",
    stockTotal: 0,
    precioBase: 49.99,
    descuento: 10,
    estado: 1,
  },
];

const productoDetalles: any = [
  {
    producto_id: 1,
    detalles: [
      {
        color_id: 3,
        talla: "32",
        stock: 45,
      },
      {
        color_id: 5,
        talla: "34",
        stock: 75,
      },
    ],
  },
  {
    producto_id: 2,
    detalles: [
      {
        color_id: 7,
        talla: "36",
        stock: 30,
      },
    ],
  },
  {
    producto_id: 3,
    detalles: [
      {
        color_id: 9,
        talla: "30",
        stock: 40,
      },
      {
        color_id: 11,
        talla: "32",
        stock: 70,
      },
    ],
  },
  {
    producto_id: 4,
    detalles: [
      {
        color_id: 12,
        talla: "34",
        stock: 20,
      },
    ],
  },
  {
    producto_id: 5,
    detalles: [
      {
        color_id: 15,
        talla: "30",
        stock: 50,
      },
      {
        color_id: 17,
        talla: "32",
        stock: 70,
      },
      {
        color_id: 19,
        talla: "34",
        stock: 60,
      },
    ],
  },
  {
    producto_id: 6,
    detalles: [
      {
        color_id: 18,
        talla: "34",
        stock: 25,
      },
    ],
  },
  {
    producto_id: 7,
    detalles: [
      {
        color_id: 2,
        talla: "30",
        stock: 15,
      },
      {
        color_id: 6,
        talla: "32",
        stock: 35,
      },
    ],
  },
];

export const createProducto = async () => {
  for (const producto of productos) {
    try {
      const result = await query("select * from producto where nombre = ?", [
        producto.nombre,
      ]);

      if (result.data.length === 0) {
        await _createProducto(producto);
      }
    } catch (error) {
      console.log("Error al crear producto:", error);
    }
  }

  await createProductoDetalle();
};

export const createProductoDetalle = async () => {
  for (const productoDetalle of productoDetalles) {
    try {
      const result = await query(
        "select * from productoDetalle where producto_id = ?  and tienda_id = 1",
        [productoDetalle.producto_id]
      );

      if (result.data.length === 0) {
        await _createProductoCompleto(
          1,
          productoDetalle.producto_id,
          productoDetalle.detalles
        );
      }
    } catch (error) {
      console.log("Error al crear productoDetalle:", error);
    }
  }
};
