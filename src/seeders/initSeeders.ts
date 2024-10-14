import { createColores } from "./color";
import { createProducto } from "./producto";
import { createTienda } from "./tienda";
import { createPago, createUsuario } from "./usuario";
import { createVenta } from "./venta";

export const initSeeders = async () => {
  await createTienda();
  await createUsuario();
  await createColores();
  await createProducto();
  await createVenta();
};
