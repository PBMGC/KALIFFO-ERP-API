import { executeDDL } from "../../util/query";

//Resta metraje a la tela usada
export const triggerInsertCorte = async () => {
  const trigger = `
      CREATE TRIGGER TR_INS_Corte AFTER INSERT ON cortes
      FOR EACH ROW BEGIN

          UPDATE almacen_telas 
          SET almacen_telas.metraje = almacen_telas.metraje - NEW.metraje_asignado
          WHERE almacen_telas.tela_id = NEW.tela_id;
            
          UPDATE lotes
          SET lotes.cantidad_total = lotes.cantidad_total + NEW.cantidad
          WHERE lotes.lote_id = NEW.lote_id;

      END`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger creado exitosamente.");
  } else {
    // console.log("Error al crear el trigger:", result.error);
  }
};

export const droptriggerInsertCorte  = async () => {
  const trigger = `DROP TRIGGER IF EXISTS TR_INS_Corte;`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger eliminado exitosamente.");
  } else {
    // console.log("Error al eliminar el trigger:", result.error);
  }
};
