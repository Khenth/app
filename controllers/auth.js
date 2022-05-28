const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar_jwt");
const user = require("../models/user");
const {googleVerify} = require('../helpers/google_verify')
const User = require('../models/user');



const login = async (req, res = response)=>{

    const{ correo, password} = req.body;

    try {

        // verificar correo
            
       const user = await User.findOne({correo})
    
        if(!user){
            return res.status(400).json({
                msg: "usuario / password no son correctos"
            })
        }


        // verificar estado de usuario

        if(!user.status){
            return res.status(400).json({
                msg: "usuario no existe"
            })
        }


        // verificar password

        const validPass = bcryptjs.compareSync(password, user.password);
        // console.log(validPass)
        if(!validPass){
            return res.status(400).json({
                msg: "Password incorrecto"
            })
        }

        // generar JWT
        
        const token = await generarJWT(user.id)

        res.json({
           user,
           token,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Comunicarlo al administrador'
        })
    }

    

}

    const googleSingIn = async(req, res = response)=>{

        const {id_token} = req.body;

        try {
            const {nombre, img, correo} = await googleVerify(id_token); 
            
            //console.log(googleUser);
            let user = await User.findOne({correo});
            if (!user){
                //crearlo
               const data = {
                   nombre,
                   correo,
                   password: ':p',
                   img,
                   rol: "USER_ROLE",
                   google: true
                   
               }
               user = new User(data)
               await user.save()
            }

            //si usuario esta desactivado en db

            if(!user.status){
                return res.status(401).json({
                    msg : 'Usuario denegado'
                })
            }

             // generar JWT
            const token = await generarJWT(user.id)

            res.json({
               user,
               token
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({
                msg: 'El token no se pudo verificar'
            })
            
        }


    }

const renovarToken=async (req, res = response)=>{
        const {user} = req;

        const token = await generarJWT(user.id)

        res.json(
            {
                user,
                token
            }
        )}

const farmLogin =async(req = request, res = response)=>{
    const userAuth = req.user._id
    const farmSrc = await User.aggregate([
        {
        $match: {_id : userAuth}
        },
           {$lookup:{
                from: 'farms',
                localField: 'idfarms.idfarm',
                foreignField: '_id',
                as: 'idfarms'
            }},
            {$project: {
                    'idfarms' : true,
                    '_id':0,
                     // 'idfarms.status':0,
                    // 'idfarms.__v':0,
                    // 'idfarms.user':0,
                    }}, 
            {$project: {
                    'idfarms.status':0,
                    'idfarms.__v':0,
                    'idfarms.user':0,
                    }}, 
                    {
                    $match: {"idfarms.0" :{"$exists": true }}
                    },           
            
         ])
        //  if(!farmSrc.length){console.log("El array está vacío!")}

         if(farmSrc.length == 0){
            idfarms ={
                "idfarms": [
                    {
                        "_id": "ox000000",
                        "nombre": "Sin Finca Asignada"
                    }
                ]
            }
         }else{
             idfarms = farmSrc[0]
         }
            res.json(
                idfarms
            )
    

}


module.exports = {
    login,
    googleSingIn,
    renovarToken,
    farmLogin
}


