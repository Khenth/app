
const {Schema, model} = require('mongoose');


const farmCropHarvestSchema = Schema({
        idvariery:{
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
        date:{
            type : String,
            required : [true, "Fecha Requerida"],
            default : 0
        },
        nw:{
            type : Number,
            // required : [true, "Metros Requeridos"],
            // default : moment(date).format('GGGG')
        },
        datecreate:{
            type : Date,
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
      return data;
}


module.exports =  model('farmcropharvest', farmCropHarvestSchema )