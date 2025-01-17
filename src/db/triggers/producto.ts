import { executeDDL } from "../../util/query";

//Agrega estock a la tabla producto cuando agregas productosDetalle
export const triggerInsertProductoDetalle = async () => {
  const trigger = `
    CREATE TRIGGER TR_INS_productoDetalle AFTER INSERT ON productoDetalle
    FOR EACH ROW BEGIN
        -- Actualizar el stock total del producto, restando el stock antiguo y sumando el nuevo
        UPDATE producto 
        SET producto.stockTotal = producto.stockTotal + NEW.stock
        WHERE producto.producto_id = NEW.producto_id;
    END`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger creado exitosamente.");
  } else {
    // console.log("Error al crear el trigger:", result.error);
  }
};

export const dropTriggerInsertProductoDetalle = async () => {
  const trigger = `DROP TRIGGER IF EXISTS TR_INS_productoDetalle;`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger eliminado exitosamente.");
  } else {
    // console.log("Error al eliminar el trigger:", result.error);
  }
};

//Resta el stock de productoDetalle y producto cuando se crea vetalleVenta
export const triggerRestaStockProducto = async () => {
  const trigger = `
  CREATE TRIGGER restar_stock AFTER INSERT ON detalleVenta
FOR EACH ROW
BEGIN
	-- Restar stock del producto general
    UPDATE producto
    SET stockTotal = stockTotal - NEW.cantidad
    WHERE producto_id = (
        SELECT producto_id 
        FROM productoDetalle 
        WHERE productoDetalle_id = NEW.productoDetalle_id
    );

    -- Restar stock de productoDetalle
    UPDATE productoDetalle
    SET stock = stock - NEW.cantidad
    WHERE productoDetalle_id = NEW.productoDetalle_id;

    
END;
  `;
  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger creado exitosamente.");
  } else {
    // console.log("Error al crear el trigger:", result.error);
  }
};

export const dropTriggerRestaStockProducto = async () => {
  const trigger = `DROP TRIGGER IF EXISTS restar_stock;`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger eliminado exitosamente.");
  } else {
    // console.log("Error al eliminar el trigger:", result.error);
  }
};
