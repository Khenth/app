
const {Schema, model} = require('mongoose');


const UserGroupSchema = Schema({
        nombre:{
            type : String,
            required : [true, "Nombre requerido"],
            unique:true
        },
        status:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
})

UserGroupSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
      return data;
}


module.exports =  model('usergroup', UserGroupSchema )