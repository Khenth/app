const {Router} = require('express');
const { check } = require('express-validator');
const {getUser, putUser, postUser, deleteUser, patchUser, getUserId} = require('../../controllers');
const { esRolValido, existeMail, existeId, existeNickName } = require('../../helpers/db_validators');
// const { validarJWT } = require('../middleware/validar-jwt');
// const { isAdminRol, tienRol } = require('../middleware/validar-roles');
// const { validarCampos } = require('../middleware/validate-campos');
const { validarJWT, isAdminRol, tienRol ,validarCampos  } = require('../../middleware');



const router = Router();

router.get('/', getUser );
router.put('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
] ,putUser);
router.post('/', [
    check('name', 'Nombre Obligatorio').not().isEmpty(),
    check('password', 'password no valido').isLength({min:6}),
    check('nickname',).custom(existeNickName),
    check('email',).custom(existeMail),
    check('rol', 'rol no valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],postUser);
router.delete('/:id',[
    validarJWT,
    // isAdminRol,
    tienRol('ADMIN_ROLE'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
], deleteUser);

router.get('/:id',[
    validarJWT,
    // esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeId ),
    validarCampos
], getUserId );
router.patch('/', patchUser);





module.exports = router;