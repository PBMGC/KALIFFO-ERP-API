import cron from "node-cron";
import { _getProductos } from "../service/producto";
import nodemailer from "nodemailer";
import { query } from "../util/query";

// const mailOptions = {
//   from: "kaliffo58@gmail.com",
//   // to: "dariogutierres456@gmail.com",
//   to: "rodrigopalominocastro0@gmail.com",
//   subject: "Reporte de productos y stock",
//   html: `<h2>Aquí tienes el reporte de productos y sus stocks:</h2>${productDetailsHTML}`,
// };
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kaliffo58@gmail.com",
    pass: "upqaxeqatavsxrgt",
  },
});

const sendEmail = async (productos: any) => {
  const productRowsHTML = productos
    .map(
      (producto: any) =>
        `<tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.codigo}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.nombre}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.precioBase}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.talla}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.color}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.tienda}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${producto.stock}</td>
        </tr>`
    )
    .join("");

  // Definir la estructura completa de la tabla
  const productDetailsHTML = `
    <table
      style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background-color: #f9f9f9; color: #333;"
    >
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Codigo</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Nombre</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Precio</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Talla</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Color</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Tienda</th>
          <th style="border: 1px solid #ddd; padding: 8px; background-color: #4CAF50; color: white;">Stock</th>
        </tr>
      </thead>
      <tbody>
        ${productRowsHTML}
      </tbody>
    </table>`;

  const mailOptions = {
    from: "kaliffo58@gmail.com",
    // to: "rodrigopalominocastro0@gmail.com",
    to: "dariogutierres456@gmail.com",
    subject: "Reporte de productos y stock bajo",
    html: `<h2>Reporte de productos con stock menor a 30:</h2>${productDetailsHTML}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

export const initCronJobs = async () => {
  cron.schedule("0 7,20 * * *", async () => {
    // cron.schedule("23 18 * * *", async () => {
    console.log("Iniciando cron job para obtener productos y enviar correo...");

    const resultProductos = await query(`
      SELECT 
          pt.codigo,
          p.nombre,
          p.precioBase,
          pt.talla,
          c.nombre AS color,
          t.tienda,
          pd.stock
      FROM productoTalla pt
      JOIN productoDetalle pd ON pd.productoDetalle_id = pt.productoDetalle_id
      JOIN producto p ON p.producto_id = pd.producto_id
      JOIN color c ON c.color_id = pd.color_id
      JOIN tienda t ON t.tienda_id = pd.tienda_id
      WHERE pd.stock < 30;
    `);

    const productos = resultProductos.data;

    await sendEmail(productos);
  });
};
