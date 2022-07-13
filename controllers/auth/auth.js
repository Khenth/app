const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../../helpers/generar_jwt");
const {googleVerify} = require('../../helpers/google_verify')
var mongoose = require('mongoose');
const User = require('../../models/users/user');



const login = async (req, res = response)=>{

    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const{ account, password} = req.body;
    let user;

    try {
        if (emailRegex.test(account)) {
           user = await User.findOne({email : account}) 
        } else {
            user = await User.findOne({nickname: account})
        }
        // verificar cuenta de usuario
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

        // generar Menu de navegacion Frontend
        const navigatemenu = await User.aggregate(
            [
             {
               $match: {_id :mongoose.Types.ObjectId(user.id) }
             },
                {$project:{
               _id: 0,
               idusergroup : 1
             }},
               { 
               $graphLookup:{ 
                 from:'menuoptions',
                 startWith:  '$idusergroup',
                 connectFromField: 'idusergroup',
                 connectToField: 'idusergroup',
                 restrictSearchWithMatch :{ 'status': true},
                 as: 'menuoptios',
               }
             },
             {$unwind : '$menuoptios'},
             {$project: {
                     idsubmenuoptions: '$menuoptios.idsubmenuoption'          
               }},
               
               {$lookup:{
               from: 'submenuoptions',
               localField: 'idsubmenuoptions',
               foreignField: '_id',
               as: 'submenuoptions'
           }},
           {$unwind : '$submenuoptions'},
           // {$project: {
           //   idsubmenu: '$submenuoptions.idsubmenu'          
           // }},
           {$lookup:{
             from: 'submenus',
             localField: 'submenuoptions.idsubmenu',
             foreignField: '_id',
             as: 'submenuoptions.idsubmenu'
           }},
           {$unwind : '$submenuoptions.idsubmenu'},
           {$lookup:{
             from: 'mainmenus',
             localField: 'submenuoptions.idsubmenu.idmainmenu',
             foreignField: '_id',
             as: 'submenuoptions.idsubmenu.idmainmenu'
           }},
           {$unwind : '$submenuoptions.idsubmenu.idmainmenu'},
           
           {$project: {
                     idmainmenu : '$submenuoptions.idsubmenu.idmainmenu._id',
                     mainmenu : '$submenuoptions.idsubmenu.idmainmenu.mainmenu',
                     ruta : '$submenuoptions.idsubmenu.idmainmenu.ruta',
                     icon : '$submenuoptions.idsubmenu.idmainmenu.icon',
                       idmenu: '$submenuoptions.idsubmenu._id',
                       menu: '$submenuoptions.idsubmenu.submenu',
                       submenu :  { 
                         idsubmenu: '$submenuoptions.idsubmenuoptions',
                         title: '$submenuoptions.title',
                         ruta: '$submenuoptions.ruta',
                         icon: '$submenuoptions.icon',
                       }        
           }},
           {$group:{_id: {idmainmenu: '$idmainmenu', mainmenu: '$mainmenu',ruta: '$ruta', icon:'$icon', idmenu:'$idmenu', menu:'$menu' },
                     submenu: {$push : {submenu: '$submenu'}}    
           }},
           {
             $project:{
               _id: 0,
               mainmenu : {
                 idmainmenu : '$_id.idmainmenu',
                 title : '$_id.mainmenu',
                 ruta : '$_id.ruta',
                 icon : '$_id.icon',
                 menu : {
                        idmenu: '$_id.idmenu',
                        title: '$_id.menu',
                        sumenus:'$submenu'
                 }
               }}
             },
             {
               $group:{_id: {idmainmenu: '$mainmenu.idmainmenu',title: '$mainmenu.title',ruta: '$mainmenu.ruta',icon: '$mainmenu.icon'},
                 menu:{$push:'$mainmenu.menu'}
             }
             },
             {$project:{
               _id:0,
               mainmenu : '$_id',
               menu : '$menu'
             }},
            ]
          )

          const farmSrc = await User.aggregate([
            {
              $match: {_id :mongoose.Types.ObjectId(user.id) }
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
                farms ={
                    "idfarms": [
                        {
                            "_id": "ox000000",
                            "nombre": "Sin Finca Asignada"
                        }
                    ]
                }
             }else{
                 farms = farmSrc[0]
             }
               
        

        res.json({
           user,
           navigatemenu,
           farms,
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
            console.log(nombre, img, correo)
            //console.log(googleUser);
            let user = await User.findOne({email : correo});
            if (!user){
                //crearlo
               const data = {
                   nombre,
                   "email" : correo,
                   password: ':p',
                //    idusergroup: '',
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

        const token = await generarJWT(user.id);
        
             // generar Menu de navegacion Frontend
             const navigatemenu = await User.aggregate(
                [
                 {
                   $match: {_id :mongoose.Types.ObjectId(user.id) }
                 },
                    {$project:{
                   _id: 0,
                   idusergroup : 1
                 }},
                   { 
                   $graphLookup:{ 
                     from:'menuoptions',
                     startWith:  '$idusergroup',
                     connectFromField: 'idusergroup',
                     connectToField: 'idusergroup',
                     restrictSearchWithMatch :{ 'status': true},
                     as: 'menuoptios',
                   }
                 },
                 {$unwind : '$menuoptios'},
                 {$project: {
                         idsubmenuoptions: '$menuoptios.idsubmenuoption'          
                   }},
                   
                   {$lookup:{
                   from: 'submenuoptions',
                   localField: 'idsubmenuoptions',
                   foreignField: '_id',
                   as: 'submenuoptions'
               }},
               {$unwind : '$submenuoptions'},
               // {$project: {
               //   idsubmenu: '$submenuoptions.idsubmenu'          
               // }},
               {$lookup:{
                 from: 'submenus',
                 localField: 'submenuoptions.idsubmenu',
                 foreignField: '_id',
                 as: 'submenuoptions.idsubmenu'
               }},
               {$unwind : '$submenuoptions.idsubmenu'},
               {$lookup:{
                 from: 'mainmenus',
                 localField: 'submenuoptions.idsubmenu.idmainmenu',
                 foreignField: '_id',
                 as: 'submenuoptions.idsubmenu.idmainmenu'
               }},
               {$unwind : '$submenuoptions.idsubmenu.idmainmenu'},
               
               {$project: {
                         idmainmenu : '$submenuoptions.idsubmenu.idmainmenu._id',
                         mainmenu : '$submenuoptions.idsubmenu.idmainmenu.mainmenu',
                         ruta : '$submenuoptions.idsubmenu.idmainmenu.ruta',
                         icon : '$submenuoptions.idsubmenu.idmainmenu.icon',
                           idmenu: '$submenuoptions.idsubmenu._id',
                           menu: '$submenuoptions.idsubmenu.submenu',
                           submenu :  { 
                             idsubmenu: '$submenuoptions.idsubmenuoptions',
                             title: '$submenuoptions.title',
                             ruta: '$submenuoptions.ruta',
                             icon: '$submenuoptions.icon',
                           }        
               }},
               {$group:{_id: {idmainmenu: '$idmainmenu', mainmenu: '$mainmenu',ruta: '$ruta', icon:'$icon', idmenu:'$idmenu', menu:'$menu' },
                         submenu: {$push : {submenu: '$submenu'}}    
               }},
               {
                 $project:{
                   _id: 0,
                   mainmenu : {
                     idmainmenu : '$_id.idmainmenu',
                     title : '$_id.mainmenu',
                     ruta : '$_id.ruta',
                     icon : '$_id.icon',
                     menu : {
                            idmenu: '$_id.idmenu',
                            title: '$_id.menu',
                            sumenus:'$submenu'
                     }
                   }}
                 },
                 {
                   $group:{_id: {idmainmenu: '$mainmenu.idmainmenu',title: '$mainmenu.title',ruta: '$mainmenu.ruta',icon: '$mainmenu.icon'},
                     menu:{$push:'$mainmenu.menu'}
                 }
                 },
                 {$project:{
                   _id:0,
                   mainmenu : '$_id',
                   menu : '$menu'
                 }}
                ]
              );

              const farmSrc = await User.aggregate([
                {
                  $match: {_id :mongoose.Types.ObjectId(user.id) }
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
                    farms ={
                        "idfarms": [
                            {
                                "_id": "ox000000",
                                "nombre": "Sin Finca Asignada"
                            }
                        ]
                    }
                 }else{
                     farms = farmSrc[0]
                 }
                   
            


        res.json(
            {
                user,
                navigatemenu,
                farms,
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

const routesNavigate = async (req = request, res = response) => {
  const querySt = {status : true}
  const userAuth = req.user._id
 const idsubmenuparam = mongoose.Types.ObjectId(req.params.id)
 const routesNavigate = await User.aggregate(
    [
     
       {
          $match: {_id : userAuth}
        },
           {$project:{
          _id: 0,
          idusergroup : 1
        }},
          { 
          $graphLookup:{ 
            from:'menuoptions',
            startWith:  '$idusergroup',
            connectFromField: 'idusergroup',
            connectToField: 'idusergroup',
            restrictSearchWithMatch :{ 'status': true},
            as: 'menuoptios',
          }
        },
        {$unwind : '$menuoptios'},
        {$project: {
                idsubmenuoptions: '$menuoptios.idsubmenuoption',          
                status: '$menuoptios.status'          
          }},
          
          {$lookup:{
          from: 'submenuoptions',
          localField: 'idsubmenuoptions',
          foreignField: '_id',
          as: 'submenuoptions'
      }},
      {$unwind : '$submenuoptions'},
      {$project: {
        // submenuoptions: '$submenuoptions'
        idsubmenu: '$submenuoptions.idsubmenu',
        title: '$submenuoptions.title',
        ruta: '$submenuoptions.ruta',
        icon: '$submenuoptions.icon',
        status: '$status'

      }},
      {$project: {
        ruta: 1,
        status: 1
      }},
      {$sort:{title: 1}},
      

    ]
  )
res.json(
    {
      routesNavigate,
    }   
)
}


module.exports = {
    login,
    googleSingIn,
    renovarToken,
    routesNavigate,
    farmLogin
}


