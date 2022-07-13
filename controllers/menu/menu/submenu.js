
const {response, request} = require('express');


const SubMenu = require('../../../models/menu/menu/submenu');




 
const getSubMenu = async (req = request, res = response) => {
      const querySt = {status : true}

      const SubMenus = await SubMenu.find(querySt)
    
    
    res.json(
        {
          SubMenus,
            }
    )
  }

const putSubMenu = async (req, res = response) => {
    
    res.json('este es el PUt de User Menu')
  }

const postSubMenu = async (req, res = response) => {

    const data = req.body;
    data.submenu = data.submenu.toUpperCase();

    const SubMenus = new SubMenu(data);

    await SubMenus.save();
    res.status(201).json(
        {
                      SubMenus
        }
    )
  }

const deleteSubMenu = async(req, res = response) => {
  res.json('este es el Delete de User Menu')
  }

  const getSubMenuId = async(req = request, res = response) => {

    res.json('este es el GetbyId de User Menu')
}

  module.exports = {
        getSubMenu,
        putSubMenu,
        postSubMenu,
        deleteSubMenu,
        getSubMenuId
  }