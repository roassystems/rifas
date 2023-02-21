const { Router } = require("express");
const { check } = require("express-validator");
const {emailExiste, esRoleValido, existeUsuarioPorId,usuarioExiste} = require('../helpers/db-validators');
const {validarCampos,validarJWT,tieneRole} = require('../middlewares') 

const {
  usuariosGetActivosLimiteDesde,
  usuariosGetTodosActivos,
  usuariosGetTodosInactivos,
  usuariosResponsablesRifasGetTodosInactivos,
  usuariosResponsablesRifasGetTodosActivos,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  getDetalleUsuario
} = require("../controllers/usuariosController");

const router = new Router();

router.get("/", usuariosGetActivosLimiteDesde);
router.get("/activos", usuariosGetTodosActivos);
router.get("/inactivos", usuariosGetTodosInactivos);
router.get("/resp_inactivos", usuariosResponsablesRifasGetTodosInactivos);
router.get("/resp_activos", usuariosResponsablesRifasGetTodosActivos);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("fecha_registro", "La fecha de registro es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom( emailExiste ),
    check('cedula').custom( usuarioExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE','RESP_ROLE']),
    check("rol").custom( esRoleValido), 
    validarCampos
  ],
  usuariosPost
);
router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut);
router.patch("/", usuariosPatch);

router.delete("/:id",[
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosDelete);

router.get("/getDetalle/:id",[
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], getDetalleUsuario);

module.exports = router;
