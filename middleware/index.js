
const validarJWT = require('../middleware/validar-jwt');
const validarRoles = require('../middleware/validar-roles');
const validarCampos = require('../middleware/validate-campos');
const validateFileUpload = require('../middleware/validate-files');
const validateFarm = require('../middleware/validar-farm')



module.exports={
    ...validarJWT,
    ...validarRoles,
    ...validarCampos,
    ...validateFileUpload,
    ...validateFarm
}