const { Schema, model } = require("mongoose");

const SorteoSchema = Schema({
    id_responsable: {
        type: String,
        required: [true, 'El id del responsable es obligatorio']
    },
    id_beneficiario:{
      type:String,
      required:  [true, 'El id del beneficiario es obligatorio']
    },
    id_ganador:{
        type:String,
        required:  [false, 'El id del ganador NO es obligatorio']
    },
    referencia_pago:{
        type:String,
        required:  [false, 'La referencia del pago realizado al ganador NO es obligatorio']
    },
    banco_pago:{
        type:String,
        required:  [false, 'Nombre del banco donde se realizo el pago realizado al ganador NO es obligatorio']
    },
    cantidad_nros:{
        type:String,
        required:  [true, 'La cantidad de nros a vender es obligatorio']
    },
    descripcion_sorteo: {
        type: String,
        required: [true, 'La descripcion del sorteo es obligatorio'],
        unique: true
    },
    estado_activo: {
        type: Boolean,
        default: true
    },
    estado_sorteo: {
        type: String,
        required: true,
        default: 'REGISTRADO',
        emun: ['REGISTRADO','APROBADO','CANCELADO','EN_VENTA','NROS_VENDIDOS','FINALIZADO']
    },
    fecha_registro:{
        type:Date,
        required: [true, 'La fecha de registro es obligatoria'],
    },
    fecha_ejecucion:{
        type:Date,
        required: [false, 'La fecha de ejecucion no es obligatoria'],
    },
    fecha_cancelacion:{
        type:Date,
        required: [false, 'La fecha de cancelacion no es obligatoria'],
    },
    calificacion_ganador:{
        type:Number,
        required:  [false, 'La caliifcacion del ganador NO es obligatorio']
    },
    desc_calificacion:{
        type:String,
        required:  [false, 'La descripcion de la caliifcacion del ganador NO es obligatorio']
    },
    monto_pagado:{
        type:Number,
        required:  [false, 'Monto pagador al ganador NO es obligatorio']
    },
    monto_comision_banco:{
        type:Number,
        required:  [false, 'Monto comision banco NO es obligatorio']
    },
});
SorteoSchema.methods.toJSON = function() {
    const { __v, _id, ...sorteo  } = this.toObject();
    sorteo.uid = _id;
    return sorteo;
}
//mongose anade la s al nombre de la coleccion
module.exports=model( 'SorteosRifa', SorteoSchema );
