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
    


module.exports={
    esRolValido,
    existeMail,
    existeId
}