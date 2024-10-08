import { createSp } from "../../util/funcion_sp";

const queryGetTiendas = `
SELECT 
  tienda.tienda_id,
  tienda.tienda,
  tienda.direccion,
  tienda.telefono,
  SUM(productodetalle.stock) AS total_stock,
  COUNT(DISTINCT usuario.tienda_id) AS total_usuarios
FROM 
  tienda
LEFT JOIN 
  productodetalle ON productodetalle.tienda_id = tienda.tienda_id
LEFT JOIN 
  usuario ON usuario.tienda_id = tienda.tienda_id
GROUP BY 
  tienda.tienda, tienda.direccion, tienda.telefono;
`;

const queryGetTienda = `
SELECT 
  tienda.tienda,
  tienda.direccion,
  tienda.telefono,
  SUM(productodetalle.stock) AS total_stock,
  COUNT(DISTINCT usuario.tienda_id) AS total_usuarios
FROM 
  tienda
LEFT JOIN 
  productodetalle ON productodetalle.tienda_id = tienda.tienda_id
LEFT JOIN 
  usuario ON usuario.tienda_id = tienda.tienda_id
WHERE tienda.tienda_id = t_id;
`;

const queryGetProductoTienda = `
SELECT producto.producto_id, producto.nombre,SUM(productodetalle.stock) as stock,producto.precioBase,producto.descuento
FROM producto
INNER JOIN productodetalle
on producto.producto_id = productodetalle.producto_id
WHERE productodetalle.tienda_id=t_id
GROUP BY producto.producto_id;
`;

const queryGetLoseProductosTienda = `
SELECT producto.nombre, producto.producto_id 
FROM producto
INNER JOIN productodetalle pd1 ON producto.producto_id = pd1.producto_id
LEFT JOIN productodetalle pd2 ON producto.producto_id = pd2.producto_id AND pd2.tienda_id = t_id
WHERE pd1.tienda_id != t_id
AND pd2.producto_id IS NULL
GROUP BY producto.producto_id;
`;

export const initiProcedureGetLoseProductosTienda = async () => {
  await createSp(
    "SP_GetLoseProductosTienda",
    queryGetLoseProductosTienda,
    "IN t_id INT"
  );
};

export const initiProcedureGetProductoTienda = async () => {
  await createSp(
    "SP_GetProductosTienda",
    queryGetProductoTienda,
    "IN t_id INT"
  );
};

export const initiProcedureGetTiendas = async () => {
  await createSp("SP_GetTiendas", queryGetTiendas);
};

export const initiProcedureGetTienda = async () => {
  await createSp("SP_GetTienda", queryGetTienda, "IN t_id INT");
};
