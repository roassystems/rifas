const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { getParametrosRifas,registroYActualizacionPost  } = require('../controllers/parametrosController');


const router = Router();

router.get('/consulta',getParametrosRifas );
router.post('/registroyactualizacion',[ 
    check("servicio_activo", "El campo es obligatorio").not().isEmpty(),
    check("sorteos_activos", "El campo sorteos_activos es obligatorio").not().isEmpty(),
    check("costo_sorteo_tipo_a", "El campo costo_sorteo_tipo_a es obligatorio").not().isEmpty(),
    check("costo_sorteo_tipo_a", "El campo costo_sorteo_tipo_a debe ser numero double").isNumeric(),
    check("costo_sorteo_tipo_b", "El campo costo_sorteo_tipo_b es obligatorio").not().isEmpty(),
    check("costo_sorteo_tipo_b", "El campo costo_sorteo_tipo_b debe ser numero double").isNumeric(),
    check("porcentaje_comision_bancos", "El campo porcentaje_comision_bancos es obligatorio").not().isEmpty(),
    check("cantidad_sorteo_resp", "El campo sorteos_activos es obligatorio").not().isEmpty(),
    check("cantidad_sorteo_resp", "El campo cantidad de sorteo por usuario responsable debe ser entero").isInt(),
    validarCampos],
    registroYActualizacionPost);





module.exports = router;