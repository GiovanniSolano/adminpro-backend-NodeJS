const jwt = require('jsonwebtoken');
const { request } = require('express');

const validarJWT = (req, res, next) => {

    //leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe un token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });

    }


}

module.exports = {
    validarJWT
}