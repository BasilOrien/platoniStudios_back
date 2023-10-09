import { validationResult } from "express-validator";
import response from "../middlewares/response.js";
import DniWhitelist from "../models/whitelistedDNI.model.js";
import Members from "../models/members.model.js";
import Roles from "../models/roles.model.js";

export async function whitelistDni(req, res) {
    try {
        const { dni } = req.body
        if (typeof dni !== "number") {
            return res.status(400).json(response("Se esperaba un valor numérico"))
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()?.map(function (e) {
                return {
                    message: e.msg,
                    path: e.path
                }
            }))
        }

        const [row, isNew] = await DniWhitelist.findOrCreate({
            where: {
                dni
            },
            defaults: {
                dni,
            }
        })

        if (!isNew) {
            return res.status(409).json(response("El dni ingresado ya esta en la lista de permitidos.", false))
        }

        return res.json(response("Dni añadido con éxito", true))
    } catch (error) {
        throw new Error(error)
    }
}

export async function viewAllMembers(req, res) {
    try {
        const members = await Members.findAll({
            attributes: [
                "id",
                "dni",
                "email",
                "firstName",
                "lastName",
                "startDate",
                "address",
                "houseNumber",
                "city",
                "cel",
                "countryCode"
            ]
        })

        const roles = await Roles.findAll({
            attributes: ["userId", "role"]
        })

        const parsedData = []




        if (!members) {
            return res.status(500).json(response("Error al obtener la lista de miembros. Comunicate con soporte", false))
        }

        if (!roles) {
            return res.status(500).json(response("Error al obtener la lista de miembros. Comunicate con soporte", false))
        }

        members.forEach(member => {
            const memberData = member?.dataValues
            const role = roles?.find(r => r.id === memberData.userId)
            parsedData.push({ ...memberData, role: role?.role })
        })


        return res.status(200).json(parsedData)

    } catch (error) {
        throw new Error(`Error en el controlador viewAllMembers (admin) ${error}`)
    }
}

export async function viewDNIWhitelist(req, res) {
    try {
        const dnis = await DniWhitelist.findAll()
        if (!dnis) {
            return res.status(500).json(response("No se pudo obtener la lista de Dni, comunicate con soporte."))
        }
        return res.json(dnis)
    } catch (error) {
        throw new Error(error)
    }
}