const path = require('path')
const fs = require('fs')
const { response } = require("express");
const { uploadFile } = require("../helpers/upload-files");
const { User } = require("../models");



const uploadFiles =async (req, res = response ) => {
    try {
      // ejemplo
      // const fileLoad = await uploadFile(req.files, ['txt','md'], 'texts');
      const fileLoad = await uploadFile(req.files, undefined, 'imgs');
      res.json({file: fileLoad});
      
    } catch (msg) {
      res.status(400).json({msg})
    }


}

const updateFile =async (req, res = response)=>{

  const{ id, collection} = req.params;
  let model;

  switch (collection){
     case 'users': 
         model = await User.findById(id)
            if(!model){
              return res.status(400).json({msg: `No existe usuario ${id}`})
            }


      break;

    default:
      return res.status(500).json({msg: 'se me olvido validar esto'})

  }

  // limpiar imagenes previas
    if(model.img){
      //borrar imagen del servidor
      pathImage = path.join(__dirname, '../uploads', collection , model.img);
      if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage)
      }

    }

  const fileLoad = await uploadFile(req.files, undefined, collection);

  model.img = fileLoad;

  await model.save();

  res.json(model)

}


const viewFile = async (req, res = response)=>{
  const{ id, collection} = req.params;
  let model;

  switch (collection){
     case 'users': 
         model = await User.findById(id)
            if(!model){
              return res.status(400).json({msg: `No existe usuario ${id}`})
            }


      break;

    default:
      return res.status(500).json({msg: 'se me olvido validar esto'})

  }

  // limpiar imagenes previas
    if(model.img){
      //borrar imagen del servidor
      pathImage = path.join(__dirname, '../uploads', collection , model.img);
      if(fs.existsSync(pathImage)){
       return res.sendFile(pathImage)
      }

    }else{
      const placeHolderImage =  path.join(__dirname, '../assets', 'no-image.jpg')
      return res.sendFile(placeHolderImage)
    }


}


module.exports ={
        uploadFiles,
        updateFile,
        viewFile,
}