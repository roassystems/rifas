const {Router} = require('express');
const {check} = require('express-validator');
const {existeCedulaOtroBeneficiario,esRoleValido,existeUsuarioPorId,existeBeneficiarioPorId,
  existeCedulaOtroBeneficiarioToUpdate} = require('../helpers/db-validators');
const {validarCampos,validarJWT,tieneRole} = require('../middlewares');

const {getBeneficiariosActivosLimiteDesde,
    getBeneficiariosTodosActivos,
    getBeneficiariosTodosInactivos,
    registrarBeneficiario,
    actualizarBeneficiarioPut,
    actualizarImgBeneficiarioPut,
    beneficiarioDelete,
    getDetalleBeneficiario, borrarBeneficiarioFisicamente} = require('../controllers/beneficiarioController');


const router = new Router();

router.get("/", getBeneficiariosActivosLimiteDesde);
router.get("/activos", getBeneficiariosTodosActivos);
router.get("/inactivos", getBeneficiariosTodosInactivos);

router.post(
    "/",
    [
      validarJWT,
      check("uid_responsable", "El uid del responsable es obligatorio").not().isEmpty(),
      check('uid_responsable', 'El uid del responsable No es un ID válido').isMongoId(),
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("cedula", "La cedula es obligatoria").not().isEmpty(),
      check("estado_activo", "El estado activo es obligatoria").not().isEmpty(),
      check("estado_activo", "El estado activo debe ser boolean").isBoolean(),
      check("img_beneficiario", "La imagen del beneficiario es obligatoria").not().isEmpty(),
      check("img_beneficiario", "La imagen del beneficiario no tiene una url correcta").isURL(),
      //PENDIENTE VALIDAR URL DE IMAGEN
      check("apellido", "El apellido es obligatorio").not().isEmpty(),
      check("fecha_registro", "La fecha de registro es obligatorio").not().isEmpty(),
      check("fecha_registro", "La fecha de registro no es valida ").not().isDate(),
      check("cedula").custom( existeCedulaOtroBeneficiario),
       //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE','RESP_ROLE']),
      tieneRole('ADMIN_ROLE','RESP_ROLE'),
      validarCampos
    ],
    registrarBeneficiario
  );

router.put("/:id", [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeBeneficiarioPorId),
    check('rol').custom( esRoleValido ), 
    tieneRole('ADMIN_ROLE','RESP_ROLE'),
    validarCampos,
    actualizarBeneficiarioPut
],);

router.put("/imagen/:id", [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCedulaOtroBeneficiario ),
    check("img_beneficiario", "La imagen del beneficiario no tiene una url correcta").isURL(),
    tieneRole('ADMIN_ROLE','RESP_ROLE'),
    validarCampos,
    actualizarImgBeneficiarioPut
],);

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeBeneficiarioPorId ),
  tieneRole('ADMIN_ROLE','RESP_ROLE'),
  validarCampos
], beneficiarioDelete);

router.delete("/borrarfisicamente/:id",[
  //validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeBeneficiarioPorId ),
  //tieneRole('ADMIN_ROLE','RESP_ROLE'),
  validarCampos
],  borrarBeneficiarioFisicamente);

router.get("/getDetalle/:id",[
  validarJWT,
  tieneRole('ADMIN_ROLE','RESP_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], getDetalleBeneficiario);

module.exports = router;