import { config } from "dotenv";
import { Sequelize } from "sequelize";

config()

const { DATABASE_URL } = process.env

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false
})

export default sequelize