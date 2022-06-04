
const {response, request} = require('express');


const MainMenu = require('../models/mainmenu');




 
const getMainMenu = async (req = request, res = response) => {
      const querySt = {status : true}

      const MainMenus = await MainMenu.find(querySt)
    
    
    res.json(
        {
          MainMenus,
            }
    )
  }

const putMainMenu = async (req, res = response) => {
    
    res.json('este es el PUt de User Menu')
  }

const postMainMenu = async (req, res = response) => {

    const data = req.body;
    data.mainmenu = data.mainmenu.toUpperCase();


    const MainMenus = new MainMenu(data);

    await MainMenus.save();
    res.status(201).json(
        {
                      MainMenus
        }
    )
  }

const deleteMainMenu = async(req, res = response) => {
  res.json('este es el Delete de User Menu')
  }

  const getMainMenuId = async(req = request, res = response) => {

    res.json('este es el GetbyId de User Menu')
}

  module.exports = {
        getMainMenu,
        putMainMenu,
        postMainMenu,
        deleteMainMenu,
        getMainMenuId
  }