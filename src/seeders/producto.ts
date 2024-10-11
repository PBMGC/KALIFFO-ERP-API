import {
  _createProducto,
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
    estado:1
  },
  {
    nombre: "Jeans Recto Negro",
    stockTotal: 0,
    precioBase: 59.99,
    descuento: 15,
    estado:1
  },
  {
    nombre: "Jeans Slim Fit Gris",
    stockTotal: 0,
    precioBase: 54.99,
    descuento: 5,
  },
  {
    nombre: "Jeans Boyfriend Azul Claro",
    stockTotal: 0,
    precioBase: 44.99,
    descuento: 20,
    estado:1
  },
  {
    nombre: "Jeans Mom Fit Celeste",
    stockTotal: 0,
    precioBase: 39.99,
    descuento: 12,
    estado:1
  },
  {
    nombre: "Jeans Bootcut Azul Oscuro",
    stockTotal: 0,
    precioBase: 64.99,
    descuento: 18,
    estado:1
  },
  {
    nombre: "Jeans Wide Leg Beige",
    stockTotal: 0,
    precioBase: 69.99,
    descuento: 8,
    estado:1
  },
  {
    nombre: "Jeans High-Waist Gris Oscuro",
    stockTotal: 0,
    precioBase: 49.99,
    descuento: 10,
    estado:1
  },
];

const productoDetalles: any = [
  {
    producto_id: 1,
    color_id: 3,
    tienda_id: 1,
    stock: 60,
  },
  {
    producto_id: 1,
    color_id: 5,
    tienda_id: 2,
    stock: 60,
  },
  {
    producto_id: 2,
    color_id: 7,
    tienda_id: 1,
    stock: 40,
  },
  {
    producto_id: 2,
    color_id: 8,
    tienda_id: 2,
    stock: 40,
  },
  {
    producto_id: 3,
    color_id: 9,
    tienda_id: 1,
    stock: 50,
  },
  {
    producto_id: 3,
    color_id: 11,
    tienda_id: 2,
    stock: 50,
  },
  {
    producto_id: 4,
    color_id: 12,
    tienda_id: 1,
    stock: 30,
  },
  {
    producto_id: 4,
    color_id: 14,
    tienda_id: 2,
    stock: 30,
  },
  {
    producto_id: 5,
    color_id: 15,
    tienda_id: 1,
    stock: 45,
  },
  {
    producto_id: 5,
    color_id: 17,
    tienda_id: 2,
    stock: 45,
  },
  {
    producto_id: 6,
    color_id: 18,
    tienda_id: 1,
    stock: 35,
  },
  {
    producto_id: 6,
    color_id: 19,
    tienda_id: 2,
    stock: 35,
  },
  {
    producto_id: 7,
    color_id: 2,
    tienda_id: 1,
    stock: 25,
  },
  {
    producto_id: 7,
    color_id: 6,
    tienda_id: 2,
    stock: 25,
  },
  {
    producto_id: 8,
    color_id: 4,
    tienda_id: 1,
    stock: 37,
  },
  {
    producto_id: 8,
    color_id: 10,
    tienda_id: 2,
    stock: 38,
  },
];

const productoTallas: any = [
  {
    productoDetalle_id: 1,
    talla: "32",
    codigo: "A32",
  },
  {
    productoDetalle_id: 1,
    talla: "34",
    codigo: "A34",
  },
  {
    productoDetalle_id: 2,
    talla: "36",
    codigo: "A36",
  },
  {
    productoDetalle_id: 2,
    talla: "38",
    codigo: "A38",
  },
  {
    productoDetalle_id: 3,
    talla: "30",
    codigo: "B30",
  },
  {
    productoDetalle_id: 3,
    talla: "32",
    codigo: "B32",
  },
  {
    productoDetalle_id: 4,
    talla: "34",
    codigo: "B34",
  },
  {
    productoDetalle_id: 4,
    talla: "36",
    codigo: "B36",
  },
  {
    productoDetalle_id: 5,
    talla: "30",
    codigo: "C30",
  },
  {
    productoDetalle_id: 5,
    talla: "32",
    codigo: "C32",
  },
  {
    productoDetalle_id: 6,
    talla: "34",
    codigo: "C34",
  },
  {
    productoDetalle_id: 6,
    talla: "36",
    codigo: "C36",
  },
  {
    productoDetalle_id: 7,
    talla: "30",
    codigo: "D30",
  },
  {
    productoDetalle_id: 7,
    talla: "32",
    codigo: "D32",
  },
  {
    productoDetalle_id: 8,
    talla: "34",
    codigo: "D34",
  },
  {
    productoDetalle_id: 8,
    talla: "36",
    codigo: "D36",
  },
  {
    productoDetalle_id: 9,
    talla: "30",
    codigo: "E30",
  },
  {
    productoDetalle_id: 9,
    talla: "32",
    codigo: "E32",
  },
  {
    productoDetalle_id: 10,
    talla: "34",
    codigo: "E34",
  },
  {
    productoDetalle_id: 10,
    talla: "36",
    codigo: "E36",
  },
  {
    productoDetalle_id: 11,
    talla: "32",
    codigo: "F32",
  },
  {
    productoDetalle_id: 11,
    talla: "34",
    codigo: "F34",
  },
  {
    productoDetalle_id: 12,
    talla: "36",
    codigo: "F36",
  },
  {
    productoDetalle_id: 12,
    talla: "38",
    codigo: "F38",
  },
  {
    productoDetalle_id: 13,
    talla: "30",
    codigo: "G30",
  },
  {
    productoDetalle_id: 13,
    talla: "32",
    codigo: "G32",
  },
  {
    productoDetalle_id: 14,
    talla: "34",
    codigo: "G34",
  },
  {
    productoDetalle_id: 14,
    talla: "36",
    codigo: "G36",
  },
  {
    productoDetalle_id: 15,
    talla: "30",
    codigo: "H30",
  },
  {
    productoDetalle_id: 15,
    talla: "32",
    codigo: "H32",
  },
  {
    productoDetalle_id: 16,
    talla: "34",
    codigo: "H34",
  },
  {
    productoDetalle_id: 16,
    talla: "36",
    codigo: "H36",
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
        "select * from productoDetalle where producto_id = ? and color_id = ? and tienda_id = ?",
        [
          productoDetalle.producto_id,
          productoDetalle.color_id,
          productoDetalle.tienda_id
        ]
      );

      if (result.data.length === 0) {
        await _createProductoDetalle(productoDetalle);
      }
    } catch (error) {
      console.log("Error al crear productoDetalle:", error);
    }
  }

  await createProductoTalla();
};

export const createProductoTalla = async () => {
  for (const productoTalla of productoTallas) {
    try {
      const result = await query(
        "select * from productoTalla where productoDetalle_id = ? and talla = ? and codigo = ?",
        [
          productoTalla.productoDetalle_id,
          productoTalla.talla,
          productoTalla.codigo,
        ]
      );

      if (result.data.length === 0) {
        await _createProductoTalla(productoTalla);
      }
    } catch (error) {
      console.log("Error al crear productoDetalle:", error);
    }
  }
};

