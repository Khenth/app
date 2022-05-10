const {Router} = require('express');
const { check } = require('express-validator');
const {getMainMenu, putMainMenu, postMainMenu, deleteMainMenu, getMainMenuId} = require('../controllers/mainmenu');
const { esRolValido, existeMail, existeId } = require('../helpers/db_validators');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRol, tienRol } = require('../middleware/validar-roles');
// const { validarCampos } = require('../middleware/validate-campos');
const { validarJWT, isAdminRol, tienRol ,validarCampos  } = require('../middleware');



const router = Router();

router.get('/', getMainMenu );

router.put('/:id',putMainMenu);


router.post('/',postMainMenu);



router.delete('/:id', deleteMainMenu);

router.get('/:id', getMainMenuId );






module.exports = router;