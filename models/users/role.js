

const {Schema, model} = require('mongoose');


const RoleSchema = Schema({
        rol:{
            type : String,
            required : [true, "Rol requerido"]
        }
})


module.exports =  model('Role', RoleSchema )