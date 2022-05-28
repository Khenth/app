const {Router} = require('express');
const { check } = require('express-validator');
const {newFarm ,getFarms ,getFarmbyId, updateFarm, deleteFarm } = require('../../controllers/growing_env/farms');
const { isAdminRol } = require('../../middleware');
const { validarJWT } = require('../../middleware/validar-jwt');
const { validarCampos } = require('../../middleware/validate-campos');

const router = Router();


// ver areas
router.get('/',getFarms);

// ver area
router.get('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
],getFarmbyId );

// crear una Area - privado
router.post('/',[
    validarJWT,
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
],newFarm );

// actualizar Species - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
] ,updateFarm );

// delete Specie - privado
router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
], deleteFarm);


module.exports = router;