const { Schema, model } = require("mongoose");

const ParametrosSchema = Schema({
    servicio_activo: {
        type: Boolean,
        default: true
    },
    sorteos_activos: {
        type: Boolean,
        default: true
    },
    //TIPO A PARA SORTEOS MENOR A 300 USD, TIPO B PARA SORTEOS MAYOR A 300 USDs
    costo_sorteo_tipo_a: {
        type: Number,
        required: [true, 'El costo del sorteo tipo a es obligatorio']
    },
    costo_sorteo_tipo_b: {
        type: Number,
        required: [true, 'El costo del sorteo tipo b es obligatorio']
    },
    porcentaje_comision_bancos:{
        type: Number,
        required:  [true, 'El porcentaje de la comision de bancos es obligatorio']
    },
    cantidad_sorteo_resp: {
        type: Number,
        required: [true, 'La cantidad de nros de sorteos es obligatorio'],
        
    },
    url_logo: {
        type: String,
        required: [false, 'La url del logo NO es obligatoria'],
    },
    
    
});
//mongose anade la s al nombre de la coleccion
module.exports = model('ParametrosRifa', ParametrosSchema );
