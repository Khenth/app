const {Router} = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateFile, viewFile } = require('../controllers/uploads');
const { validatedCollections } = require('../helpers/db_validators');
const { validarJWT, validateFileUpload } = require('../middleware');
const { validarCampos } = require('../middleware/validate-campos');

const router = Router();



router.post('/',validateFileUpload ,uploadFiles);
router.put('/:collection/:id',[
        validateFileUpload,
    check('id', 'tiene que ser un id de mongo').isMongoId(),
    check('collection').custom(c => validatedCollections(c, ['users', 'varieties'])),

    validarCampos
], updateFile);
router.get('/:collection/:id',[
    check('id', 'tiene que ser un id de mongo').isMongoId(),
    check('collection').custom(c => validatedCollections(c, ['users', 'varieties'])),

    validarCampos
], viewFile);


module.exports = router;