const {Router} = require('express');
const { check } = require('express-validator');
const { obtenerProducts, crearProducto, obtenerProduct, actualizarProduct, deleteProduct } = require('../controllers/product');
const { existeProduct } = require('../helpers/db_validators');
const { isAdminRol } = require('../middleware');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validate-campos');

const router = Router();


// ver catergorias
router.get('/',obtenerProducts);

router.get('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeProduct),
    validarCampos
],obtenerProduct);

router.post('/',[
    validarJWT,
    check('nombre', 'Nombre es Requerido').not().isEmpty(),
    check('color','Color es Requerido').not().isEmpty(),
    check('largo','Largo es Requerido').not().isEmpty(),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeProduct),
    check('nombre', 'Nombre es Requerido').not().isEmpty(),
    check('color','Color es Requerido').not().isEmpty(),
    check('largo','Largo es Requerido').not().isEmpty(),
    validarCampos
], actualizarProduct);

router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeProduct),
    validarCampos
],deleteProduct);



module.exports = router;