/* Rutas de usuarios /Auth

host + /api/auth

*/

/* get, post, put, delete */
const {Router}= require('express');
const  { check } = require('express-validator');
//check valida un campo en particular
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const {validarJWT}= require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');

const router=Router();

/* crear nuevo usuario es post */
/* el segundo parámetro se fue a controllers */
router.post('/new', [
    //colección de middlewares
    //el primero es campo a validar, segundo mensaje
    check('name', 'El nombre es obligatorio').not().isEmpty(), //no vacío
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos

],crearUsuario );


router.post('/',[
    //colección de middlewares
    //el primero es campo a validar, segundo mensaje

    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos

], loginUsuario);


   router.get('/renew',validarJWT,revalidarToken); //si es uno entra como string


module.exports=router; //exportar el módulo