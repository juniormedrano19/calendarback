const {response}=require('express'); //traerme el tipado
const {validationResult}=require('express-validator');

//next es un callback, se llama si el middleware se ejecuta correctamente, hace que pase al siguiente middleware.

const validarCampos=(req, res = response, next)=>{

    //manejo de errores
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.json({
            ok:false,
            errors:errors.mapped(),
        })
    }

    next();

}

module.exports={
    validarCampos,
}