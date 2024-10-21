import { createColores } from "./color";
import { createProducto } from "./producto";
import { createTelas } from "./tela";
import { createTienda } from "./tienda";
import { createUsuario } from "./usuario";
import { createVenta } from "./venta";

export const initSeeders = async () => {
  await createTienda();
  await createUsuario();
  await createColores();
  await createProducto();
  await createVenta();
  await createTelas();
  // await createCortes();
};
