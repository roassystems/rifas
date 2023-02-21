
const {Usuario, PagoMovilUsuario} = require('../models')
const {Beneficiario, Documentos} = require('../models')
const Role = require('../models/role');

const emailExiste = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}
const existeCedulaOtroBeneficiario = async( cedula = '' ) => {
    // Verificar si la cedula del beneficiario existe
    console.log("cedula a buscar "+cedula);
    const existeCedula = await Beneficiario.findOne({ cedula });
    if ( existeCedula ) {
        throw new Error(`La cedula del beneficiario : ${ cedula }, ya está registrado`);
    }
}

const existeCedulaOtroBeneficiarioToUpdate = async( cedula = '',id='' ) => {
    // Verificar si la cedula del beneficiario existe
    console.log("cedula a buscar "+cedula);
    console.log("id a compar "+id);
    const existeCedula = await Beneficiario.findOne({ cedula });
    if ( existeCedula ) {
        throw new Error(`La cedula del beneficiario : ${ cedula }, ya está registrado`);
    }
}

const usuarioExiste = async( cedula = '' ) => {
    // Verificar si la cedula del responsable existe
    const existeCedula = await Usuario.findOne({ cedula });
    if ( existeCedula ) {
        throw new Error(`La cedula del usuario : ${ cedula }, ya está registrado`);
    }
}
const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeDocumentoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeDoc = await Documentos.findById(id);
    if ( !existeDoc ) {
        throw new Error(`El id del documento no existe ${ id }`);
    }
}

const existePagoMovilPorId = async( id ) => {

    // Verificar si el correo existe
    const existepm = await PagoMovilUsuario.findById(id);
    if ( !existepm ) {
        throw new Error(`El id de pago movil no existe ${ id }`);
    }
}

const existeBeneficiarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Beneficiario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id del beneficiario no existe ${ id }`);
    }
}
const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

module.exports={
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    usuarioExiste,
    existeCedulaOtroBeneficiario,
    existeBeneficiarioPorId,
    existeCedulaOtroBeneficiarioToUpdate,
    existePagoMovilPorId,
    existeDocumentoPorId

   
}