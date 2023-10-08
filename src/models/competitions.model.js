import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Competitions extends Model { }

Competitions.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    competitionDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    competitionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    competitionType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: ["Combate", "Tules", "Tules por equipo", "Lucha prestablecida", "Otros"]
        }
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: ["1° Puesto", "2° Puesto", "3° puesto", "Otro"]
        }
    },
}, {
    sequelize: sequelize
})

export default Competitions