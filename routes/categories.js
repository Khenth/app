const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategories, ObtenerCategorie, actualizarCategorie, deleteCategorie } = require('../controllers/categorie');
const { existeCategorie } = require('../helpers/db_validators');
const { isAdminRol } = require('../middleware');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validate-campos');

const router = Router();


// ver catergorias
router.get('/',obtenerCategories);

// ver una categoria
router.get('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeCategorie),
    validarCampos
],ObtenerCategorie );

// crear una categoria - privado
router.post('/',[
    validarJWT,
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
],crearCategoria );

// actualizar categorias - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeCategorie),
    check('nombre','nombre requerido').not().isEmpty(),
    validarCampos
] ,actualizarCategorie );

// delete categoria - privado
router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeCategorie),
    validarCampos
], deleteCategorie);


module.exports = router;