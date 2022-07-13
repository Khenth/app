
const {response, request} = require('express');
const {UserGroup} = require('../../models');





 
const getUserGroup = async (req = request, res = response) => {
    const {limit = 5, init = 0} = req.query;
    // const querySt = {status : true}
    //cambiamos esto por promise para ejecutarlas simultaneamente
    // const users = await User.find(querySt)
    // .skip(Number(init))
    // .limit(Number(limit));
    // const totalUser = await User.countDocuments(querySt);

    const UserGroups = await UserGroup.find()
    .skip(Number(init))
    .limit(Number(limit));
    
    
    res.json(
        {
          UserGroups,
        }
    )
  }

const putUserGroup = async (req, res = response) => {
      const {id} = req.params;
      const {status, ...data} = req.body;
      data.nombre = data.nombre.toUpperCase();

      const updateUserGroup = await UserGroup.findByIdAndUpdate(id, data,{new: true})
      res.status(200).json(updateUserGroup);
  }

const postUserGroup = async (req, res = response) => {
  
    const nombre = req.body.nombre.toUpperCase();

    const userGroup = new UserGroup({nombre});

   await userGroup.save();

    // const UserGroup = {
    //   "_id" : userGroup._id,
    //   "nombre" : userGroup.nombre,
    //   "status" : userGroup.status
    // }

            

    res.status(201).json(
        
          userGroup
        
    )
  }

const deleteUserGroup = async(req, res = response) => {
  
  const {id} = req.params
  const {status,...data} = req.body

  if (status == null){
    const deleteusergroup = await UserGroup.findByIdAndUpdate(id,{status: false},{new: true})
    res.status(200).json({deleteusergroup})
 }else{
  const deleteusergroup = await UserGroup.findByIdAndUpdate(id,{status: status},{new: true})
  res.status(200).json({deleteusergroup})
  }
  // console.log(status)
  
  // res.json({deleteusergroup})
  }

  const getUserGroupId = async(req = request, res = response) => {

    res.json('este es el GetbyId de User Group')
}

  module.exports = {
        getUserGroup,
        putUserGroup,
        postUserGroup,
        deleteUserGroup,
        getUserGroupId
  }