import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class DniWhitelist extends Model { }

DniWhitelist.init({
    dni: {
        type: DataTypes.INTEGER,
    },
    registered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize: sequelize
})

export default DniWhitelist