
const validarJWT = require('../middleware/validar-jwt');
const validarRoles = require('../middleware/validar-roles');
const validarCampos = require('../middleware/validate-campos');
const validateFileUpload = require('../middleware/validate-files');



module.exports={
    ...validarJWT,
    ...validarRoles,
    ...validarCampos,
    ...validateFileUpload
}