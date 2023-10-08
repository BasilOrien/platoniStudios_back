import response from "./response.js"

export default function isLogin(req, res, next ) {
    const bool = req.isAuthenticated()

    if (bool) {
        return next()
    }

    return res.status(401).json(response("Inicia sesión para continuar", false))
}

