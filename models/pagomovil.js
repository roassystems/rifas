const { Schema, model } = require("mongoose");

const PagoMovilSchema = Schema({
    uid_usuario: {
        type: String,
        required: [true, 'El uid del usuario es obligatorio']
    },
    cedula_pago:{
        type:String,
        required:  [true, 'La cedula del pago movil del usuario es obligatorio']
    },
    telefono:{
      type:String,
      required:  [true, 'El telefono del pago movil del usuario es obligatorio']
    },
    banco:{
        type:String,
        required:  [true, 'El banco del pago movil del usuario es obligatorio']
    },
    estado_activo:{
        type:Boolean,
        required:  [true, 'El estado del pago movil del usuario es obligatorio']
    },
   
});

PagoMovilSchema.methods.toJSON = function() {
    const { __v, _id, ...pagomovilusuario} = this.toObject();
    pagomovilusuario.uid = _id;
    return pagomovilusuario;
}
//mongose anade la s al nombre de la coleccion
module.exports = model('PagoMovilUsuario',PagoMovilSchema);
