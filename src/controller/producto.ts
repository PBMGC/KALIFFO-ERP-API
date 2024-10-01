// import { Request, Response } from "express";
// import { Producto } from "../interface/producto";
// import {
//   _createProducto,
//   _getProducto,
//   _getProductos,
//   _loseProductos,
//   _updateProducto,
//   _getColoresProducto,
// } from "../service/producto";
// import { handleHttp } from "../util/error.handler";

// export const createProducto = async (req: Request, res: Response) => {
//   const { nombre, precio, descuento, detalles } = req.body;
//   const producto: Producto = {
//     nombre,
//     precio,
//     descuento,
//     stockGeneral: 0,
//   };

//   try {
//     const response = await _createProducto(producto, detalles);
//     res.status(response.status).json(response);
//   } catch (error) {
//     handleHttp(res, "error_createProducto", 500);
//   }
// };

// export const getProductos = async (req: Request, res: Response) => {
//   const nombre = req.query.nombre as string;
//   const talla = req.query.talla as string;
//   const color = req.query.color as string;
//   const offset = req.query.offset as string;
//   const limit = req.query.limit as string;
//   const tienda_id = req.query.tienda_id as string;
//   const antiTienda_id = req.query.antiTienda_id as string;

//   try {
//     const response = await _getProductos(
//       Number(offset),
//       Number(limit),
//       nombre,
//       color,
//       talla,
//       Number(tienda_id),
//       Number(antiTienda_id)
//     );
//     res.status(response.status).json(response.items);
//   } catch (error) {
//     handleHttp(res, "error_getProductos", 500);
//   }
// };

// export const getProducto = async (req: Request, res: Response) => {
//   const { producto_id } = req.params;
//   const tienda_id = req.query.tienda_id as string;
//   const color = req.query.color as string;

//   try {
//     const response = await _getProducto(Number(producto_id), tienda_id, color);
//     res.status(response.status).json(response.item);
//   } catch (error) {
//     handleHttp(res, "error_getProducto", 500);
//   }
// };

// export const updateProducto = async (req: Request, res: Response) => {
//   const { producto_id } = req.params;
//   const { nombre, precio, descuento, detalles } = req.body;

//   const updatedProducto: Producto = {
//     nombre,
//     precio,
//     descuento,
//     stockGeneral: 0,
//   };

//   try {
//     const response = await _updateProducto(
//       Number(producto_id),
//       updatedProducto,
//       detalles
//     );
//     res.status(response.status).json(response);
//   } catch (error) {
//     handleHttp(res, "error_updateProducto", 500);
//   }
// };

// export const loseProducto = async (req: Request, res: Response) => {
//   const { tienda_id } = req.params;

//   try {
//     const response = await _loseProductos(tienda_id);
//     res.status(response.status).json(response.items);
//   } catch (error) {
//     handleHttp(res, "error_updateProducto", 500);
//   }
// };

// export const getColoresProducto = async (req: Request, res: Response) => {
//   const { producto_id } = req.params;

//   try {
//     const response = await _getColoresProducto(Number(producto_id));
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     handleHttp(res, "error ", 500);
//   }
// };
