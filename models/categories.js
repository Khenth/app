
const {Schema, model} = require('mongoose');


const CategorieSchema = Schema({
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

CategorieSchema.methods.toJSON = function(){
    const {__v, status,...data} = this.toObject();
      return data;
}


module.exports =  model('Categorie', CategorieSchema )