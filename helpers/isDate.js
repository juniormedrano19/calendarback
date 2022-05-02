const moment = require('moment');


const isDate=(value)=>{

    /* console.log(value);
    console.log(req, location, path); */
    if(!value){
        return false;
    } //si no regresa nada no hace nada

    const fecha = moment(value);
    if(fecha.isValid()){
        return true;
    }else{
        return false;
    }

}

module.exports={
    isDate,
}