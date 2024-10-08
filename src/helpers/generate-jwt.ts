import jwt from 'jsonwebtoken';


interface generateJWTProps {
    idusrmob: number;
}

const generateJWT = ({ idusrmob }: generateJWTProps) => {
    return new Promise((resolve, reject) => {
        const payload = { idusrmob }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: process.env.JWT_EXPIRATION
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })
}

export {
    generateJWT
}