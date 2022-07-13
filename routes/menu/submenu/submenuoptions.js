const {Router} = require('express');
const { check } = require('express-validator');
const {getSubMenuOptions, putSubMenuOptions, postSubMenuOptions, deleteSubMenuOptions, getSubMenuOptionsId} = require('../../../controllers');
const { esRolValido, existeMail, existeId } = require('../../../helpers/db_validators');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRol, tienRol } = require('../middleware/validar-roles');
// const { validarCampos } = require('../middleware/validate-campos');
const { validarJWT, isAdminRol, tienRol ,validarCampos  } = require('../../../middleware');



const router = Router();

router.get('/', getSubMenuOptions );

router.put('/:id',putSubMenuOptions);


router.post('/',postSubMenuOptions);



router.delete('/:id', deleteSubMenuOptions);

router.get('/:id', getSubMenuOptionsId );






module.exports = router;