import { param } from "express-validator";
import { query } from "../util/query";

export const _getmovimientos_mercaderia = async (tienda_id: number) => {
    try {
        let queryS: string;
        let params: Array<number> = []; // Inicializa el array de parámetros

        if (tienda_id) {
            queryS = `
                SELECT * FROM movimientomercaderia
                WHERE movimientomercaderia.tienda_idI = ? 
                OR movimientomercaderia.tienda_idF = ?
            `;
            params = [tienda_id, tienda_id]; 
        } else {
            queryS = `
                SELECT * FROM movimientomercaderia
            `;
        }

        console.log(queryS)

        const data = await query(queryS, params);
        return {
            items: data.data,
            success: true,
            status: 200,
          };
    } catch (error) {
        return {
            message: "ERROR AL OBTENER MOVIMIENTOS",
            success: false,
            status: 500,
          };
    }
}

export const _createmovimientos_mercaderia = async (movimiento: any) => {
    try {
        
        const Queryvalidar = "SELECT productoDetalle.productoDetalle_id from productoDetalle where producto_id=? AND tienda_id=?"
        const tiendaResult = (await query(Queryvalidar, [
            movimiento.producto_id,
            movimiento.tienda_idD,
        ])) as any;
        
        console.log(tiendaResult.data[0])

        if(tiendaResult.data.length > 0){
            console.log("SI HAY ") 
        }else{
            console.log("NO HAY WEY")
        }

        return {
            items: "HOLA",
            success: true,
            status: 200,
          };
    } catch (error) {
        return {
            message: "ERROR AL OBTENER MOVIMIENTOS",
            success: false,
            status: 500,
          };
    }
}

