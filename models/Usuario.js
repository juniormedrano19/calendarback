const {Schema, model}= require('mongoose');

/* Esquema y modelo */

const UsuarioSchema=Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    }




});

module.exports=model('Usuario', UsuarioSchema);