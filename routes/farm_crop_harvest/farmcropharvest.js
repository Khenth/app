const {Router} = require('express');
const { check } = require('express-validator');
const {  newFarmCropHarvest,
    getFarmCropHarvests,
    getFarmCropHarvestbyId,
    // getFarmCropHarvestbyIdZone,
    updateFarmCropHarvest,
    deleteFarmCropHarvest} = require('../../controllers/farm_crop_harvest/farmcropharvest');
const { existeSpecie } = require('../../helpers/db_validators');
const { isAdminRol } = require('../../middleware');
const { validarJWT } = require('../../middleware/validar-jwt');
const { validarCampos } = require('../../middleware/validate-campos');

const router = Router();


// ver FarmCropHarvests
router.get('/', getFarmCropHarvests);

// ver FarmCropHarvest
router.get('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
],getFarmCropHarvestbyId );
// ver por zona
// router.get('/zone/:id',[
//     validarJWT,
//     check('id', 'No es un Id valido').isMongoId(),
//     // check('id').custom(existeSpecie),
//     validarCampos
// ],getFarmCropHarvestbyIdZone );

// crear una FarmCropHarvest - privado
router.post('/',[
    validarJWT,
    // check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
],newFarmCropHarvest );

// actualizar Species - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
] ,updateFarmCropHarvest );

// delete Specie - privado
router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeSpecie),
    validarCampos
], deleteFarmCropHarvest);


module.exports = router;