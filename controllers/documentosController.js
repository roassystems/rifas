const { response, request } = require("express");
const Documentos = require('../models/documentos');
const uploadServer = require("../middlewares/uploadServer");
const baseUrl = `${process.env.URL_SERVER_DEPLOY}`;
const getDocumentosBeneficiarios = async(req, res = response) => {
   //const query = { estadoActivo: true };
    const [ total, documentos ] = await Promise.all([
         Documentos.countDocuments(),
         Documentos.find()
         
     ]);
      res.json({
         total,
         documentos
     });
   
 };

const registroUpdateDocumentoImgPost = async (req, res = response) => {
  try {
    await uploadServer(req, res);
    if (req.file == undefined) {
      return res.status(404).send({
        message: "You must select a file.",
      });
    }
    console.log("Imagen cargada en server :" + req.file);
    console.log("Path de Imagen cargada en server :" + req.file.path);
    console.log("Body de request  uid_responsable:" + req.body.uid_responsable);
    const { uid_responsable, uid_beneficiario, img_informe_1,
      img_informe_2, img_informe_3, img_informe_4
    } = req.body;

    const existeDocumento = await Documentos.findOne({ uid_beneficiario });
    const doc = new Documentos({
      uid_responsable, uid_beneficiario, img_informe_1,
      img_informe_2, img_informe_3, img_informe_4
    });
    doc.img_informe_1= baseUrl + "/"+req.file.path
    if (!existeDocumento) {
      // Guardar en BD

      await doc.save();
      res.json({
        msg: `Documento de beneficiario ${uid_beneficiario} guardado exitosamente`,
        doc,
      });
    } else {

      const id = existeDocumento.id;
      //console.log("id de documento a actualizar "+id);
      doc._id = existeDocumento._id;
      //console.log("id de documento a actualizar dos  "+existeDocumento._id);
      const { _id, ...resto2 } = doc;
      const paraactualizado = await Documentos.findByIdAndUpdate(id, resto2);
      //console.log("doc "+JSON.stringify(resto2));
      res.json({
        msg: `Documentos actualizado exitosamente para id de documento ${id}`,
        paraactualizado,
      });
    }

  } catch (error) {
    console.log(error);

    return res.send({
      message: `Error when trying upload image: ${error}`,
    });
  }
}
 const registroUpdateDocumentoPost = async (req, res = response) => {
  const {uid_responsable,uid_beneficiario,img_informe_1,
        img_informe_2,img_informe_3,img_informe_4
    } = req.body;

    const existeDocumento = await Documentos.findOne({uid_beneficiario});
    const doc = new Documentos({
        uid_responsable,uid_beneficiario,img_informe_1,
        img_informe_2,img_informe_3,img_informe_4
      });
    if (!existeDocumento) {
      // Guardar en BD
      await doc.save();
      res.json({
        msg: `Documento de beneficiario ${uid_beneficiario} guardado exitosamente`,
        doc,
      });
    } else {
      
   // const {_id,uid_beneficiario,uid_responsable, ...resto } = existeDocumento ;
    //   resto.img_informe_1 = doc.img_informe_1;
    //   resto.img_informe_2 = doc.img_informe_2;
    //   resto.img_informe_3 = doc.img_informe_3;
      //resto.img_informe_4 = doc.img_informe_4;
      //console.log("id de documento a actualizar "+existeDocumento.id);
      //console.log("valor  actualizar "+req.body.img_informe_1);
      //console.log("resto "+JSON.stringify(resto));
      const id = existeDocumento.id;
      //console.log("id de documento a actualizar "+id);
      doc._id = existeDocumento._id;
      //console.log("id de documento a actualizar dos  "+existeDocumento._id);
      const {_id, ...resto2 } = doc ;
      const paraactualizado = await Documentos.findByIdAndUpdate(id, resto2);
      //console.log("doc "+JSON.stringify(resto2));
      res.json({
        msg: `Documentos actualizado exitosamente para id de documento ${id}`,
        paraactualizado,
      });
    }
    
  };

  const borrarDocumentoDelete = async(req, res = response) => {
    const { id } = req.params;
    //console.log("id del usuario a eliminar "+id);
    const pagom = await Documentos.findOneAndRemove( id );
    res.json({
      msg: ` Documento $(id) eliminado fisicamente en Controller`,
      pagom,
    });
  }

  const getDetalleDocumento = async(req, resp=response)=>{
    const { id } = req.params;

    const doc = await Documentos.findById(id);
    if(doc){
      resp.status(200).json({
        msg:'El detalle del documento es:',
        doc
    });
    }else{
      resp.status(404).json({
        msg:'documento no encontrado:',
        doc
      })
    }
    
  }
 module.exports={getDocumentosBeneficiarios, registroUpdateDocumentoPost,
  borrarDocumentoDelete,
  getDetalleDocumento,
  registroUpdateDocumentoImgPost}
