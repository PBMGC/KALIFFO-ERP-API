import { executeDDL } from "../../util/query";

export const triggerInsertCorte = async () => {
  const trigger = `
      CREATE TRIGGER TR_INS_Corte 
AFTER INSERT ON corte
FOR EACH ROW 
BEGIN
    DECLARE total_metraje_usado DECIMAL(10,2);
    DECLARE metraje_faltante DECIMAL(10,2);
    DECLARE tela_metraje DECIMAL(10,2);
    DECLARE selected_tela_id INT;

    SET total_metraje_usado = NEW.metraje_asignado;

    WHILE total_metraje_usado > 0 DO

        SELECT tela_id, metraje INTO selected_tela_id, tela_metraje
        FROM almacen_tela
        WHERE tipo = NEW.tipo_tela AND estado = 1
        ORDER BY fecha_compra ASC
        LIMIT 1;

            IF tela_metraje >= total_metraje_usado THEN
                UPDATE almacen_tela
                SET metraje = metraje - total_metraje_usado
                WHERE tela_id = selected_tela_id;

                SET total_metraje_usado = 0;
            ELSE
                SET metraje_faltante = total_metraje_usado - tela_metraje;
    
                UPDATE almacen_tela
                SET metraje = 0
                WHERE tela_id = selected_tela_id;
    
                SET total_metraje_usado = metraje_faltante;
            END IF;
    END WHILE;

    -- Aquí se cambia NEW.cantidad por NEW.cantidad_enviada
    UPDATE lote
    SET cantidad_total = cantidad_total + NEW.cantidad_enviada
    WHERE lote_id = NEW.lote_id;

END;

  `;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger creado exitosamente.");
  } else {
    // console.log("Error al crear el trigger:", result.error);
  }
};

export const droptriggerInsertCorte = async () => {
  const trigger = `DROP TRIGGER IF EXISTS TR_INS_Corte;`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger eliminado exitosamente.");
  } else {
    // console.log("Error al eliminar el trigger:", result.error);
  }
};

export const triggerUpdatecorte = async () => {
  const trigger = `
      CREATE TRIGGER TR_UPD_Corte 
      AFTER UPDATE ON corte
      FOR EACH ROW 
      BEGIN
          -- Cambiar NEW.cantidad y OLD.cantidad por cantidad_enviada
          UPDATE lote
          SET cantidad_total = cantidad_total + (NEW.cantidad_enviada - OLD.cantidad_enviada)
          WHERE lote_id = NEW.lote_id;
      END;
  `;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger creado exitosamente.");
  } else {
    // console.log("Error al crear el trigger:", result.error);
  }
};

export const droptriggerUpdatecorte = async () => {
  const trigger = `DROP TRIGGER IF EXISTS TR_UPD_Corte;`;

  const result = await executeDDL(trigger);
  if (result.success) {
    // console.log("Trigger eliminado exitosamente.");
  } else {
    // console.log("Error al eliminar el trigger:", result.error);
  }
};
