
const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type : String,
        required: [true, 'Nombre Obligatorio']
    },
    nickname: {
        type : String,
        required: [true, 'UserName Obligatorio'],
        unique: true
    },
    email: {
        type : String,
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
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'GUEST_ROLE'],
        default: 'GUEST_ROLE'
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