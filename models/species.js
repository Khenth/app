
const {Schema, model} = require('mongoose');


const SpecieSchema = Schema({
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
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
})

SpecieSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
      return data;
}


module.exports =  model('specie', SpecieSchema )