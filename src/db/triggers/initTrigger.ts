import { droptriggerInsertCorte, triggerInsertCorte } from "./cortes";
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

  //crear
  await triggerInsertProductoDetalle();
  await triggerRestaStockProducto();
  await triggerInsertCorte();
};
