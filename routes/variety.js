const {Router} = require('express');
const { check } = require('express-validator');
const { obtenerVarieties, crearVariety, obtenerVariety, actualizarVariety, deleteVariety } = require('../controllers/variety');
const { existeVariety } = require('../helpers/db_validators');
const { isAdminRol } = require('../middleware');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validate-campos');

const router = Router();


// ver catergorias
router.get('/',obtenerVarieties);

router.get('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeVariety),
    validarCampos
],obtenerVariety);

router.post('/',[
    validarJWT,
    check('nombre', 'Nombre es Requerido').not().isEmpty(),
    check('idspecie', 'Especie Requerida').not().isEmpty(),
    validarCampos
],crearVariety);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeVariety),
    check('nombre', 'Nombre es Requerido').not().isEmpty(),
    check('idspecie', 'Especie Requerida').not().isEmpty(),
    
    validarCampos
], actualizarVariety);

router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeVariety),
    validarCampos
],deleteVariety);



module.exports = router;