
const { body } = require('express-validator');
const {Schema, model} = require('mongoose');


const MenuOptionsSchema = Schema({
        idusergroup: {
            type: Schema.Types.ObjectId,
            ref: 'usergroup',
            required: true
        },
        idsubmenuoption: {
            type: Schema.Types.ObjectId,
            ref: 'submenuoption',
            required: true
        },
              
        status:{
            type : Boolean,
            required: [true, "Estado requerido"],
            default: true
        },
})

MenuOptionsSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
      return data;
}


module.exports =  model('menuoption', MenuOptionsSchema );