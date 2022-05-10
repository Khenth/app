const {Router} = require('express');
const { check } = require('express-validator');
const {login, googleSingIn, renovarToken} = require('../controllers/auth');
const { validarJWT } = require('../middleware');
const { validarCampos } = require('../middleware/validate-campos');

const router = Router();

router.post('/login',[
    check('correo', 'correo obligatorio').isEmail(),
    check('password', 'password obligatorio').not().isEmpty(),
    validarCampos
], login );

router.post('/google',[
    check('id_token', 'Token google necesario').not().isEmpty(),
    validarCampos
], googleSingIn );

router.get('/', validarJWT, renovarToken)


module.exports = router;