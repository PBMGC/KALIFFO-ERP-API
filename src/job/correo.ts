import cron from "node-cron";
import { _getProductos } from "../service/producto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kaliffo58@gmail.com",
    pass: "upqaxeqatavsxrgt",
  },
});

const sendEmail = async (productos: any[]) => {
  const productDetailsHTML = productos
    .map(
      (producto) =>
        `<p>Producto: <strong>${producto.nombre}</strong>, Stock: <span style="color: green;">${producto.stockTotal}</span></p>`
    )
    .join("");

  const mailOptions = {
    from: "kaliffo58@gmail.com",
    to: "dariogutierres456@gmail.com",
    // to: "rodrigopalominocastro0@gmail.com",
    subject: "Reporte de productos y stock",
    html: `<h2>Aquí tienes el reporte de productos y sus stocks:</h2>${productDetailsHTML}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

export const initCronJobs = async () => {
  cron.schedule("46 13 * * *", async () => {
    console.log("Iniciando cron job para obtener productos y enviar correo...");

    const resultProductos = await _getProductos();
    const productos = resultProductos.items;

    await sendEmail(productos);
  });
};

/* 7am y 8pm */

/* 


Reporte

tabla por tienda por talla lo que esta poco menos de 30


*/
