const { response, request } = require("express");



const isAdminRol =(req= request, res = response, next )=>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere validar rol sin autentica token'
        })}
    
    const {rol, nombre} = req.user;
        
        if(rol !== 'ADMIN_ROLE'){
            return res.status(401).json({
                msg: `${nombre} no es administrador`
            });
        }


    next();
}

    const tienRol = (...roles)=>{

    return (req, res = response, next)=>{

        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere validar rol sin autentica token'
            });}

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg:`El servicio requiere un rol ${roles}`
            });
        }

            next();
    }

    }


module.exports = {
    isAdminRol,
    tienRol
}