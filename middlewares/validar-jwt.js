const {response}=require('express');
const jwt=require('jsonwebtoken');

const validarJWT=(req, res=response, next)=>{

//x-token headers;

const token=req.header('x-token');
console.log(token);

//si el token no viene
if(!token){
    return res.status(401).json({
        ok:false,
        msg:'No hay token en la petición',

    })
}

try {

    const {uid, name}=jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    )

    req.uid=uid;
    req.name=name;

    /* console.log(payload); */

    
} catch (error) {
    return res.status(401).json({
        ok:false,
        msg:'Token no válido'
    });
    
}


next();
//si todo está correcto que llame a lo q sigue








}

module.exports={
    validarJWT
}