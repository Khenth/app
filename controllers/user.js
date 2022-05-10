
const {response, request} = require('express');
const becryptjs = require('bcryptjs');

const User = require('../models/user');




 
const getUser = async (req = request, res = response) => {
    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true}
    //cambiamos esto por promise para ejecutarlas simultaneamente
    // const users = await User.find(querySt)
    // .skip(Number(init))
    // .limit(Number(limit));
    // const totalUser = await User.countDocuments(querySt);

    const [users, totalUser] = await Promise.all([
        User.find()
        .skip(Number(init))
        .limit(Number(limit)),
        User.countDocuments(querySt)
    ])
    
    
    res.json(
        {
        totalUser,
         users,
        }
    )
  }

const putUser = async (req, res = response) => {
    
   const {id} = req.params;
    const {_id,  password, google, rol,...rest} = req.body;
        // validar con db
    if(password){
         //encripta password 
    const salt = becryptjs.genSaltSync();
    rest.password = becryptjs.hashSync(password, salt);

    }

    const userupdate =await User.findByIdAndUpdate(id, rest,{new: true})


    res.json(userupdate)
  }

const postUser = async (req, res = response) => {
  
    const {nombre, correo, password, rol, idusergroup} = req.body;
    const user = new User({nombre, correo, password, idusergroup});

    // verificar si existe correo
   
    
    //encripta password 
    const salt = becryptjs.genSaltSync();
    user.password = becryptjs.hashSync(password, salt);


    //guardar base de datos
    await user.save();
    res.status(201).json(
        
                      user
        
    )
  }

const deleteUser = async(req, res = response) => {
    const {id} = req.params;
    const {status,...data} = req.body
    //borrar fisicamente
    // const user = await User.findByIdAndDelete(id);
    if (status == null){
    const user = await User.findByIdAndUpdate(id,{status: false},{new: true} );
    res.status(200).json(user);
    }else{
      const user = await User.findByIdAndUpdate(id,{status: status}, {new: true});
    res.status(200).json(user);
    }
    // const userAuth = req.user;

  }

const patchUser = (req, res = response) => {
    res.json(
        {
            "msg" : "patch api - controller" 
        }
    )
  }

  const getUserId = async(req = request, res = response) => {

    const { id } = req.params;

    const usuario = await User.findById( id );

    res.json(usuario);
}

  module.exports = {
        getUser,
        putUser,
        postUser,
        deleteUser,
        patchUser,
        getUserId
  }