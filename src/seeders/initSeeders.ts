import { createColores } from "./color";
import { createProducto } from "./producto";
import { createTienda } from "./tienda";
import { createPago, createUsuario } from "./usuario";

export const initSeeders = async () => {
  await createTienda();
  await createUsuario();
  await createColores();
  await createProducto();
};
