
const { body } = require('express-validator');
const {Schema, model} = require('mongoose');


const SubMenuSchema = Schema({

        idmainmenu:{
            type: Schema.Types.ObjectId,
            ref: 'mainmenu',
            required : [true, "Main Menu Requerido"],
        },
        submenu : {type:String},
        status:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
})

SubMenuSchema.methods.toJSON = function(){
    const {__v, status,...data} = this.toObject();
      return data;
}


module.exports =  model('submenu', SubMenuSchema );




