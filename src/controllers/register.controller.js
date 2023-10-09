import { validationResult } from "express-validator"
import Members from "../models/members.model.js"
import { config } from "dotenv"
import response from "../middlewares/response.js"
import Roles from "../models/roles.model.js"
import DniWhitelist from "../models/whitelistedDNI.model.js"

config()

const { ADMIN_EMAIL } = process.env

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

        if (email === process.env.ADMIN_EMAIL) {
            const [member, isNew] = await Members.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    email,
                    password,
                    firstName,
                    lastName
                }
            })

            if (!isNew) {
                return res.status(409).json(response("Ya estas registrado, inicia sesión", false))
            } else {
                const id = member?.id
                if (await Roles.count({
                    where: {
                        userId: id
                    }
                })) {
                    return res.statu(409).json(response("Error al generar privilegios, comunicate con soporte.", false))
                }
                const role = await Roles.create({
                    userId: id,
                    role: "owner"
                })

                if (!role) {
                    return res.status(500).json(response("Error al generar tu usuario, comunicate con soporte", false))
                }

                return res.json(response("Registro exitoso.", true))
            }
        }

        const isAllowed = await DniWhitelist.findOne({
            where: {
                dni
            }
        })

        if (!isAllowed) {
            return res.status(400).json(response("Tu Dni no esta en la lista de permitidos, comunicate con el administrador de la plataforma.", false))
        }

        if (isAllowed?.registered === true) {
            return res.status(409).json(response("El Dni ya se encuentra registrado, inicia sesión", false))
        }

        const newMember = await Members.create({
            email, password, firstName, lastName, dni
        })

        isAllowed.update({
            registered: true
        })

        if (!newMember) {
            return res.status(500).json(response("Se produjo un error al registrarte comunicate con el administrador de la plataforma.", false))
        }

        return res.status(200).json(response("Registro exitoso", true))

    } catch (error) {
        throw new Error(`Se produjo un error en el controlador register: ${error}`)
    }
}