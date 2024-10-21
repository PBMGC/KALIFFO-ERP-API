import { Router } from "express";
import { createTela, desactivarTela, updateTela } from "../controller/telas";

const router = Router();


router.post("/create",createTela)

router.put("/update/:tela_id",updateTela)
router.put("/desactivar/:tela_id",desactivarTela)


export { router };