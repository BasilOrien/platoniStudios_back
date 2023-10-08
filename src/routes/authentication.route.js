import { Router } from "express";
import { register } from "../controllers/register.controller.js";
import { body } from "express-validator";
import Roles from "../models/roles.model.js";
import login from "../controllers/login.controller.js";
import response from "../middlewares/response.js";

const authRoute = Router()
const registerRules = [
    body("email").isEmail().withMessage("Se esperaba un correo electrónico válido"),
    body("password").isString().custom((value, { req }) => {
        if (!req.body.password) {
            throw new Error("La contraseña es obligatoria.");
        }
        if (req.body.password.length < 6) {
            throw new Error("Tu contraseña debe tener al menos 6 caracteres.");
        }
        return true;
    }),
    body("firstName").isString().notEmpty().withMessage("El nombre no puede estar vacío."),
    body("lastName").isString().notEmpty().withMessage("El apellido no puede estar vacío.")
];

const loginRules = [
    body("username")
        .isString()
        .withMessage("Se esperaba una cadena de texto.")
        .isLength({ min: 1 })
        .withMessage("El campo no puede estar vacio"),
    body("password")
        .isString()
        .withMessage("Se esperaba una cadena de texto")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener como minimo 6 caracteres"),
]

authRoute.post("/register", registerRules, register)
authRoute.post("/login", loginRules, login)
authRoute.get("/is_auth", function (req, res) {
    return res.json(response(null, req.isAuthenticated()))
})

//debug
authRoute.get("/view_roles", async function (_, res) {
    const roles = await Roles.findAll()
    return res.json(roles)
})

export default authRoute 