import { validationResult } from "express-validator"
import response from "../middlewares/response.js"
import passport from "passport"

export default function login(req, res, next) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map(function (err) {
                return {
                    message: err.msg,
                    path: err.path
                }
            }))
        }

        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.status(400).json(response(info.message, false))
            }

            req.login(user, function (err) {
                if (err) {
                    console.error(err)
                    return res.status(500).json(response("Error al iniciar sesión", true))
                }

                return res.json(response("Iniciaste sesión", true))
            })

        })(req, res, next)
    } catch (error) {
        throw new Error(error)
    }
}