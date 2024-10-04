import { executeDDL } from "../../util/query";

export const createTrigger = async () => {
  const trigger = `
    CREATE TRIGGER TR_INS_productodetalle AFTER INSERT ON productodetalle
    FOR EACH ROW BEGIN
        -- Actualizar el stock total del producto, restando el stock antiguo y sumando el nuevo
        UPDATE producto 
        SET producto.stockTotal = producto.stockTotal + NEW.stock
        WHERE producto.producto_id = NEW.producto_id;
    END`;

  const result = await executeDDL(trigger);
  if (result.success) {
    console.log("Trigger creado exitosamente.");
  } else {
    console.log("Error al crear el trigger:", result.error);
  }
};
