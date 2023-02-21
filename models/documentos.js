const { Schema, model } = require("mongoose");

const DocumentosSchema = Schema({
    uid_responsable: {
        type: String,
        required: [true, 'El uid del responsable es obligatorio']
    },
    uid_beneficiario: {
        type: String,
        required: [true, 'El uid del beneficiario es obligatorio'],
        unique: true

    },
    img_informe_1: {
        type: String,
        required: [true, 'La imagen 1 del informe medico es obligatoria'],
    },
    img_1:
    {
        data: Buffer,
        contentType: String
    },
    img_informe_2: {
        type: String,
        required: [false, 'La imagen 2 del informe medico NO es obligatoria'],
    },
    img_informe_3: {
        type: String,
        required: [false, 'La imagen 3 del informe medico  NO es obligatoria'],
    },
    img_informe_4: {
        type: String,
        required: [false, 'La imagen 4 del informe medico NO es obligatoria'],
    },
    
});

DocumentosSchema.methods.toJSON = function() {
    const { __v, _id, ...documento} = this.toObject();
    documento.uid = _id;
    return documento;
}
//mongose anade la s al nombre de la coleccion
module.exports=model( 'DocumentosBeneficiario',DocumentosSchema);
