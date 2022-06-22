
const {Schema, model} = require('mongoose');
const moment = require('moment');

const farmCropHarvestSchema = Schema({
        idfarm:{
        type: Schema.Types.ObjectId,
        ref: 'farm',
        required: true
        },
        idvariety:{
        type: Schema.Types.ObjectId,
        ref: 'varietie',
        required: true
        },
        idlot:{
        type: Schema.Types.ObjectId,
        ref: 'lot',
        required: true
        },
    
        mesh:{
            type : Number,
            required : [true, "Metros Requeridos"],
            default : 0
        },
        stems:{
            type : Number,
            required : [true, "Metros Requeridos"],
            default : 0
        },
        weight:{
            type : Number,
        },
        date:{
            type : String,
        },
        datecreate:{
            type : String,
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

farmCropHarvestSchema.methods.toJSON = function(){
    const {__v,...data} = this.toObject();
        data.datecreate = moment(data.datecreate).format("YYYY-MM-DD, HH:MM:SS");
      return data;
}


module.exports =  model('farmcropharvest', farmCropHarvestSchema )