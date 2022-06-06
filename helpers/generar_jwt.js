const jwt = require('jsonwebtoken');
const {User} = require('../models')

const generarJWT = (uid='')=>{

    return  new Promise((resolve, reject)=>{

        const payload = {uid};

        jwt.sign(payload, process.env.SECRETTORPRIVATEKEY,{expiresIn: process.env.VALIT_JWT},(err, token)=>{
                if(err){
                    console.log(err)
                    reject('No se pudo generar jwt');
                }else{
                    resolve(token);
                }
        })



    })



}

const comprobarJWT = async(token = '')=>{
        try {
            if(token.length < 10){
                return null;
            }
                
            const {uid} = jwt.verify(token, process.env.SECRETTORPRIVATEKEY)
            const user = await User.findById(uid)
            if(user){
                if(user.status){
                    return user;
                }else{
                    return null;
                }
            }else{
                return null;
            }

        } catch (error) {
                return null;
        }
}


module.exports ={
    generarJWT,
    comprobarJWT
}