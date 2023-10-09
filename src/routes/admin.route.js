import { Router } from "express"
import Members from "../models/members.model.js"
import { body } from "express-validator"
import { viewAllMembers, viewDNIWhitelist, whitelistDni } from "../controllers/admin.controller.js"

const adminRoute = Router()

const whitelistDNIRules = [
    body("dni").isInt().withMessage("Se esperaba un valor numérico")
]

adminRoute.post("/whitelistDNI", whitelistDNIRules, whitelistDni)
adminRoute.get("/viewAllMembers", viewAllMembers)
adminRoute.get("/view_dni_whitelist", viewDNIWhitelist)

export default adminRoute