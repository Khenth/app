const {Router} = require('express');
const { check } = require('express-validator');
const {getUserGroup, putUserGroup, postUserGroup, deleteUserGroup, getUserGroupId} = require('../controllers/userGroup');
const { esRolValido, existeMail, existeId } = require('../helpers/db_validators');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRol, tienRol } = require('../middleware/validar-roles');
// const { validarCampos } = require('../middleware/validate-campos');
const { validarJWT, isAdminRol, tienRol ,validarCampos  } = require('../middleware');



const router = Router();

router.get('/', getUserGroup );

router.put('/:id',putUserGroup);


router.post('/', [
    check('nombre', 'Nombre Obligatorio').not().isEmpty(),
    validarCampos
],postUserGroup);



router.delete('/:id', deleteUserGroup);

router.get('/:id', getUserGroupId );






module.exports = router;