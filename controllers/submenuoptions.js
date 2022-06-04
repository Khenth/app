
const {response, request} = require('express');


const SubMenuOptions = require('../models/submenuoptions');




 
const getSubMenuOptions = async (req = request, res = response) => {
      const querySt = {status : true}

      const SubMenuOption = await SubMenuOptions.find(querySt)
    
    
    res.json(
        {
          SubMenuOption,
            }
    )
  }

const putSubMenuOptions = async (req, res = response) => {
    
    res.json('este es el PUt de User Menu')
  }

const postSubMenuOptions = async (req, res = response) => {

    const data = req.body;
    data.title = data.title.toUpperCase();
    const SubMenuOption = new SubMenuOptions(data);
    
    await SubMenuOption.save();
    res.status(201).json(
        {
                      SubMenuOption
        }
    )
  }

const deleteSubMenuOptions= async(req, res = response) => {
  res.json('este es el Delete de User Menu')
  }

  const getSubMenuOptionsId = async(req = request, res = response) => {

    res.json('este es el GetbyId de User Menu')
}

  module.exports = {
        getSubMenuOptions,
        putSubMenuOptions,
        postSubMenuOptions,
        deleteSubMenuOptions,
        getSubMenuOptionsId
  }