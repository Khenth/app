const {Schema, model} = require('mongoose');


const ProductSchema = Schema({
        nombre:{
            type : String,
            required : [true, "Nombre requerido"],
            unique:true
        },
        color:{
            type : String,
            required : [true, "Color requerido"],
        },
        largo:{
            type : String,
            required : [true, "Color requerido"],
        },
        tipoUnidad:{
            type : String,
            required : [true, "Color requerido"],
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
        categorie:{
            type: Schema.Types.ObjectId,
            ref: 'Categorie',
            required: true
        },
})

ProductSchema.methods.toJSON = function(){
    const {__v, status,...data} = this.toObject();
      return data;
}


module.exports =  model('Product', ProductSchema )