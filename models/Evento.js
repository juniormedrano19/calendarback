const {Schema, model}= require('mongoose');

/* Esquema y modelo */

const EventoSchema=Schema({

title:{
    type: String,
    required:true,
},
notes:{
    type:String,
},
start:{
    type: Date,
    required: true,
},
end:{
    type:Date,
    required: true,
},
user:{
    /* Referencia al otro schema */
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
}



});


//Serializar o sobreescribir __id o _v
//convertir el _id a "id"
EventoSchema.method('toJSON', function(){
  const { __v, _id, ...object} =   this.toObject(); //referencia a todo el objeto que se está serializando
  object.id=_id;
  return object;

})



module.exports=model('Evento', EventoSchema);