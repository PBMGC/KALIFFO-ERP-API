import { Request, Response, Router } from "express";
import { correo } from "../service/correo";

const router = Router();

// router.get("", async (req: Request, res: Response) => {
//   try {
//     console.log("correo");

//     const response = (await correo()) as any;
//     res.status(response.status).json({ message: response.msg });
//   } catch (error) {
//     res.status(500).json({ msg: "Error interno del servidor" });
//   }
// });

export { router };
