const { response, request } = require("express");
const { Variety } = require("../models");



const obtenerVarieties = async (req = request,res=response)=>{

    const {init=0, limit=5}= req.query;
    const querySt = {status: true};

    const [totalVarieties, varieties] = await Promise.all([
        Variety.countDocuments(querySt),
        Variety.find(querySt)
        // .populate('user','nombre')
        // .populate('idspecie','nombre')
        .skip(init)
        .limit(limit)
    ])

    res.json({
        totalVarieties,
        varieties
    })

}
const getVarietiesBySpecie = async (req = request,res=response)=>{
    const {id} = req.params
    const specie = {idspecie : id}
    const {init=0, limit=10}= req.query;
    // const querySt = {status: true};


    const [totalVarieties, varieties] = await Promise.all([
        Variety.countDocuments(specie),
        Variety.find(specie)
        // .populate('user','nombre')
        // .populate('idspecie','nombre')
        .skip(init)
        .limit(limit)
    ])

    res.json({
        totalVarieties,
        varieties
    })

}

const obtenerVariety = async (req, res=response)=>{

   const {id} = req.params;

   const varietyExiste = await Variety.findById(id)
                                .populate('user','nombre')
                                .populate('idspecie','nombre');

   res.json(varietyExiste);

}


const crearVariety = async (req =request, res = response)=>{

    const {id,status,...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.color = data.color.toUpperCase();
    data.user = req.user._id;

    const nombre = data.nombre
   
      varietiesDB = await Variety.findOne({nombre});

    if(varietiesDB){
        return res.status(400).json({
            msg: `La Variedad ${varietiesDB.nombre} ya existe`
        });
    }

    const vatiery = new Variety(data);

    await vatiery.save();

    res.status(200).json(vatiery);
}

const actualizarVariety = async (req, res = response)=>{
    const {id}= req.params;
    const {status,...data}= req.body;

    data.nombre = data.nombre.toUpperCase();
    data.color = data.color.toUpperCase();
    data.user = req.user._id;

    const actualizaVariety = await Variety.findByIdAndUpdate(id,data,{new: true})
    
    res.status(200).json(actualizaVariety);


}

const deleteVariety = async (req, res = response)=>{

    const {id} = req.params;
    const {status,...data} = req.body;

    if(status == null){
        const deleteVariety = await Variety.findByIdAndUpdate(id,{status:false}, {new:true});
        res.json(deleteVariety);
    }
    const deleteVariety = await Variety.findByIdAndUpdate(id,{status:status}, {new:true});
    res.json(deleteVariety);



}


module.exports = {
    obtenerVarieties,
    obtenerVariety,
    getVarietiesBySpecie,
    crearVariety,
    actualizarVariety,
    deleteVariety
}