const {Router} = require('express');
const { check } = require('express-validator');
const {getMenuOptions, getSubMenu, getSubMenuOptions, putMenuOptions, postMenuOptions, deleteMenuOptions, putMenuOptionsAdminId, getRoutesOptions, getMenuOptionsAdmin, getMenuOptionsAdminbyID} = require('../controllers/menuoptions');
const { esRolValido, existeMail, existeId } = require('../helpers/db_validators');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRol, tienRol } = require('../middleware/validar-roles');
// const { validarCampos } = require('../middleware/validate-campos');
const { validarJWT, isAdminRol, tienRol ,validarCampos  } = require('../middleware');



const router = Router();

router.get('/',validarJWT, getMenuOptions );
router.get('/submenu/:id',validarJWT, getSubMenu );
router.get('/submenu/options/:id',validarJWT, getSubMenuOptions );
router.get('/navigate',validarJWT, getRoutesOptions );
router.get('/admin',getMenuOptionsAdmin);
router.get('/admin/:id',getMenuOptionsAdminbyID);
router.put('/admin/:id', putMenuOptionsAdminId );

router.put('/:id',putMenuOptions);


router.post('/',postMenuOptions);



router.delete('/:id', deleteMenuOptions);







module.exports = router;