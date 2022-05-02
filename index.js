/* console.log(`Hola Mundo`); */

const express=require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config(); //variables de entorno


/* console.log(process.env); */ //veo todas las variables de entorno

//Crear el servidor de express
const app=express();

//Base de datos
dbConnection();

//CORS
app.use(cors()); //Habilitar CORS

//Directorio público
app.use(express.static('public')); //path
//use es un middleware, es una función que se ejecuta cada vez que pasa por un lugar


//Rutas
//request y response
/* app.get('/', (req, res)=>{ */

 /*    console.log('Se requiere /'); */
    /* Respuesta es un json*/
    /* res.json({
        ok:true
    }) */

/* }); */


/* Lectura y parse del body */

app.use(express.json()); //las peticiones que vengan en formato json los almaceno y extraigo su contenido


//RUTAS 
app.use('/api/auth', require('./routes/auth')); //todo lo que exporta de esta ruta, lo muestra en /api/auth
app.use('/api/events', require('./routes/events'));
//TODO: Auth// crear login, renew
//TODO: CRUD: Event


//Escuchar peticiones
//primer parámetro es puerto,
//segundo parámetro es un callback
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})