import Roles from "../models/roles.model.js"
import response from "./response.js"

export async function isAdmin(req, res, next) {
    try {
        const user = await Roles.findOne({
            where: {
                userId: req?.user?.id
            }
        })

        if (!req?.user?.id) {
            return req.logout(function (err) {
                if (err) {
                    return res.json(response("Se produjo un error mientras se obtenian las credenciales, comunicate con soporte", false))
                }
                return res.status(404).json(response("Usuario inexistente, Inicia sesión o registrate", false))
            })
        }

        const role = user?.role


        if (role !== "owner" && role !== "admin") {
            return res.status(401).json(response("No tenes permiso para hacer esto.", false))
        } else {

            return next()
        }


    } catch (error) {
        throw new Error(`Error en isAdmin middleware: error`)
    }
}