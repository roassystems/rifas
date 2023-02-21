const validaCampos = require('../middlewares/validar-campos');
const validarJWT   = require('../middlewares/validar-jwt');
const validaRoles  = require('../middlewares/validar-roles');
const uploadMongo  = require('../middlewares/uploadMongo');
const uploadServer  = require('../middlewares/uploadServer');
// const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ... uploadMongo,
    ...uploadServer
    // ...validarArchivo
}