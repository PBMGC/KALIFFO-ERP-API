const { exec } = require("child_process");

export const ts = () => {
  const platform = process.platform;

  let command;

  if (platform === "win32") {
    // Comando para reiniciar en Windows
    command = "shutdown /r /t 0";
  } else if (platform === "linux" || platform === "darwin") {
    // Comando para reiniciar en Linux o macOS
    command = "sudo reboot";
  } else {
    console.log("Sistema operativo no soportado.");
    return;
  }

  exec(command, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`Error al ejecutar el comando: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }

    console.log(`Resultado: ${stdout}`);
  });
};
