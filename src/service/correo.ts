// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "kaliffo58@gmail.com",
//     pass: "upqaxeqatavsxrgt",
//   },
// });

// const mailOptions = {
//   from: "kaliffo58@gmail.com",
//   // to: "dariogutierres456@gmail.com",
//   to: "rodrigopalominocastro0@gmail.com",
//   subject: "cambio todo a oracle?",
//   text: "que nos pagueeennnnnnnnnnnnnnnnn",
// };

// export const correo = async () => {
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("Error al enviar el correo:", error);
//         reject({
//           status: 400,
//           msg: "Error al enviar el correo",
//         });
//       } else {
//         console.log("Correo enviado:", info.response);
//         resolve({
//           status: 200,
//           msg: "Correo enviado correctamente",
//         });
//       }
//     });
//   });
// };
