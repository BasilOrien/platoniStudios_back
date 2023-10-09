import { config } from "dotenv";
import app from "./src/app.js";
import sequelize from "./src/config/database.js";
import { setUpModels } from "./src/middlewares/setUpModels.js";

config()

async function initServer() {
    try {

        await sequelize.authenticate()
        await sequelize.sync()
        await setUpModels()

        app.listen(process.env.PORT || 3002, function () {
            console.log(`Server running on http://localhost${process.env.PORT || 3002}`)
        })

    } catch (error) {
        throw new Error(`Error al iniciar el servidor: ${error}`)
    }
}

initServer()

