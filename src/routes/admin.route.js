import { Router } from "express"
import Members from "../models/members.model.js"
import { body } from "express-validator"
import { whitelistDni } from "../controllers/admin.controller.js"

const adminRoute = Router()

const whitelistDNIRules = [
    body("dni").isInt().withMessage("Se esperaba un valor numérico")
]

adminRoute.post("/whitelistDNI", whitelistDNIRules, whitelistDni)

//debug
adminRoute.get("/view_all_users", async function (req, res) {
    const users = await Members.findAll()
    return res.json(users)
})

export default adminRoute