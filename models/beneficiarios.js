const { Schema, model } = require("mongoose");

const BeneficiarioSchema = Schema({
    uid_responsable: {
        type: String,
        required: [true, 'El uid del responsable es obligatorio']
    },
    nombre:{
        type:String,
        required:  [true, 'El nombre del beneficiario es obligatorio']
    },
    apellido:{
      type:String,
      required:  [true, 'El apellido del beneficiario es obligatorio']
    },
    cedula:{
        type:String,
        required:  [true, 'La cedula del beneficiario es obligatorio']
    },
    img_beneficiario: {
        type: String,
        required: [true, 'La imagen del beneficiario es obligatoria'],
    },
    estado_activo: {
        type: Boolean,
        default: true
    },
    fecha_registro:{
        type:Date,
        required: [true, 'La fecha de registro es obligatoria'],
    }
});

BeneficiarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...beneficiario} = this.toObject();
    beneficiario.uid = _id;
    return beneficiario;
}
//mongose anade la s al nombre de la coleccion
module.exports=model( 'BeneficiariosRifa',BeneficiarioSchema);
