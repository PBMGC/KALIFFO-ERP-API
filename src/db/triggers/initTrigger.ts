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

  //crear
  await triggerInsertProductoDetalle();
  await triggerRestaStockProducto();
};
