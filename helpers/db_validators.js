const { Specie, Variety } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');


const esRolValido =  async(rol = '')=>{
    const existingRol = await Role.findOne({rol});
    if(!existingRol){
        throw new Error(`El rol ${rol} no existe`)
    }
}

const existeMail = async(correo = '')=>{

const existingMail = await User.findOne({correo});

if(existingMail){
   throw new Error(`Correo existente`)
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
    existeId,
    existeSpecie,
    existeVariety,
    validatedCollections
}