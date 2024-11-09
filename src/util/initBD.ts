import connection from "../db/connection";

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

const usuario = `
CREATE TABLE IF NOT EXISTS usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ap_paterno VARCHAR(255) NOT NULL,
    ap_materno VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(9) NOT NULL UNIQUE,
    dni VARCHAR(8) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    sueldo DECIMAL(10,2) NOT NULL,
    tienda_id INT DEFAULT NULL,
    rol INT NOT NULL,
    INDEX I_dni (dni),
    INDEX I_tiendaid (tienda_id),
    INDEX I_rol (rol),
    FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id) ON DELETE SET NULL
);`;

const horario = `
CREATE TABLE IF NOT EXISTS horario (
    horario_id INT AUTO_INCREMENT PRIMARY KEY,
    hora_entrada TIME NOT NULL,
    hora_salida TIME,
    fecha DATE NOT NULL,
    usuario_id INT NOT NULL,
    INDEX I_usuarioID (usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);`;

const incidencia = `
CREATE TABLE IF NOT EXISTS incidencia (
    incidencia_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo INT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion DATE NOT NULL,
    usuario_id INT NOT NULL,
    INDEX I_tipo (tipo),
    INDEX I_usuarioID (usuario_id),
    INDEX I_fechacreacion (fecha_creacion),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);`;

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

const color = `
CREATE TABLE IF NOT EXISTS color (
    color_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    codigo VARCHAR(255) NOT NULL UNIQUE,
    INDEX I_nombre (nombre),
    INDEX I_codigo (codigo)
);`;

const productoDetalle = `
CREATE TABLE IF NOT EXISTS productoDetalle (
    productoDetalle_id INT AUTO_INCREMENT PRIMARY KEY, 
    producto_id INT NOT NULL,
    color_id INT NOT NULL,
    lote_id INT NOT NULL,
    almacen_id INT,
    tienda_id INT,
    stock INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES producto(producto_id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES color(color_id),
    FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id),
    INDEX (producto_id),
    INDEX (color_id),
    INDEX (tienda_id)
);`;

const productoTalla = `
CREATE TABLE IF NOT EXISTS productoTalla (
    productoDetalle_id INT NOT NULL,
    talla VARCHAR(20) NOT NULL,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (productoDetalle_id) REFERENCES productoDetalle(productoDetalle_id) ON DELETE CASCADE, -- Borrar productoDetalle elimina productoTalla
    INDEX (codigo)
);`;

const pago = `
CREATE TABLE IF NOT EXISTS pago (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    montoPagado DECIMAL(10, 2) NOT NULL,
    montoFaltante DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    estado INT NOT NULL,
    usuario_id INT NOT NULL,
    INDEX I_fecha (fecha),
    INDEX I_estado (estado),
    INDEX I_usuarioid (usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);`;

//se necesita un campo de cantidad total
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
    direccion VARCHAR(50) NOT NULL, 
    telefono VARCHAR(50) NOT NULL, 
    nombre VARCHAR(50) NOT NULL,
    tienda_id INT NOT NULL,
    INDEX I_fecha (fecha),
    INDEX I_tiendaid (tienda_id),
    FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id) ON DELETE CASCADE
);`;

/*
  tipoVenta => 
    1 => por menor
    2 => por mayor

  tipoComprobante => 
    1 => boleta
    2 => factura
*/
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

const movimientoMercaderia = `
CREATE TABLE IF NOT EXISTS movimientoMercaderia (
    movimiento_ID INT AUTO_INCREMENT PRIMARY KEY,
    tienda_origen_id INT NOT NULL,
    tienda_destino_id INT NOT NULL,
    productoDetalle_id INT NOT NULL,
    talla VARCHAR(20) NOT NULL,
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

const compras = `
  CREATE TABLE IF NOT EXISTS compras (
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

const compras_detalle = `
CREATE TABLE IF NOT EXISTS compras_detalle (
    compraDetalle_id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,                        
    producto VARCHAR(40) NOT NULL,                 
    cantidad INT NOT NULL,                          
    total DECIMAL(10, 2) NOT NULL,                 
    FOREIGN KEY (compra_id) REFERENCES compras(compra_id) ON DELETE CASCADE,
    INDEX I_producto (producto)
);`;

const Envios = `
  CREATE TABLE IF NOT EXISTS envios (
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

const Almacenes = `
CREATE TABLE IF NOT EXISTS almacenes (
    almacen_id INT AUTO_INCREMENT PRIMARY KEY,    
    nombre VARCHAR(255) NOT NULL UNIQUE,  
    direccion VARCHAR(255) NOT NULL,              
    estado INT NOT NULL,                 
    STOCK INT,               
    INDEX I_estado (estado)   
);`;

const almacen_telas = `
  CREATE TABLE IF NOT EXISTS almacen_telas (
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

//estado 0 = desactivado
//estado 1 = corte
//estado 2 = lavanderia
//estado 3 = taller
//estado 4 = almacen
const lotes = `
  CREATE TABLE IF NOT EXISTS lotes (
    lote_id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_lote VARCHAR(50) UNIQUE,
    fecha_creacion DATE NOT NULL,
    cantidad_total INT DEFAULT 0,
    estado INT DEFAULT 1
);`;

//estado 0 = desactivado
//estado 1 = inicio
//estado 2 = proceso
//estado 3 = finalizado
const cortes = `
CREATE TABLE IF NOT EXISTS cortes (
    corte_id INT AUTO_INCREMENT PRIMARY KEY,
    lote_id INT NOT NULL,
    taller_id INT NOT NULL,
    producto_id INT NOT NULL,
    estado INT DEFAULT 1,
    cantidad_enviada INT NOT NULL,
    cantidad_recibida INT default null,
    talla VARCHAR(20) NOT NULL,
    metraje_asignado DECIMAL(10, 2) NOT NULL,
    tipo_tela VARCHAR(20) NOT NULL,
    FOREIGN KEY (lote_id) REFERENCES lotes(lote_id) ON DELETE CASCADE,
    FOREIGN KEY (taller_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(producto_id) ON DELETE CASCADE,
    INDEX I_estado (estado),
    INDEX I_lote_id (lote_id),
    INDEX I_taller_id (taller_id),
    INDEX I_producto_id(producto_id),
    INDEX I_cantidad_enviada(cantidad_enviada),
    INDEX I_cantidad_recibida(cantidad_recibida)
);`;

//estado 0 = desactivado
//estado 1 = inicio
//estado 2 = proceso
//estado 3 = finalizado
const lavanderia = `
CREATE TABLE IF NOT EXISTS lavanderia (
  lavanderia_id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,
  cantidad_enviada INT NOT NULL,
  cantidad_recibida INT default null,
  color_id INT NOT NULL,
  talla VARCHAR(20) NOT NULL,
  estado INT NOT NULL DEFAULT 1,  
  precio_unidad DECIMAL(10, 2) NOT NULL,
  lavanderia_asignada VARCHAR(40) NOT NULL,
  fecha_envio DATE,  
  fecha_recepcion DATE,
  FOREIGN KEY (lote_id) REFERENCES lotes(lote_id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES color(color_id)
);`;

//estado 0 = desactivado
//estado 1 = inicio
//estado 2 = proceso
//estado 3 = finalizado
const taller_acabados = `
CREATE TABLE IF NOT EXISTS taller_acabados (
  acabado_id INT AUTO_INCREMENT PRIMARY KEY,
  lote_id INT NOT NULL,                      
  color_id INT NOT NULL,                     
  talla VARCHAR(15) NOT NULL,               
  cantidad_recibida INT NOT NULL DEFAULT 0,                  
  cantidad_enviada INT NOT NULL,                   
  estado INT DEFAULT 1,
  fecha_inicio DATE,
  fecha_final DATE, 
  FOREIGN KEY (lote_id) REFERENCES lotes(lote_id) ON DELETE CASCADE,
  FOREIGN KEY (color_id) REFERENCES color(color_id) ON DELETE CASCADE,
  INDEX I_lote_id (lote_id),
  INDEX I_color_id (color_id),
  INDEX I_talla (talla),
  INDEX I_estado (estado)
);`;

//estado 0 = desactivado
//estado 1 = inicio
//estado 2 = proceso
//estado 3 = finalizado
const almacen_productos = `
CREATE TABLE almacen_productos (
    almacen_id INT PRIMARY KEY,
    producto_id INT,
    lote_id INT,
    cantidad INT NOT NULL,
    fecha_ingreso TIMESTAMP ,
    fecha_salida TIMESTAMP,
    estado INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id) ON DELETE CASCADE,
    FOREIGN KEY (lote_id) REFERENCES lotes(lote_id) ON DELETE CASCADE
);`;

export const initBD = async () => {
  const conn = await connection();

  if (conn) {
    try {
      await conn.execute(tienda);
      await conn.execute(usuario);
      await conn.execute(horario);
      await conn.execute(incidencia);
      await conn.execute(producto);
      await conn.execute(color);
      await conn.execute(productoDetalle);
      await conn.execute(productoTalla);
      await conn.execute(movimientoMercaderia);
      await conn.execute(pago);
      await conn.execute(venta);
      await conn.execute(detalleVenta);
      await conn.execute(compras);
      await conn.execute(compras_detalle);
      await conn.execute(almacen_telas);
      await conn.execute(lotes);
      await conn.execute(cortes);
      await conn.execute(lavanderia);
      await conn.execute(taller_acabados);
    } catch (error) {
      console.error("Error al crear las tablas:", error);
    } finally {
      await conn.end();
    }
  }
};

export const borrarBD = async () => {
  const conn = await connection();

  if (conn) {
    try {
      await conn.execute("SET foreign_key_checks = 0;");
      await conn.execute("DROP TABLE IF EXISTS detalleVenta");
      await conn.execute("DROP TABLE IF EXISTS venta");
      await conn.execute("DROP TABLE IF EXISTS pago");
      await conn.execute("DROP TABLE IF EXISTS compras_detalle");
      await conn.execute("DROP TABLE IF EXISTS compras");
      await conn.execute("DROP TABLE IF EXISTS envios");
      await conn.execute("DROP TABLE IF EXISTS productoTalla");
      await conn.execute("DROP TABLE IF EXISTS movimientoMercaderia");
      await conn.execute("DROP TABLE IF EXISTS productoDetalle");
      await conn.execute("DROP TABLE IF EXISTS producto");
      await conn.execute("DROP TABLE IF EXISTS color");
      await conn.execute("DROP TABLE IF EXISTS incidencia");
      await conn.execute("DROP TABLE IF EXISTS horario");
      await conn.execute("DROP TABLE IF EXISTS usuario");
      await conn.execute("DROP TABLE IF EXISTS tienda");
      await conn.execute("DROP TABLE IF EXISTS almacen_telas");
      await conn.execute("DROP TABLE IF EXISTS lotes");
      await conn.execute("DROP TABLE IF EXISTS cortes");
      await conn.execute("DROP TABLE IF EXISTS lavanderia");
      await conn.execute("DROP TABLE IF EXISTS taller_acabados");
      await conn.execute("SET foreign_key_checks = 1;");
      console.log("Tablas borradas correctamente.");
    } catch (error) {
      console.error("Error al borrar las tablas:", error);
    } finally {
      await conn.end();
    }
  }
};
