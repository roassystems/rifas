const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require('../models/usuario');

const usuariosGetActivosLimiteDesde = async(req, res = response) => {
  //const { q, nombre, apellido, page = 1, limit = 1 } = req.query;
  //res.send('Usuarios Get Controller');
  const { limite = 5, desde = 0 } = req.query;
  const query = {estado_activo: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
            .sort({
              nombre: 1,
              apellido: -1,
            })
    ]);

    res.json({
        total,
        usuarios
    });
  // res.json({
  //   q,
  //   nombre,
  //   apellido,
  //   page,
  //   limit,
  // });
};

const usuariosGetTodosActivos = async(req, res = response) => {
   const query = {estado_activo: true };
   const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .sort({
          nombre: 1,
          apellido: -1,
        })
    ]);

    res.json({
        total,
        usuarios
    });
  
};
const usuariosGetTodosInactivos = async(req, res = response) => {
  const query = {estado_activo: false };
  const [ total, usuarios ] = await Promise.all([
       Usuario.countDocuments(query),
       Usuario.find(query)
       .sort({
        nombre: 1,
        apellido: -1,
      })
   ]);

   res.json({
       total,
       usuarios
   });
 
};
const usuariosResponsablesRifasGetTodosInactivos = async(req, res = response) => {
  const query = {estado_activo: false , rol:'RESP_ROLE'};
  const [ total, usuarios ] = await Promise.all([
       Usuario.countDocuments(query),
       Usuario.find(query)
       .sort({
        nombre: 1,
        apellido: -1,
      })
   ]);
   res.json({
       total,
       usuarios
   });
 
};

const usuariosResponsablesRifasGetTodosActivos = async(req, res = response) => {
  const query = {estado_activo: true , rol:'RESP_ROLE'};
  const [ total, usuarios ] = await Promise.all([
       Usuario.countDocuments(query),
       Usuario.find(query)
       .sort({
        nombre: 1,
        apellido: -1,
      })
   ]);
   res.json({
       total,
       usuarios
   });
 
};

const getDetalleUsuario = async(req, res=response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  if(usuario){
    res.json({
      msg:"El detalle del usuario es",
      usuario
     });
  }else{
    res.status(404).json({
      msg:"usuario no encontrado",
      usuario
    })
  }
  
}
const usuariosPost = async (req, res = response) => {
  //res.send('Usuarios Post Controller');
  //const body = req.body;
  //const usuario = new Usuario(body);
  //SI QUEREMOS GUARDAR SOLO PARTE DE LA INFORMACION QUE NOS ENVIAN EN LA REQUETS TENEMOS
  const {
    nombre,
    apellido,
    cedula,
    correo,
    password,
    img,
    rol,
    estado_activo,
    fecha_registro,
  } = req.body;
  const usuario = new Usuario({
    nombre,
    apellido,
    cedula,
    correo,
    password,
    img,
    rol,
    estado_activo,
    fecha_registro,
  });
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  // Guardar en BD
  await usuario.save();
  res.json({
    msg: "usuario guardado",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  //res.send('Usuarios Put Controller');
  const { id } = req.params;
   //const {correo} = req.body.correo;
   //la siguiente linea me extrae del objeto lo que no quiero modificar y resto tiene las propiedades que se pueden modificar
   const { _id, password,correo,creadoGoogle, fecha_registro, ...resto } = req.body;
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  //res.json(usuario);
  res.json({
    msg: "Usuarios actualizado en Put Controller",
    usuario,
  });
};

const usuariosPatch =  ("/",
  (req, res = response) => {
    res.send("Usuarios Patch Controller");
  });
const usuariosDelete = async(req, res = response) => {
  const { id } = req.params;
  //console.log("id del usuario a desactivar "+id);
  const usuario = await Usuario.findByIdAndUpdate( id, {estado_activo: false } );
  res.json({
    msg: "Usuarios eliminado logicamente Controller",
    usuario,
  });
}
module.exports = {
  usuariosGetActivosLimiteDesde,
  usuariosGetTodosActivos,
  usuariosGetTodosInactivos,
  usuariosResponsablesRifasGetTodosInactivos,
  usuariosResponsablesRifasGetTodosActivos,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  getDetalleUsuario
};
