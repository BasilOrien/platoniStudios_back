import { validationResult } from "express-validator"
import Members from "../models/members.model.js"
import { config } from "dotenv"
import response from "../middlewares/response.js"
import Roles from "../models/roles.model.js"
import DniWhitelist from "../models/whitelistedDNI.model.js"

config()

const { OWNER_DNI } = process.env

export async function register(req, res) {
    try {
        const { email, password, firstName, lastName, dni } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()?.map(function (error) {
                return {
                    message: error.msg,
                    path: error.path
                }
            }))
        }

        if (dni !== parseInt(OWNER_DNI)) {
            const isInWhitelist = await DniWhitelist.findOne({
                where: {
                    dni
                }
            })

            if (!isInWhitelist) {
                return res.status(404).json(response("No se encontro tu dni en la lista de permitidos, comunicate con el administrador de la plataforma.", false))
            }

            if (isInWhitelist.registered === true) {
                return res.status(409).json(response("Ya estas registrado, inicia sesión", false))
            }

            await isInWhitelist.update({
                registered: true
            })
        }

        const [member, isNew] = await Members.findOrCreate({
            where: { dni },
            defaults: { email, password, firstName, lastName, dni }
        })

        if (!isNew) {
            return res.status(409).json(response("Ya estás registrado, inicia sesión", false))
        }

        const newRole = await Roles.create({
            role: dni === parseInt(OWNER_DNI) ? "owner" : "member"
        })

        await newRole.setMember(member)

        if (newRole.role === "owner") {
            console.log("Owner registrado");
        }


        return res.json(response("Registro exitoso", false))

    } catch (error) {
        throw new Error(`Se produjo un error en el controlador register: ${error}`)
    }
}