const { request, response } = require("express");
const { validationResult } = require("express-validator");


const validarCapos=(req=request, res=response, next )=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('entro');
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}


module.exports={
    validarCapos
}