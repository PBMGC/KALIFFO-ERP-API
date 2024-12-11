import { createSp } from "../../util/funcion_sp";

const queryGetTiendas = `
SELECT 
  tienda.tienda_id,
  tienda.tienda,
  tienda.direccion,
  tienda.telefono,
  SUM(productodetalle.stock) AS total_stock,
  COUNT(DISTINCT trabajador.tienda_id) AS total_usuarios
FROM 
  tienda
LEFT JOIN 
  productodetalle ON productodetalle.tienda_id = tienda.tienda_id
LEFT JOIN 
  trabajador ON trabajador.tienda_id = tienda.tienda_id
WHERE 
	estado = true
GROUP BY 
  tienda.tienda, tienda.direccion, tienda.telefono;
`;

const queryGetTienda = `
SELECT 
  tienda.tienda,
  tienda.direccion,
  tienda.telefono,
  COALESCE(p.total, 0) AS total_stock, 
  COUNT(DISTINCT trabajador.trabajador_id) AS total_usuarios
FROM 
  tienda
LEFT JOIN (
    SELECT 
        productodetalle.tienda_id, 
        SUM(productodetalle.stock) AS total
    FROM 
        productodetalle
    GROUP BY 
        productodetalle.tienda_id
) p 
ON tienda.tienda_id = p.tienda_id
LEFT JOIN 
  trabajador 
ON trabajador.tienda_id = tienda.tienda_id
WHERE 
  tienda.tienda_id = t_id;
`;

const queryGetProductoTienda = `
SELECT producto.producto_id, producto.nombre,SUM(productodetalle.stock) as stock,producto.precioBase,producto.descuento
FROM producto
INNER JOIN productodetalle
on producto.producto_id = productodetalle.producto_id
WHERE productodetalle.tienda_id=t_id AND producto.estado=1
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

const queryReporteTienda = `
  SELECT 
    t.*, 
    u.usuarios,
    u.usuarios_info, 
    p.productos_info,
    p.total_stock
FROM 
    tienda t
LEFT JOIN (
    SELECT 
        u.tienda_id, 
        GROUP_CONCAT(
            CONCAT("(", 
                u.usuario_id, ",", u.nombre, ",", u.ap_paterno, ",", u.ap_materno, 
                ",", u.telefono, ",", u.dni, ",", u.sueldo, ")"
            ) SEPARATOR ","
        ) AS usuarios_info,
    	COUNT(DISTINCT u.usuario_id) as usuarios
    FROM 
        usuario u
    GROUP BY 
        u.tienda_id
) u 
ON 
    t.tienda_id = u.tienda_id
LEFT JOIN (
    SELECT 
        pd.tienda_id, 
        GROUP_CONCAT(
            CONCAT("(", 
                p.nombre, ",", c.nombre, ",","LT-012", ",", 
                pd.stock, ",", ts.talla, ",", ts.suma_talla, ")"
            ) SEPARATOR ","
        ) AS productos_info,
        SUM(pd.stock) AS total_stock  
    FROM 
        productodetalle pd
    INNER JOIN producto p 
        ON p.producto_id = pd.producto_id
    LEFT JOIN color c 
        ON c.color_id = pd.color_id
    LEFT JOIN (
        SELECT 
            pt.productoDetalle_id, 
            pt.talla AS talla, 
            COUNT(pt.talla) AS suma_talla
        FROM 
            productotalla pt
        GROUP BY 
            pt.productoDetalle_id
    ) ts 
    ON 
        ts.productoDetalle_id = pd.productoDetalle_id
    GROUP BY 
        pd.tienda_id
) p 
ON 
    t.tienda_id = p.tienda_id
WHERE 
    t.tienda_id = t_id
GROUP BY 
    t.tienda_id, u.usuarios_info, p.productos_info, p.total_stock;

`

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

export const initiProcedureGetReporteTienda = async () => {
  await createSp("SP_GetReporteTienda", queryReporteTienda, "IN t_id INT");
};
