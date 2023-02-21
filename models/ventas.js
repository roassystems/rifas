const { Schema, model } = require("mongoose");

const VentasSchema = Schema({
    uid_sorteo: {
        type: String,
        required: [true, 'El id del sorteo es obligatorio']
    },
    uid_responsable:{
      type:String,
      required:  [true, 'El uid del responsable es obligatorio']
    },
    nro_limite:{
        type:Number,
        required:  [true, 'El limite vendido es obligatorio']
    },
    nro_vendido:{
      type:Number,
      required:  [true, 'El nro vendido es obligatorio']
    },
    referencia_pago:{
        type:String,
        required:  [false, 'La referencia del pago realizado por la venta es obligatorio'],
        unique: true
    },
    banco_pago:{
        type:String,
        required:  [false, 'Nombre del banco de donde se realizo el pago por la venta NO es obligatorio']
    },
    estado_nro: {
        type: String,
        required: true,
        default: 'DISPONILBE',
        emun: ['VENDIDO','DISPONIBLE']
    },
    fecha_venta:{
        type:Date,
        required: [false, 'La fecha de venta NO es obligatoria'],
    },
    monto_pagado:{
        type:Number,
        required:  [false, 'Monto pagado por la venta NO es obligatorio']
    },
    
});
VentasSchema.methods.toJSON = function() {
    const { __v, _id, ...ventas  } = this.toObject();
    ventas.uid = _id;
    return ventas;
}
//mongose anade la s al nombre de la coleccion
module.exports=model( 'VentasSorteoRifa', VentasSchema );
