const {response}=require('express');
const Evento= require('../models/Evento');
/* {
    ok:true,
    msg: 'getEventos',
} */

/* {
    ok:true,
    msg: 'crearEvento',
} */

/* {/128318237
    ok:true,
    msg:'actualizarEvento,
} */

/* {/128318237
    ok:true,
    msg:'eliminarEvento,
} */


const getEventos=async(req, res=response)=>{

 const eventos= await Evento.find() //traer todos los eventos
                            .populate('user', 'name ')  //rellenar los datos del usuario
                                /* ('name password') */
    
    res.json({
        ok:true,
  eventos,
    })

}


const crearEvento=async(req, res=response)=>{
    //verificar que tenga el evento.
    /* console.log(req.body); */
    const evento= new Evento(req.body);

    /* Se necesita el id del usuario */

    try {

        evento.user=req.uid; //es importante mandar el id

      const eventoGuardado=await  evento.save();
      res.json({
          ok:true,
          evento:eventoGuardado,
      })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        })
    }
    
    /* res.json({
        ok:true,
    msg: 'crearEvento',
    }) */

}


const actualizarEvento=async(req, res=response)=>{

    const eventoId= req.params.id; //paramétro id
    const uid=req.uid;

    try {

        const evento=await Evento.findById( eventoId); //si el elemento existe 
console.log(evento.user);
        if(!evento){
           return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id',
            })
        }
        /* Si es la misma persona que creó y que actualice */
        if(evento.user.toString() !== uid){
            return res.status(401).status({
                ok:false,
                msg:'No tiene privilegio de editar este evento',
            });
        }

        const nuevoEvento={
            ...req.body, /* desestructurar */
            user:uid
        }

        /* necesita como paramétros el id y el nuevo evento */
        const eventoActualizado=await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});
        res.json({
            ok:true,
            evento:eventoActualizado,
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        });
    }
    
/*     res.json({
        ok:true,
    eventoId,
    })
 */
}

const eliminarEvento=async(req, res=response)=>{
    const eventoId= req.params.id; //paramétro id
    const uid=req.uid;

    try {

        const evento=await Evento.findById( eventoId); //si el elemento existe 
console.log(evento.user);
        if(!evento){
          return  res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id',
            })
        }
        /* Si es la misma persona que creó y que actualice */
        if(evento.user.toString() !== uid){
            return res.status(401).status({
                ok:false,
                msg:'No tiene privilegio para eliminar este evento',
            });
        }

      

        /* necesita como paramétros el id y el nuevo evento */
       await Evento.findByIdAndDelete(eventoId);
        res.json({
            ok:true,
          
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        });
    }
    
/*     res.json({
        ok:true,
    eventoId,
    })
 */
    
    /* res.json({
        ok:true,
    msg: 'eliminarEvento',
    }) */

}

module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
 
