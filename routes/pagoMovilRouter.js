const {Router} = require('express');
const {check} = require('express-validator');
const {existePagoMovilPorId, existeUsuarioPorId} = require('../helpers/db-validators');
const {validarCampos,validarJWT,tieneRole} = require('../middlewares');

const {getDetallePagoMovil,getPagosMovilesLimiteDesde,
       actualizarPagoMovilPut,
       registrarPagoMovil, pagoMovilDelete
    } = require('../controllers/pagomovilController');

const router = new Router();

router.get(
  "/getDetalle/:id",
  [
    //tieneRole('ADMIN_ROLE','RESP_ROLE', 'USER_ROL'),
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  getDetallePagoMovil
);

router.get("/activos", getPagosMovilesLimiteDesde);

router.post(
    "/",
    [
      validarJWT,
      check("uid_usuario", "El uid del usuario es obligatorio").not().isEmpty(),
      check('uid_usuario', 'El uid del usuario No es un ID válido').isMongoId(),
      check("cedula_pago", "La cedula es obligatoria").not().isEmpty(),
      check("telefono", "El telefono es obligatorio").not().isEmpty(),
      check("banco", "El banco es obligatorio").not().isEmpty(),
      check("estado_activo", "El estado activo es obligatoria").not().isEmpty(),
      check("estado_activo", "El estado activo debe ser boolean").isBoolean(),
      check("uid_usuario").custom(existeUsuarioPorId),
      //check("rol").custom( esRoleValido), 
      //tieneRole('ADMIN_ROLE','RESP_ROLE','USER_ROL'),
      validarCampos
    ],
    registrarPagoMovil
  );

  router.put("/:id", [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePagoMovilPorId),
    //check('rol').custom( esRoleValido ), 
    actualizarPagoMovilPut
],);

router.delete("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existePagoMovilPorId),
    //tieneRole('ADMIN_ROLE','RESP_ROLE'),
   // check('rol').custom( esRoleValido ), 
    validarCampos
  ], pagoMovilDelete);

module.exports = router;