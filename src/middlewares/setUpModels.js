import Competitions from "../models/competitions.model.js";
import ExamsAndGrades from "../models/examsNGrades.model.js";
import Members from "../models/members.model.js";
import Roles from "../models/roles.model.js";
import DniWhitelist from "../models/whitelistedDNI.model.js";

export async function setUpModels() {
    try {
        Members.hasMany(Competitions)
        Competitions.belongsTo(Members)

        Members.hasMany(ExamsAndGrades)
        ExamsAndGrades.belongsTo(Members)

        const membersForce = true
        const examsNGradesForce = true
        const competitionsForce = true
        const roleForce = true
        const dniForce = true

        await Roles.sync({ force: roleForce })
        await Members.sync({ force: membersForce })
        await ExamsAndGrades.sync({ force: examsNGradesForce })
        await Competitions.sync({ force: competitionsForce })
        await DniWhitelist.sync({ force: dniForce })
        
        console.log("Todas las tablas se sincronizaron correctamente")
    } catch (error) {
        throw new Error(`Error al sincronizar las tablas :${error}`)
    }
}