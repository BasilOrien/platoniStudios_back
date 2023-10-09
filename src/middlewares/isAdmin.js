import Roles from "../models/roles.model.js"
import response from "./response.js"

export async function isAdmin(req, res, next) {
    try {
        const currentUserRole = await Roles.findOne({
            where: {
                MemberId: req?.user?.id
            }
        })

        if (!currentUserRole) {
            return res.status(500).json(response("Se produjo un error, comunicate con soporte", false))
        }


        if (currentUserRole.role !== "owner" && currentUserRole.role !== "admin") {
            return res.status(401).json(response("No tenes permiso para hacer esto.", false))
        }

        return next()

    } catch (error) {
        throw new Error(`Error en isAdmin middleware: ${error}`)
    }
}