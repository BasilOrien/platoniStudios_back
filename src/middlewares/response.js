export default function (message, bool) {
    const responseObject = {}

    if (message) {
        responseObject.message = message
    }
    if (typeof bool === "boolean") {
        responseObject.bool = bool
    }

    if (!responseObject.message && typeof responseObject.bool !== "boolean") {
        throw new Error("Debes incluir el mensaje a mostrar, o el boolean")
    }

    return responseObject
}