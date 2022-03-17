
const validarJWT = require('../middleware/validar-jwt');
const validarRoles = require('../middleware/validar-roles');
const validarCampos = require('../middleware/validate-campos');



module.exports={
    ...validarJWT,
    ...validarRoles,
    ...validarCampos,
}