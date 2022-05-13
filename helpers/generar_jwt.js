const jwt = require('jsonwebtoken');

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


module.exports ={
    generarJWT
}