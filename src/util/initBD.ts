import connection from "../db/connection";

const tienda = `
CREATE TABLE IF NOT EXISTS tienda (
    tienda_id INT AUTO_INCREMENT PRIMARY KEY,
    tienda VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(9) NOT NULL UNIQUE,
    estado VARCHAR(255) DEFAULT 'activo' NOT NULL,
    INDEX I_tienda (tienda),
    INDEX I_telefono (telefono),
    INDEX I_estado (estado)
);
`;

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
    FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id)
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
    INDEX I_nombre (nombre)
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
    productoDetalle_id INT AUTO_INCREMENT PRIMARY KEY,  -- Agrega un ID único para cada detalle del producto.
    producto_id INT NOT NULL,
    color_id INT NOT NULL,
    tienda_id INT NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES producto(producto_id),
    FOREIGN KEY (color_id) REFERENCES color(color_id),
    FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id),
    INDEX (producto_id),
    INDEX (color_id),
    INDEX (tienda_id)
  );`;

const productoTalla = `
  CREATE TABLE IF NOT EXISTS productoTalla (
    productoDetalle_id INT,
    talla VARCHAR(20),
    codigo VARCHAR(20),
    PRIMARY KEY (productoDetalle_id, talla),
    FOREIGN KEY (productoDetalle_id) REFERENCES productoDetalle(productoDetalle_id),
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
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
);`;

const venta = `
  CREATE TABLE IF NOT EXISTS venta (
    venta_id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(45) NOT NULL,
    tipoVenta INT NOT NULL,
    tipoComprobante INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
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
    FOREIGN KEY (tienda_id) REFERENCES tienda(tienda_id)
  );`;

// Nueva tabla 'detalleVenta'
const detalleVenta = `
  CREATE TABLE IF NOT EXISTS detalleVenta (
    detalleVenta_id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10, 2) NOT NULL,
    precioNeto DECIMAL(10, 2) NOT NULL,
    igv DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES venta(venta_id),
    FOREIGN KEY (producto_id) REFERENCES producto(producto_id),
    INDEX I_ventaid (venta_id),
    INDEX I_productoid (producto_id)
  );`;

export const initBD = async () => {
  const conn = await connection();

  if (conn) {
    try {
      const [resultTienda] = await conn.execute(tienda);
      const [resultUsuario] = await conn.execute(usuario);
      const [resultHorario] = await conn.execute(horario);
      const [resultIncidencia] = await conn.execute(incidencia);
      const [resultProducto] = await conn.execute(producto);
      const [resultColor] = await conn.execute(color);
      const [resultProductoDetalle] = await conn.execute(productoDetalle);
      const [resultProductoTalla] = await conn.execute(productoTalla);
      const [resultPago] = await conn.execute(pago);
      const [resultVenta] = await conn.execute(venta);
      const [resultDetalleVenta] = await conn.execute(detalleVenta);
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
      await conn.execute("DROP TABLE IF EXISTS detalleVenta");
      await conn.execute("DROP TABLE IF EXISTS venta");
      await conn.execute("DROP TABLE IF EXISTS pago");
      await conn.execute("DROP TABLE IF EXISTS productoTalla");
      await conn.execute("DROP TABLE IF EXISTS productoDetalle");
      await conn.execute("DROP TABLE IF EXISTS producto");
      await conn.execute("DROP TABLE IF EXISTS color");
      await conn.execute("DROP TABLE IF EXISTS incidencia");
      await conn.execute("DROP TABLE IF EXISTS horario");
      await conn.execute("DROP TABLE IF EXISTS usuario");
      await conn.execute("DROP TABLE IF EXISTS tienda");

      console.log("Tablas borradas correctamente.");
    } catch (error) {
      console.error("Error al borrar las tablas:", error);
    } finally {
      await conn.end();
    }
  }
};
