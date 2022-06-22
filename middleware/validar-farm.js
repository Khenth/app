
const { response, request  } = require("express");
const { Farm } = require("../models");
const mongoose = require('mongoose');


const validateFarm =async (req= request, res = response, next )=>{
    const idfarm = req.header('c-farm'); 
   
    if(!idfarm){
        return res.status(500).json({
            msg: 'Se Una finca Validad'
        })}
    
    const farm = await Farm.findById(idfarm)
        
       if(!farm){
        return res.status(401).json({
            msg: 'Finca no existe'
        })}
       //si el finca no esta activo
       if (!farm.status){
          return res.status(401).json({
              msg: 'Finca inActiva'
          })
       }
       
       req.farm = farm;

    next();
}

module.exports = {
    validateFarm
}