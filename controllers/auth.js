const {response}=require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario=async (req, res=response)=>{
       const {name, email, password}=req.body;

    try {

        let usuario= await Usuario.findOne({
            email
        });
        console.log(usuario);//si devuelve null es porque no existe, si devuelve un objeto si existe en la bd

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo',
            });
        }
    
        /* require */
   /*  console.log(req.body); */


  usuario= new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();//valor de vueltas por defectos 10
        usuario.password = bcrypt.hashSync(password, salt); //encriptar




  await usuario.save(); //graba en la bd

  //Generar JWT
  const token= await generarJWT(usuario.id, usuario.name);

   
       res.status(201).json({
           ok:true,
           /* msg:'registro', */
           uid: usuario.id,
           name:usuario.name,
           token
          
       })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el Administrador'
        })
        
    }


   
   }


const loginUsuario= async(req, res=response)=>{
    const { email, password}=req.body;

    try {
        const usuario= await Usuario.findOne({
            email
        });
        console.log(usuario);//si devuelve null es porque no existe, si devuelve un objeto si existe en la bd

        //si el usuario no existe
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email',
            });
        }

        //Confirmar los passwords

        const validPassword= bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            //si no es válido mando un status 400 bad request
            return res.status(400).json({
                ok:false,
                msg:'Password Incorrecto'
            });

        }

        //Generar nuestro JWT
        //Generar JWT
  const token= await generarJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador',
        })
        
    }

  

 

}

const revalidarToken= async(req, res=response)=>{

    const {uid, name}=req

//generar un nuevo JWT y retornarlo en esa petición
const token= await generarJWT(uid, name);
    
    res.json({
        ok:true,
       /*  msg:'renew', */ /* renew del token  */
       uid,
       name,
       token,
    })

}


   module.exports={
       crearUsuario,
       loginUsuario,
       revalidarToken

   }