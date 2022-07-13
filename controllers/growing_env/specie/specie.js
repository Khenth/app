const { response, request } = require("express");
const {Specie} = require('../../../models')

// OBTENER specieS PAGINADO - TOTAL -  POPULATE

const obtenerSpecies = async (req = request, res = response)=>{

    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true};

    const [Species, totalSpecies] = await Promise.all([

            Specie.find(),            
            // .skip(Number(init))
            // .limit(Number(limit)),
            Specie.countDocuments()]
    )

    res.status(200).json({
        totalSpecies,
        Species
    })

}

// OBTENER SOLO UNA specie CON POPULATE

const ObtenerSpecie = async (req, res)=>{

        const {id} = req.params;
        const SpecieId = await Specie.findById(id).populate('user','nombre')

       res.status(200).json({
          SpecieId
       })


}



const crearSpecie = async (req, res = response)=>{

        const nombre = req.body.nombre.toUpperCase();
         
        const specieDB = await Specie.findOne({nombre});

        if(specieDB){
           return res.status(400).json({
                msg: `la specie ${specieDB.nombre} ya existe`
            });
        }

        //generar la informacion para el modelo
        const data = {
            nombre,
            user: req.user._id
        }

        const SpecieDB = new Specie(data);

        // guardar

        await SpecieDB.save();

        res.status(200).json(SpecieDB);

}

// ACTUALIZAR specie

const actualizarSpecie = async(req, res = response)=>{
    const {id} = req.params;
    
        const{status, user, ...data} = req.body;
    

        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
  
        const actualizaSpecie = await Specie.findByIdAndUpdate(id, data,{new:true});

        res.status(200).json(actualizaSpecie);

}

// BORRAR specie - ESTADO A FALSE

const deleteSpecie = async (req, res=response)=>{
    const {id} = req.params;
    const {status,...data} = req.body
    if (status == null){
    const deleteSpecie = await Specie.findByIdAndUpdate(id, {status:false},{new: true});
    res.status(200).json(deleteSpecie);
    }else{
        const deleteSpecie = await Specie.findByIdAndUpdate(id, {status:status},{new: true});
        res.status(200).json(deleteSpecie);
    }

}

module.exports = {
    crearSpecie,
    obtenerSpecies,
    ObtenerSpecie,
    actualizarSpecie,
    deleteSpecie
}