import connection from "../db/connection";

// Define la estructura de la tabla "usuario"
const usuario = `
CREATE TABLE IF NOT EXISTS usuario (
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE not null,
  password VARCHAR(255) not null,
  rol VARCHAR(255) not null,
  id_tipo INT 
);`;

// Define la estructura de la tabla "tienda"
const tienda = `
CREATE TABLE IF NOT EXISTS tienda (
  tienda_id INT AUTO_INCREMENT PRIMARY KEY,
  tienda VARCHAR(255) NOT NULL UNIQUE,
  direccion VARCHAR(255) NOT NULL UNIQUE,
  telefono VARCHAR(9) NOT NULL UNIQUE,
  estado INT NOT NULL DEFAULT 1,
  INDEX I_tienda (tienda),
  INDEX I_telefono (telefono),
  INDEX I_estado (estado)
);`;

// Define la estructura de la tabla "trabajador"
const trabajador = `
CREATE TABLE IF NOT EXISTS trabajador (
  trabajador_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  ap_paterno VARCHAR(255) NOT NULL,
  ap_materno VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  telefono VARCHAR(9) NOT NULL UNIQUE,
  dni VARCHAR(8) NOT NULL UNIQUE,
  sueldo DECIMAL(10,2) NOT NULL,
  tienda_id INT DEFAULT NULL,
  rol INT NOT NULL,
  INDEX I_dni (dni),
  INDEX I_tiendaid (tienda_id),
  INDEX I_rol (rol),
  FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id) ON DELETE SET NULL
);`;

// Define la estructura de la tabla "horario"
const horario = `
CREATE TABLE IF NOT EXISTS horario (
  horario_id INT AUTO_INCREMENT PRIMARY KEY,
  hora_entrada TIME NOT NULL,
  hora_salida TIME,
  fecha DATE NOT NULL,
  trabajador_id INT NOT NULL,
  INDEX I_trabajadorID (trabajador_id),
  INDEX I_fecha (fecha),
  FOREIGN KEY (trabajador_id) REFERENCES trabajador(trabajador_id) ON DELETE CASCADE
);`;

// Define la estructura de la tabla "incidencia"
const incidencia = `
CREATE TABLE IF NOT EXISTS incidencia (
  incidencia_id INT AUTO_INCREMENT PRIMARY KEY,
  tipo INT NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATE NOT NULL,
  trabajador_id INT NOT NULL,
  INDEX I_tipo (tipo),
  INDEX I_trabajadorID (trabajador_id),
  INDEX I_fechacreacion (fecha),
  FOREIGN KEY (trabajador_id) REFERENCES trabajador(trabajador_id) ON DELETE CASCADE
);`;

// Define la estructura de la tabla "producto"
const producto = `
CREATE TABLE IF NOT EXISTS producto (
  producto_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  stockTotal INT NOT NULL,
  precioBase DECIMAL(10, 2) NOT NULL,
  descuento INT NOT NULL,
  estado INT NOT NULL,
  INDEX I_nombre (nombre),
  INDEX I_stockTotal (stockTotal),
  INDEX I_estado (estado) 
);`;

// Define la estructura de la tabla "color"
const color = `
CREATE TABLE IF NOT EXISTS color (
  color_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  codigo VARCHAR(255) NOT NULL UNIQUE,
  INDEX I_nombre (nombre),
  INDEX I_codigo (codigo)
);`;

// Define la estructura de la tabla "productoDetalle"
const productoDetalle = `
CREATE TABLE IF NOT EXISTS productoDetalle (
  productoDetalle_id INT AUTO_INCREMENT PRIMARY KEY, 
  producto_id INT NOT NULL,
  color_id INT NOT NULL,
  lote_id INT NOT NULL,
  almacen_id INT DEFAULT NULL,
  tienda_id INT DEFAULT NULL,
  stock INT NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES producto(producto_id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES color(color_id),
  FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id),
  FOREIGN KEY (almacen_id) REFERENCES almacen_producto(almacen_id),
  FOREIGN KEY (lote_id) REFERENCES lote(lote_id),
  INDEX (producto_id),
  INDEX (color_id),
  INDEX (tienda_id)
);`;

// Define la estructura de la tabla "productoTalla"
const productoTalla = `
CREATE TABLE IF NOT EXISTS productoTalla (
  productoDetalle_id INT NOT NULL,
  talla VARCHAR(20) NOT NULL,
  codigo VARCHAR(20) NOT NULL,
  FOREIGN KEY (productoDetalle_id) REFERENCES productoDetalle(productoDetalle_id) ON DELETE CASCADE,
  INDEX (codigo)
);`;

// Define la estructura de la tabla "pago"
const pago = `
CREATE TABLE IF NOT EXISTS pago (
  pago_id INT AUTO_INCREMENT PRIMARY KEY,
  montoPagado DECIMAL(10, 2) NOT NULL,
  montoFaltante DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  estado INT NOT NULL,
  trabajador_id INT NOT NULL,
  INDEX I_fecha (fecha),
  INDEX I_estado (estado),
  INDEX I_trabajadorid (trabajador_id),
  FOREIGN KEY (trabajador_id) REFERENCES trabajador(trabajador_id) ON DELETE CASCADE
);`;

// Define la estructura de la tabla "venta"
const venta = `
CREATE TABLE IF NOT EXISTS venta (
  venta_id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(45) NOT NULL UNIQUE,
  estado INT NOT NULL DEFAULT 1,
  tipoVenta INT NOT NULL,
  tipoComprobante INT NOT NULL,
  fecha DATETIME NOT NULL,
  cantidad_total INT NOT NULL,
  totalBruto DECIMAL(10, 2) NOT NULL,
  totalIgv DECIMAL(10, 2) NOT NULL,
  totalNeto DECIMAL(10, 2) NOT NULL,
  tipoPago INT NOT NULL,
  dni VARCHAR(8) NULL,  
  ruc VARCHAR(11) NULL, 
  direccion VARCHAR(50), 
  nombre VARCHAR(50) NOT NULL,
  tienda_id INT NOT NULL,
  INDEX I_fecha (fecha),
  INDEX I_tiendaid (tienda_id),
  FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id) ON DELETE CASCADE
);`;

// Define la estructura de la tabla "detalleVenta"
const detalleVenta = `
CREATE TABLE IF NOT EXISTS detalleVenta (
  venta_id INT NOT NULL,
  productoDetalle_id INT NOT NULL,
  codigo VARCHAR(10) NOT NULL, 
  cantidad INT NOT NULL,
  precioUnitario DECIMAL(10, 2) NOT NULL,
  precioNeto DECIMAL(10, 2) NOT NULL,
  igv DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES venta(venta_id) ON DELETE CASCADE,
  FOREIGN KEY (productoDetalle_id) REFERENCES productoDetalle(productoDetalle_id) ON DELETE CASCADE,
  INDEX I_ventaid (venta_id),
  INDEX I_productoDetalleid (productoDetalle_id)
);`;

// Define la estructura de la tabla "movimientos_tienda_tienda"
const movimientos_tienda_tienda = `
CREATE TABLE IF NOT EXISTS movimientos_tienda_tienda (
  movimiento_ID INT AUTO_INCREMENT PRIMARY KEY,
  tienda_origen_id INT NOT NULL,
  tienda_destino_id INT NOT NULL,
  productoDetalle_id INT NOT NULL,
  talla INT NOT NULL,
  cantidad INT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (tienda_origen_id) REFERENCES tienda(tienda_id) ON DELETE CASCADE,  
  FOREIGN KEY (tienda_destino_id) REFERENCES tienda(tienda_id) ON DELETE CASCADE,
  FOREIGN KEY (productoDetalle_id) REFERENCES productoDetalle(productoDetalle_id) ON DELETE CASCADE,
  INDEX I_tienda_origen (tienda_origen_id),
  INDEX I_tienda_destino (tienda_destino_id),
  INDEX I_productoDetalle_id (productoDetalle_id),
  INDEX I_fecha (fecha)
);`;

// Define la estructura de la tabla "compra"
const compra = `
CREATE TABLE IF NOT EXISTS compra (
  compra_id INT AUTO_INCREMENT PRIMARY KEY,
  empresa_proveedor VARCHAR(30) NOT NULL,
  fecha_compra DATE NOT NULL,
  cantidad INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  tienda_id INT NOT NULL,
  FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id),
  INDEX I_fecha_compra (fecha_compra),
  INDEX I_empresa_proveedor (empresa_proveedor)
);`;

// Define la estructura de la tabla "compra_detalle"
const compra_detalle = `
CREATE TABLE IF NOT EXISTS compra_detalle (
  compraDetalle_id INT AUTO_INCREMENT PRIMARY KEY,
  compra_id INT NOT NULL,                        
  producto VARCHAR(40) NOT NULL,                 
  cantidad INT NOT NULL,                          
  total DECIMAL(10, 2) NOT NULL,                 
  FOREIGN KEY (compra_id) REFERENCES compra(compra_id) ON DELETE CASCADE,
  INDEX I_producto (producto)
);`;

// Define la estructura de la tabla "Envios"
const Envios = `
CREATE TABLE IF NOT EXISTS envio (
  envio_id INT AUTO_INCREMENT PRIMARY KEY,  
  pedido_id INT NOT NULL,
  fecha_envio DATE NOT NULL, 
  cantidad INT NOT NULL,
  estado INT NOT NULL,
  costo_envio DECIMAL(10, 2) NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedido(pedido_id) ON DELETE CASCADE
  INDEX I_pedido_id(pedido_id),
  INDEX I_estado (estado)
);`;

// Define la estructura de la tabla "almacen_tela"
const almacen_tela = `
CREATE TABLE IF NOT EXISTS almacen_tela (
  tela_id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(15) NOT NULL,
  metraje DECIMAL(10, 2) NOT NULL,
  articulo INT NOT NULL,
  empresa_compra VARCHAR(15) NOT NULL,
  estado INT DEFAULT 1,
  fecha_compra DATE,
  INDEX I_tipo (tipo),
  INDEX I_articulo (articulo),
  INDEX I_empresa_compra (empresa_compra),
  INDEX I_estado (estado)
);`;

// Define la estructura de la tabla "lote"
const lote = `
CREATE TABLE IF NOT EXISTS lote (
  lote_id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_lote VARCHAR(50) UNIQUE,
  fecha_creacion DATE NOT NULL,
  tipo_tela VARCHAR(20) NOT NULL,
  metraje DECIMAL(10,2) NOT NULL,
  productos VARCHAR(150) NOT NULL,
  cantidad_total INT DEFAULT 0,
  estado INT DEFAULT 1
);`;

// Define la estructura de la tabla "corte"
const corte = `
CREATE TABLE IF NOT EXISTS corte (
  corte_id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  taller_id INT,
  producto_id INT NOT NULL,
  estado INT DEFAULT 1,
  cantidad_enviada INT NOT NULL,
  cantidad_recibida INT default null,
  talla VARCHAR(20) NOT NULL,
  FOREIGN KEY (lote_id) REFERENCES lote(lote_id) ON DELETE CASCADE,
  FOREIGN KEY (taller_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES producto(producto_id) ON DELETE CASCADE,
  INDEX I_estado (estado),
  INDEX I_lote_id (lote_id),
  INDEX I_taller_id (taller_id),
  INDEX I_producto_id(producto_id),
  INDEX I_cantidad_enviada(cantidad_enviada),
  INDEX I_cantidad_recibida(cantidad_recibida)
);`;

// Define la estructura de la tabla "lavanderia"
const lavanderia = `
CREATE TABLE IF NOT EXISTS lavanderia (
  lavanderia_id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  corte_id INT NOT NULL,
  cantidad_enviada INT NOT NULL,
  cantidad_recibida INT default null,
  talla VARCHAR(20) NOT NULL,
  color_id INT NOT NULL,
  estado INT NOT NULL DEFAULT 1,  
  precio_unidad DECIMAL(10, 2) NOT NULL,
  lavanderia_asignada VARCHAR(40) NOT NULL,
  fecha_envio DATE,  
  fecha_recepcion DATE,
  FOREIGN KEY (lote_id) REFERENCES lote(lote_id) ON DELETE CASCADE,
  FOREIGN KEY (corte_id) REFERENCES corte(corte_id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES color(color_id)
);`;

// Define la estructura de la tabla "taller_acabados"
const taller_acabados = `
CREATE TABLE IF NOT EXISTS taller_acabado (
  acabado_id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,                
  lavanderia_id INT NOT NULL,
  color_id INT NOT NULL,                
  talla VARCHAR(15) NOT NULL, 
  cantidad_recibida INT NOT NULL DEFAULT 0,
  cantidad_enviada INT NOT NULL,       
  estado INT DEFAULT 1,
  fecha_inicio DATE,
  fecha_final DATE, 
  FOREIGN KEY (lote_id) REFERENCES lote(lote_id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES color(color_id) ON DELETE CASCADE,
  FOREIGN KEY (lavanderia_id) REFERENCES lavanderia(lavanderia_id) ON DELETE CASCADE,
  INDEX I_lote_id (lote_id),
  INDEX I_color_id (color_id),
  INDEX I_talla (talla),
  INDEX I_estado (estado)
);`;

// Define la estructura de la tabla "almacen_producto"
const almacen_producto = `
CREATE TABLE IF NOT EXISTS almacen_producto (
  almacen_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_almacen varchar(30) NOT NULL,
  direccion varchar(40) NOT NULL,
  stock_total INT default 0,
  estado INT NOT NULL default 1,
  INDEX I_stock (stock_total),
  INDEX I_estado (estado)
);`;

// Define la estructura de la tabla "movimientos_almacen_tienda"
const movimientos_almacen_tienda = `
CREATE TABLE IF NOT EXISTS movimientos_almacen_tienda (
  movimiento_id INT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE, 
  almacen_origen INT NOT NULL,
  tienda_destino INT NOT NULL, 
  transporte VARCHAR(30) NOT NULL,
  fecha_envio DATE NOT NULL,
  fecha_inicio_envio DATE NOT NULL,
  estado INT NOT NULL DEFAULT 1,
  FOREIGN KEY (almacen_origen) REFERENCES almacen_producto(almacen_id) ON DELETE CASCADE,
  FOREIGN KEY (tienda_destino) REFERENCES tienda(tienda_id) ON DELETE CASCADE,
  INDEX I_codigo (codigo),
  INDEX I_fecha_envio (fecha_envio),
  INDEX I_estado (estado)
);`;

// Define la estructura de la tabla "movimientos_almacen_tienda_detalle"
const movimientos_almacen_tienda_detalle = `
CREATE TABLE IF NOT EXISTS movimientos_almacen_tienda_detalle (
  movimiento_id INT NOT NULL,
  producto_id INT NOT NULL,
  color_id INT NOT NULL,
  talla INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (movimiento_id) REFERENCES movimientos_almacen_tienda(movimiento_id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES producto(producto_id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES color(color_id) ON DELETE CASCADE,
  INDEX I_movimiento_id(movimiento_id),
  INDEX I_producto_id(producto_id),
  INDEX I_color_id(color_id),
  INDEX I_talla(talla),
  INDEX I_cantidad(cantidad)
);`;

// Inicializa la base de datos ejecutando las consultas de creación de tablas
export const initBD = async () => {
  const conn = await connection();
  if (conn) {
    try {
      await conn.execute(usuario);
      await conn.execute(tienda);
      await conn.execute(trabajador);
      await conn.execute(horario);
      await conn.execute(incidencia);
      await conn.execute(producto);
      await conn.execute(color);
      await conn.execute(almacen_producto);
      await conn.execute(lote);
      await conn.execute(corte);
      await conn.execute(lavanderia);
      await conn.execute(taller_acabados);
      await conn.execute(productoDetalle);
      await conn.execute(productoTalla);
      await conn.execute(venta);
      await conn.execute(detalleVenta);
      await conn.execute(movimientos_tienda_tienda);
      await conn.execute(movimientos_almacen_tienda);
      await conn.execute(movimientos_almacen_tienda_detalle);
      await conn.execute(pago);
      await conn.execute(compra);
      await conn.execute(compra_detalle);
      await conn.execute(almacen_tela);
      console.log("Base de datos inicializada con éxito.");
    } catch (error) {
      console.log(error);
    } finally {
      await conn.end();
    }
  }
};
// Elimina las tablas en el orden inverso a sus dependencias
export const borrarBD = async () => {
  const conn = await connection();
  if (conn) {
    try {
      // Desactiva las restricciones de claves foráneas
      await conn.execute("SET foreign_key_checks = 0;");
      await conn.execute(
        "DROP TABLE IF EXISTS movimientos_almacen_tienda_detalle;"
      );
      await conn.execute("DROP TABLE IF EXISTS movimientos_almacen_tienda;");
      await conn.execute("DROP TABLE IF EXISTS taller_acabado;");
      await conn.execute("DROP TABLE IF EXISTS lavanderia;");
      await conn.execute("DROP TABLE IF EXISTS corte;");
      await conn.execute("DROP TABLE IF EXISTS lote;");
      await conn.execute("DROP TABLE IF EXISTS almacen_tela;");
      await conn.execute("DROP TABLE IF EXISTS compra_detalle;");
      await conn.execute("DROP TABLE IF EXISTS compra;");
      await conn.execute("DROP TABLE IF EXISTS detalleVenta;");
      await conn.execute("DROP TABLE IF EXISTS venta;");
      await conn.execute("DROP TABLE IF EXISTS pago;");
      await conn.execute("DROP TABLE IF EXISTS movimientos_tienda_tienda;");
      await conn.execute("DROP TABLE IF EXISTS productoTalla;");
      await conn.execute("DROP TABLE IF EXISTS productoDetalle;");
      await conn.execute("DROP TABLE IF EXISTS color;");
      await conn.execute("DROP TABLE IF EXISTS producto;");
      await conn.execute("DROP TABLE IF EXISTS incidencia;");
      await conn.execute("DROP TABLE IF EXISTS horario;");
      await conn.execute("DROP TABLE IF EXISTS trabajador;");
      await conn.execute("DROP TABLE IF EXISTS tienda;");
      await conn.execute("DROP TABLE IF EXISTS usuario;");
      await conn.execute("DROP TABLE IF EXISTS almacen_producto;");
      console.log("Base de datos eliminada con éxito.");
    } catch (error) {
    } finally {
      // Reactiva las restricciones de claves foráneas
      await conn.execute("SET foreign_key_checks = 1;");
      await conn.end();
    }
  }
};
