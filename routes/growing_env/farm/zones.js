const {Router} = require('express');
const { check } = require('express-validator');
const {newZone,
    getZones,
    getZonebyId,
    getZonebyIdFarm,
    updateZone,
    deleteZone } = require('../../../controllers');
const { existeSpecie } = require('../../../helpers/db_validators');
const { isAdminRol, validateFarm } = require('../../../middleware');
const { validarJWT } = require('../../../middleware');
const { validarCampos } = require('../../../middleware');

const router = Router();


// ver Zones
router.get('/',getZones);

// ver Zone
router.get('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
],getZonebyId );

// ver zona por finca
router.get('/view/farm',[
    validarJWT,
    validateFarm, 
    // check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
],getZonebyIdFarm );

// crear una Zone - privado
router.post('/',[
    validarJWT,
    validateFarm, 
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
],newZone );

// actualizar Species - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
] ,updateZone );

// delete Specie - privado
router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
], deleteZone);


module.exports = router;