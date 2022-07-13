
const {Schema, model} = require('mongoose');


const ZoneSchema = Schema({
        nombre:{
            type : String,
            required : [true, "Nombre requerido"],
            unique:false
        },
        status:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
        inside:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        idfarm:{
            type: Schema.Types.ObjectId,
            ref: 'farm',
            required: true
        }
})

ZoneSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
      return data;
}


module.exports =  model('zone', ZoneSchema )