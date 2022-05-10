const {Router} = require('express');
const { check } = require('express-validator');
const {getSubMenu, putSubMenu, postSubMenu, deleteSubMenu, getSubMenuId} = require('../controllers/submenu');
const { esRolValido, existeMail, existeId } = require('../helpers/db_validators');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRol, tienRol } = require('../middleware/validar-roles');
// const { validarCampos } = require('../middleware/validate-campos');
const { validarJWT, isAdminRol, tienRol ,validarCampos  } = require('../middleware');



const router = Router();

router.get('/', getSubMenu );

router.put('/:id',putSubMenu);


router.post('/',postSubMenu);



router.delete('/:id', deleteSubMenu);

router.get('/:id', getSubMenuId );






module.exports = router;