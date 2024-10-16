import { droptriggerInsertCorte, droptriggerUpdatecorte, triggerInsertCorte, triggerUpdatecorte } from "./cortes";
import {
  dropTriggerInsertProductoDetalle,
  dropTriggerRestaStockProducto,
  triggerInsertProductoDetalle,
  triggerRestaStockProducto,
} from "./producto";

export const initTriggers = async () => {
  //borrar
  await dropTriggerInsertProductoDetalle();
  await dropTriggerRestaStockProducto();
  await droptriggerInsertCorte();
  await droptriggerUpdatecorte();

  //crear
  await triggerInsertProductoDetalle();
  await triggerRestaStockProducto();
  await triggerInsertCorte();
  await triggerUpdatecorte();
};
