import { createSp } from "../../util/funcion_sp";

const queryColoresProductos = `
  SELECT c.*
  FROM color c
  INNER JOIN productodetalle p ON c.color_id = p.color_id
  WHERE p.producto_id = id_p
  GROUP BY c.color_id;
`;

const queryGetDetalleProducto = `
SET @consulta = '
    SELECT 
        pd.productoDetalle_id,
        c.nombre AS color_nombre, 
        pd.stock
    FROM 
        productodetalle pd
    INNER JOIN 
        color c ON pd.color_id = c.color_id
    WHERE 
        pd.producto_id = ?
';

IF t_id IS NOT NULL AND t_id != ' ' THEN
  SET @consulta = CONCAT(@consulta, ' AND pd.tienda_id = ', t_id);
END IF;

PREPARE stmt FROM @consulta;
EXECUTE stmt using p_id;
DEALLOCATE PREPARE stmt;
`;

const queryGetColoresProducto = `
    SET @consulta = '
        SELECT 
            pd.productoDetalle_id,
            c.nombre AS color_nombre, 
            pd.stock
        FROM 
            productodetalle pd
        INNER JOIN 
            color c ON pd.color_id = c.color_id
        WHERE 
            pd.producto_id = ?
    ';
    
    IF t_id IS NOT NULL AND t_id != '' THEN
        SET @consulta = CONCAT(@consulta, ' AND pd.tienda_id = ', t_id);
    END IF;

    PREPARE stmt FROM @consulta;
    EXECUTE stmt USING p_id;
    DEALLOCATE PREPARE stmt;
`;
// SP_GetColoresProducto
export const initProcedureGetColoresProductos = async () => {
  await createSp(
    "SP_GetColoresProducto",
    queryGetColoresProducto,
    "IN p_id INT, IN t_id INT"
  );
};

export const initProcedureColoresProductos = async () => {
  await createSp("SP_ColoresProductos", queryColoresProductos, "IN id_p INT");
};

export const initiProcedureGetDetalleProducto = async () => {
  await createSp(
    "SP_GetDetalleProducto",
    queryGetDetalleProducto,
    "IN p_id INT,IN t_id INT"
  );
};
