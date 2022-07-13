const {Router} = require('express');
const { check } = require('express-validator');
const { newLot,
    getLots,
    getLotbyId,
    updateLot,
    deleteLot, 
    getLotbyIdZone,
    getLotbyIdFarm} = require('../../../controllers');
const { existeSpecie } = require('../../../helpers');
const { isAdminRol, validateFarm } = require('../../../middleware');
const { validarJWT } = require('../../../middleware');
const { validarCampos } = require('../../../middleware');

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
// Ver por finca
router.get('/farm/current',[
    validarJWT,
    validateFarm, 
    validarCampos
],getLotbyIdFarm );

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