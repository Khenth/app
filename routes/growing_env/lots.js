const {Router} = require('express');
const { check } = require('express-validator');
const { newLot,
    getLots,
    getLotbyId,
    updateLot,
    deleteLot, 
    getLotbyIdZone} = require('../../controllers/growing_env/lots');
const { existeSpecie } = require('../../helpers/db_validators');
const { isAdminRol } = require('../../middleware');
const { validarJWT } = require('../../middleware/validar-jwt');
const { validarCampos } = require('../../middleware/validate-campos');

const router = Router();


// ver Lots
router.get('/', getLots);

// ver Lot
router.get('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
],getLotbyId );
// ver por zona
router.get('/zone/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
],getLotbyIdZone );

// crear una Lot - privado
router.post('/',[
    validarJWT,
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
],newLot );

// actualizar Species - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
] ,updateLot );

// delete Specie - privado
router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
], deleteLot);


module.exports = router;