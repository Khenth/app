
const {response, request} = require('express');


const UserMenuAuth = require('../models/usersMenu');
const User = require('../models/user');




 
const getUserMenuAuth = async (req = request, res = response) => {
      const querySt = {status : true}
      const userAuth = req.user._id
      const UserMenuAuths = await User.aggregate(
          // [
          //   {
          //     $match: {_id : userAuth}
          //   },
          //   {$project:{
          //     _id: 0,
          //     usergroup : 1
          //   }},
          //   // { 
          //   //   $graphLookup:{ 
          //   //     from:'usermenus',
          //   //     startWith:  '$usergroup',
          //   //     connectFromField: 'usergroup',
          //   //     connectToField: 'idgrupouser',
          //   //     restrictSearchWithMatch :{ 'menus.submenu.status': true},
          //   //     as: 'menuauth',
          //   //   }
          //   // },

          //   {$lookup:{
          //       from: 'usermenus',
          //       localField: 'usergroup',
          //       foreignField: 'idgrupouser',
          //       as: 'menuauth'
          //   }},
          //   {$project: {
          //     usergroup : 0,
          //     'menuauth._id':0,
          //     'menuauth.idgrupouser':0,
          //     'menuauth.status':0,
          //     'menuauth.__v':0,
          //     'menuauth.menus._id':0,
          //     'menuauth.menus.submenu._id':0,
          //     }},
          //   {$unwind : '$menuauth'},
          //   // {$match:{  'menuauth.menus.submenu.status' : true }},
          
          // ]
      )
    
    
    res.json(
        
        {  UserMenuAuths}
            
    )
  }

const putUserMenuAuth = async (req, res = response) => {
    
    res.json('este es el PUt de User Menu')
  }

const postUserMenuAuth = async (req, res = response) => {

    const data = req.body;
  


    const userMenuAuth = new UserMenuAuth(data);

    await userMenuAuth.save();
    res.status(201).json(
        {
                      userMenuAuth
        }
    )
  }

const deleteUserMenuAuth = async(req, res = response) => {
  res.json('este es el Delete de User Menu')
  }

  const getUserMenuAuthId = async(req = request, res = response) => {

    res.json('este es el GetbyId de User Menu')
}

  module.exports = {
        getUserMenuAuth,
        putUserMenuAuth,
        postUserMenuAuth,
        deleteUserMenuAuth,
        getUserMenuAuthId
  }