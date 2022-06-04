const dbValidators = require('./db_validators');
const generarJWT = require('./generar_jwt');
const googleVerify = require('./google_verify');
const uploadFile = require('./upload-files');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile
}