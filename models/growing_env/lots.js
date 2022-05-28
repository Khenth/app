
const {Schema, model} = require('mongoose');


const LotSchema = Schema({
        nombre:{
            type : String,
            required : [true, "Nombre requerido"],
            unique:false
        },
        meters:{
            type : Number,
            required : [true, "Metros Requeridos"],
            default : 0
        },
        idzone:{
            type: Schema.Types.ObjectId,
            ref: 'zone',
            required: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        status:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
})

LotSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
      return data;
}


module.exports =  model('lot', LotSchema )