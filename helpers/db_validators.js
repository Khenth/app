const { Categorie, Product } = require('../models');
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
    
const existeCategorie = async(id) =>{
    const existeCategorie = await Categorie.findById(id);
    if(!existeCategorie){
        throw new Error(`Id categorie ${id} no existe`)
    }
}

const existeProduct = async(id)=>{
    const existeProduct = await Product.findById(id);
    if(!existeProduct){
        throw new Error(`Id Producto ${id} no existe`)
    }
}

module.exports={
    esRolValido,
    existeMail,
    existeId,
    existeCategorie,
    existeProduct
}