const { Specie, Variety, FarmCropHarvest } = require('../models');
const Role = require('../models/users/role');
const User = require('../models/users/user');


const esRolValido =  async(rol = '')=>{
    const existingRol = await Role.findOne({rol});
    if(!existingRol){
        throw new Error(`El rol ${rol} no existe`)
    }
}

const existeMail = async(email = '')=>{

const existingMail = await User.findOne({email});

if(existingMail){
   throw new Error(`Email existente`)
}}

const existeNickName = async(nickname = '')=>{

const existingNickName = await User.findOne({nickname});

if(existingNickName){
   throw new Error(`Nombre de usuario existente`)
}}


const existeId = async(id)=>{

    const existingId = await User.findById(id);
    
    if(!existingId){
       throw new Error(`Id ${id} no existe`)
    }}
    
const existeSpecie = async(id) =>{
    const existeSpecie = await Specie.findById(id);

    if(!existeSpecie){
        throw new Error(`Id Specie ${id} no existe`)
    }
}
const existeFarmCropHarvest = async(id) =>{
    const existeFarmCropHarvest = await FarmCropHarvest.findById(id);

    if(!existeFarmCropHarvest){
        throw new Error(`Id FarmCropHarvest ${id} no existe`)
    }
}

const existeVariety = async(id)=>{
    const existeVariety = await Variety.findById(id);
    if(!existeVariety){
        throw new Error(`Id Varietyo ${id} no existe`)
    }
}

const validatedCollections = (collection = '', collections = [])=>{

    const include = collections.includes(collection);

    if(!include){
        throw new Error(`La coleccion ${collection} no es permitida, ${collections} `)
    }

    return true;
}


module.exports={
    esRolValido,
    existeMail, 
    existeNickName, 
    existeId,
    existeSpecie,
    existeVariety,
    existeFarmCropHarvest,
    validatedCollections
}