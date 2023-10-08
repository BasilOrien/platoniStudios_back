import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class ExamsAndGrades extends Model { }

ExamsAndGrades.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    examDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    result: {
        type: DataTypes.STRING,
        validate: {
            isIn: ["Aprobado", "Reprobado"]
        }
    },
    previousGrade: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1,
            max: 19
        }
    },
    obtainedGrade: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 2,
            max: 19
        }
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Observations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    martialAttitude: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1,
            max: 5
        }
    },
    breaking: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 1,
            max: 5
        },
    },
    theory: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1,
            max: 5
        }
    },
    sparring: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1,
            max: 5
        }
    },
    techniques: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1,
            max: 5
        }
    }
}, {
    sequelize: sequelize
})

export default ExamsAndGrades