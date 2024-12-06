import { query } from "../util/query";

export const _createAlmacen_Productos = async (AlmacenProductos: any) => {
  const queryText = `
    INSERT INTO almacen_producto (nombre_almacen,direccion) 
    VALUES (?, ?)`;

  try {
    const result = await query(queryText, [
      AlmacenProductos.nombre_almacen,
      AlmacenProductos.direccion,
    ]);

    return {
      message: "Almacen de Productos creado con exito",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error al crear Almacen",
      success: false,
      status: 500,
    };
  }
};

export const _UpdateAlmacen_Productos = async (updateAlmacenProductos: any) => {
  try {
    await query(`CALL sp_UpdateAlmacen_Producto(?,?,?)`, [
      updateAlmacenProductos.almacen_id,
      updateAlmacenProductos.nombre_almacen || null,
      updateAlmacenProductos.direccion || null,
    ]);

    return {
      message: "Almacen de Productos actualizado exitosamente",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al actualizar el almacen de productos.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getAlmacen_productos = async () => {
  try {
    const result = await query("SELECT * from almacen_producto");
    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "Error _getAlmacen_productos",
      success: false,
      status: 500,
    };
  }
};
