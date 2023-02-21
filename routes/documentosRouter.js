
const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT } = require('../middlewares')
const { existeDocumentoPorId, existeUsuarioPorId, usuarioExiste, existeBeneficiarioPorId } = require('../helpers/db-validators');
const { getDocumentosBeneficiarios,
  registroUpdateDocumentoPost,
  borrarDocumentoDelete, 
  getDetalleDocumento,
  registroUpdateDocumentoImgPost } = require('../controllers/documentosController');
//const uploadController = require("../controllers/upload");
const uploadController = require("../controllers/uploadController");

const router = new Router();


router.get("/", getDocumentosBeneficiarios);

router.post(
  "/",
  [
    check("uid_responsable", "El uid_responsable es obligatorio").not().isEmpty(),
    check("uid_beneficiario", "El uid_beneficiario es obligatoria").not().isEmpty(),
    check("uid_responsable", "El uid_responsable no es un id mongo valido").isMongoId(),
    check("uid_beneficiario", "El uid_beneficiario no es un id mongo valido").isMongoId(),
    check('uid_responsable').custom(existeUsuarioPorId),
    check('uid_beneficiario').custom(existeBeneficiarioPorId),
    check("img_informe_1", "La imagen del img_informe_1 es obligatoria").not().isEmpty(),
    check("img_informe_1", "La imagen del img_informe_1 no tiene una url correcta").isURL(),
    validarCampos
  ],
  registroUpdateDocumentoPost
);

router.post(
  "/registrarDocumento",
  registroUpdateDocumentoImgPost
);

router.delete("/:id", [
  //validarJWT,
  //tieneRole('ADMIN_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeDocumentoPorId),
  validarCampos
], borrarDocumentoDelete);

router.post("/uploadMongo", uploadController.uploadFilesMongo);
router.get("/files", uploadController.getListFilesServer);
router.get("/files/:name", uploadController.downloadMongo);


router.get("/getDetalle/:id", [
  //validarJWT,
  //tieneRole('ADMIN_ROLE'),
  check('id', 'No es un ID  válido').isMongoId(),
  validarCampos
], getDetalleDocumento);
module.exports = router;