import { createSp } from "../../util/funcion_sp";

const queryDeletePago = `
  DELETE FROM pago WHERE pago_id = p_id;
`;

export const initProcedureDeletePago = async () => {
  await createSp("SP_DeletePago", queryDeletePago, "IN p_id INT");
};
