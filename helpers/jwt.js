const jwt = require('jsonwebtoken');

//parámetros será payload del JWT
const generarJWT=(uid, name)=>{

    return new Promise((resolve, reject)=>{

        const payload={uid,name};
        //el segundo parámetro es una llave para firmar los JWT
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'2h' //expira en dos horas
        },(err, token)=>{ //el último parámetro es un callback
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);

        })




    })

}

module.exports={
    generarJWT,
}