import jwt from "jsonwebtoken"

// If he wants to like:
// Click the button => auth middleware (NEXT) => call the "like" controller

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorisation.split(" ")[1]
        const isCustomAuth = token.length < 500 

        let decodedData 

        if (token && isCustomAuth) {                    // Si usamos jwt
            decodedData = jwt.verify(token, "testt")
            req.userId = decodedData?.id
        } else {                                        // Si usamos google auth
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub  // Sub es para el id de usuario de Google
        }

        next()   // Para pasar usuario (otorga permiso tras verificar)

    } catch (error) {
        console.log(error)
    }
}

export default auth