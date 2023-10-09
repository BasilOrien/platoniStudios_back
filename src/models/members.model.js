import { DataTypes, Model, UUIDV4 } from "sequelize";
import bcrypt from 'bcrypt'

//my imports
import sequelize from "../config/database.js";

class Members extends Model { }

Members.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 6,
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    houseNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    countryCode: {
        type: DataTypes.STRING,
        defaultValue: "+54"
    }
}, {
    sequelize: sequelize,
  
})



Members.beforeSave(async function (user) {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
})

export default Members