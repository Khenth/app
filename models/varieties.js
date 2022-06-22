const {Schema, model} = require('mongoose');


const VarietieSchema = Schema({
        nombre:{
            type : String,
            required : [true, "Nombre requerido"],
            unique:true
        },
        color:{
            type : String,
            required : [true, "Color requerido"],
        },
        ciclo:{
            type : String,
            required :[true, "Ciclo de Cultivo requerido"]
        },
        manejo:{
            type : String,
            required :[true, "Menejo de requerido"],
            emun: ['LONGITUD', 'PESO'],
        },
        stemsmalla:{
            type : Number,
            default : 0
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
        },
        idspecie:{
            type: Schema.Types.ObjectId,
            ref: 'specie',
            required: true
        },
})

VarietieSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
      return data;
}


module.exports =  model('varietie', VarietieSchema )