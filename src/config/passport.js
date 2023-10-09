import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'

//my imports
import Members from "../models/members.model.js";
import { Op } from "sequelize";

export function configurePassport() {
    try {

        passport.use(new LocalStrategy(async function (username, password, done) {
            let user;

            if (!isNaN(parseInt(username))) {
                user = await Members.findOne({
                    where: {
                        dni: username
                    },

                })
            } else {
                user = await Members.findOne({
                    where: {
                        email: username
                    }
                })
            }

            if (!user) {
                return done(null, false, { message: "El usuario no existe." })
            }


            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    done(err)
                }

                if (!isMatch) {
                    return done(null, false, { message: "La contraseña es incorrecta" })
                }

                return done(null, { id: user.id })
            })

        }))

        passport.serializeUser(function (user, done) {
            return done(null, user)
        })

        passport.deserializeUser(function (user, done) {
            return done(null, user)
        })
    } catch (error) {
        throw new Error(error)
    }
}