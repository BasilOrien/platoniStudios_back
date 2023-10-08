import DniWhitelist from "../models/whitelistedDNI.model.js";

export async function whitelistDni(req,res) {
    try {
        return res.json("whitelisted")
    } catch (error) {
        throw new Error(error)
    }
}