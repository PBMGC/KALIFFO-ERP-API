import { createColores } from "./color";
import { createProducto } from "./producto";
import { createRoles } from "./rol";
import { createTelas } from "./tela";
import { createTienda } from "./tienda";
import { createUsuario } from "./usuario";

export const initSeeders = async () => {
  await createTienda();
  await createUsuario();
  await createColores();
  await createProducto();
  await createRoles();
  // await createVenta();
  await createTelas();
  // await createLotes();
  // await createLavanderia();
};
