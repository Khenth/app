const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validarJWT = async (req = request, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(400).json(
            {msg: 'No hay token'}
        )
    }

    try {

       const {uid} = jwt.verify(token, process.env.SECRETTORPRIVATEKEY);

       const user = await User.findById(uid);

       if(!user){
        return res.status(401).json({
            msg: 'usuario no existe'
        })}

       //si el usuario no esta activo

       if (!user.status){
          return res.status(401).json({
              msg: 'token no valido - usuario in-activo'
          })
       }

       req.user = user;

        next();
    
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
        
    }


}


module.exports = {
    validarJWT
}