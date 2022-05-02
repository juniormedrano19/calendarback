/* 

Event Routes

/api/events

*/
const { Router }=require('express');
const { validarJWT }= require('../middlewares/validar-jwt'); //todo tiene que estar validado con nuestro JWt
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router=Router();

// Todas tienes que pasar por la validación del JWT

router.use(validarJWT); //al hacer esto, todas las peticiones pasan por validarJWT; //protegidas por el web token

// Obtener eventos
router.get('/', getEventos);



//Crear un nuevo evento
router.post('/', [

check('title','El título es obligatorio').not().isEmpty(),
check('start','Fecha de inicio es obligatoria').custom(isDate),
check('end','Fecha de finalización es obligatoria').custom(isDate),
validarCampos,

] ,crearEvento); //endpoint


//Actualizar Evento

router.put('/:id',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
],  actualizarEvento);


//Borrar evento
router.delete('/:id',  eliminarEvento);

module.exports=router; //exportar el módulo