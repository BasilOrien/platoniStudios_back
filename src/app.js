//external imports
import express from 'express'
import session from 'express-session'

//my imports
import authRoute from './routes/authentication.route.js'
import adminRoute from './routes/admin.route.js'
import { isAdmin } from './middlewares/isAdmin.js'
import isLogin from './middlewares/isLogin.js'
import passport from 'passport'
import configureSession from './config/session.js'
import { configurePassport } from './config/passport.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(configureSession())

app.use(passport.initialize())
app.use(passport.session())

configurePassport()

app.use("/auth", authRoute)
app.use("/admin", isLogin, isAdmin, adminRoute)

export default app