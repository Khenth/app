const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validTypeFile = ['png', 'jpg', 'jpeg', 'gif'], folder = '' )=>{
    
    return new Promise((resolve, reject)=>{
        const {file} = files;

        const cutName = file.name.split('.');
     
        const typeFile = cutName[cutName.length -1];
     
        //extensiones validad
     
        if(!validTypeFile.includes(typeFile)){
         return reject(`La Extension ${typeFile} no es la correcta, ${validTypeFile} `)
        }
     
       
         const nameUpload = uuidv4()+ '.' + typeFile;
         uploadPath =path.join( __dirname, '../uploads/', folder, nameUpload);
       
         file.mv(uploadPath, (err)=> {
           if (err) {
             return reject(err)
           }
       
           resolve(nameUpload);
         });
    })



   



}


module.exports ={
    uploadFile
}