
const {Schema, model} = require('mongoose');


const MainMenuSchema = Schema({
        mainmenu:{
            type : String,
            required : [true, "Nombre requerido"],
            unique:true
        },
        ruta:  {
            type: String},
        icon:  {
            type: String},        
        status:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
})

MainMenuSchema.methods.toJSON = function(){
    const {__v, status,...data} = this.toObject();
      return data;
}


module.exports =  model('mainmenu', MainMenuSchema )