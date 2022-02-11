const {Router} = require('express');
const { check } = require('express-validator');
const {getUser, putUser, postUser, deleteUser, patchUser} = require('../controllers/user');
const { esRolValido, existeMail, existeId } = require('../helpers/db_validators');
const { validarCampos } = require('../middleware/validate-campos');



const router = Router();

router.get('/', getUser );
router.put('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(esRolValido),
    validarCampos
] ,putUser);
router.post('/', [
    check('nombre', 'Nombre Obligatorio').not().isEmpty(),
    check('password', 'password no valido').isLength({min:6}),
    check('correo', 'correo no valido').isEmail(),
    check('correo',).custom(existeMail),

    // check('rol', 'rol no valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],postUser);
router.delete('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
], deleteUser);
router.patch('/', patchUser);





module.exports = router;