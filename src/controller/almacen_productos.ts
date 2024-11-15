import { Request, Response } from "express";
import { handleHttp } from "../util/error.handler";
import { _createAlmacen_Productos } from "../service/almacen_productos";


export const createAlmacen_Productos = async(req:Request,res:Response)=>{
    const {nombre_almacen,direccion} = req.body;
    
    const AlmacenProductos:any = {
        nombre_almacen,
        direccion
    }

    try {
        const response = await _createAlmacen_Productos(AlmacenProductos);
        res.status(response.status).json(response)
    } catch (error) {
        handleHttp(res,"error")
    }

}


//get lavanderia cortes por producto