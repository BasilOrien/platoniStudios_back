import { Router } from "express"
import Members from "../models/members.model.js"

const adminRoute = Router()


//debug
adminRoute.get("/view_all_users", async function (req, res) {
    const users = await Members.findAll()
    return res.json(users)
})

export default adminRoute