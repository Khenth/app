const {Router} = require('express');
const { check } = require('express-validator');
const { crearSpecie, obtenerSpecies, ObtenerSpecie, actualizarSpecie, deleteSpecie } = require('../../../controllers');
const { existeSpecie } = require('../../../helpers');
const { isAdminRol } = require('../../../middleware');
const { validarJWT } = require('../../../middleware');
const { validarCampos } = require('../../../middleware');

const router = Router();


// ver catergorias
router.get('/',obtenerSpecies);

// ver una Specie
router.get('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeSpecie),
    validarCampos
],ObtenerSpecie );

// crear una Specie - privado
router.post('/',[
    validarJWT,
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
],crearSpecie );

// actualizar Species - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeSpecie),
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
] ,actualizarSpecie );

// delete Specie - privado
router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeSpecie),
    validarCampos
], deleteSpecie);


module.exports = router;