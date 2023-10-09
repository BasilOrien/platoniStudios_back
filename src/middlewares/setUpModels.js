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

        Members.hasOne(Roles)
        Roles.belongsTo(Members)

        const membersForce = false
        const examsNGradesForce = false
        const competitionsForce = false
        const roleForce = false
        const dniForce = true

        await Members.sync({ force: membersForce })
        await ExamsAndGrades.sync({ force: examsNGradesForce })
        await Competitions.sync({ force: competitionsForce })
        await DniWhitelist.sync({ force: dniForce })
        await Roles.sync({ force: roleForce })

        console.log("Todas las tablas se sincronizaron correctamente")

    } catch (error) {
        throw new Error(`Error al sincronizar las tablas :${error}`)
    }
}