import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Roles extends Model { }

Roles.init({
    userId: {
        type: DataTypes.UUID,
        allowNull: false,

    },
    role: {
        type: DataTypes.STRING,
        validate: {
            isIn: [["admin", "member", "owner"]]
        },
        defaultValue: "member"
    }
}, {
    sequelize: sequelize
})

export default Roles