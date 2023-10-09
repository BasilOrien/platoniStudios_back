import { Router } from "express"
import Members from "../models/members.model.js"
import { body } from "express-validator"
import { changeRole, viewAllMembers, viewDNIWhitelist, whitelistDni } from "../controllers/admin.controller.js"

const adminRoute = Router()

const whitelistDNIRules = [
    body("dni").isInt().withMessage("Se esperaba un valor numérico")
]

const changeroleRules = [
    body("UserId").isUUID().withMessage("Se esperaba un id de usuario valido"),
    body("newRole").isIn(["owner", "admin", "member"]).withMessage("El rol ingresado no es un rol válido")
]

adminRoute.post("/whitelistDNI", whitelistDNIRules, whitelistDni)
adminRoute.get("/viewAllMembers", viewAllMembers)
adminRoute.get("/view_dni_whitelist", viewDNIWhitelist)
adminRoute.post("/change_role", changeroleRules, changeRole)

export default adminRoute