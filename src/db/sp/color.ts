import { createSp, eliminarProcedimiento } from "../../util/funcion_sp";

const queryCreateColor = `
    INSERT INTO color (nombre, codigo) 
    VALUES (p_nombre, p_codigo);`;

const queryGetColores = `
  SELECT * FROM COLOR;
`;

const initProcedureCreateColor = async () => {
  await createSp(
    "SP_CreateColor",
    queryCreateColor,
    `IN p_nombre VARCHAR(50), IN p_codigo VARCHAR(50)`
  );
};

const initProcedureGetColor = async () => {
  await createSp("SP_GetColores", queryGetColores);
};

export const initProcedureColor = async () => {
  await initProcedureCreateColor();
  await initProcedureGetColor();
};

export const dropProcedureColor = async () => {
  await eliminarProcedimiento("SP_CreateColor");
  await eliminarProcedimiento("SP_GetColores");
};
