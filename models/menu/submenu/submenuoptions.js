
const { body } = require('express-validator');
const {Schema, model} = require('mongoose');


const SubMenuOptionSchema = Schema({
    idsubmenu: {
        type: Schema.Types.ObjectId,
        ref: 'submenu',
        required : [true, "Sub menu requerido"],
    },
    title: {
        type: String},
    ruta:  {
        type: String},
    icon:  {
        type: String},
    detail:  {
        type: String},
    
    status: { type: Boolean, default: false}   
})

SubMenuOptionSchema.methods.toJSON = function(){
    const {__v, status,...data} = this.toObject();
      return data;
}


module.exports =  model('submenuoption', SubMenuOptionSchema );