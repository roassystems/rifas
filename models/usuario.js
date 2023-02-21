const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido:{
      type:String,
      required:  [true, 'El apellido es obligatorio']
    },
    cedula:{
        type:String,
        required:  [true, 'La cedula del usuario es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img_cedula: {
        type: String,
        required: [false, 'La imagen de cedula no es obligatoria'],
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE','RESP_ROLE']
    },
    estado_activo: {
        type: Boolean,
        default: true
    },
    creadoGoogle: {
        type: Boolean,
        default: false
    },
    fecha_registro:{
        type:Date,
        required: [true, 'La fecha de registro es obligatoria'],
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}
//mongose anade la s al nombre de la coleccion
module.exports=model( 'UsuariosRifa', UsuarioSchema );
