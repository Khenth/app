
const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type : String,
        required: [true, 'Nombre Obligatorio']
    },
    correo: {
        type : String,
        required: [true, 'Correo Obligatorio'],
        unique: true
    },
    password: {
        type : String,
        required: [true, 'Password Obligatorio']
    },
    img: {
        type : String,
    },
    rol: {
        type : String,
        required: [true],
        // emun: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'ADMIN_ROLE'
    },
    idusergroup:{
        type: Schema.Types.ObjectId,
        ref: 'usergroup',
        // required: true
    },
    idfarms:[{
        idfarm:{
            type: Schema.Types.ObjectId,
            ref: 'farm',
            }
        }],
    status: {
        type : Boolean,
        default: true
    },
    google: {
        type : Boolean,
        default: false
    }


    


})

UserSchema.methods.toJSON = function(){
    const {__v,_id, idfarms, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('user', UserSchema);