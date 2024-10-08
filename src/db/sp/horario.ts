import { createSp } from "../../util/funcion_sp";

const queryDeleteHorario = `
  DELETE FROM horario WHERE horario_id = h_id;
`;

export const initProcedureDeleteHorario = async () => {
  await createSp("SP_DeleteHorario", queryDeleteHorario, "IN h_id INT");
};
