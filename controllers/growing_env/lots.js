const { response, request } = require("express");
const {Lot} = require('../../models');
const zones = require("../../models/growing_env/zones");
var mongoose = require('mongoose');
// OBTENER Lots PAGINADO - TOTAL -  POPULATE

const getLots = async (req = request, res = response)=>{

    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true};

    const [Lots, totalLots] = await Promise.all([

            Lot.find()            
            .skip(Number(init))
            .limit(Number(limit)),
            Lot.countDocuments()]
    )

    res.status(200).json({
        totalLots,
        Lots
    })

}

// OBTENER SOLO UNA Lot CON POPULATE

const getLotbyId = async (req, res)=>{

        const {id} = req.params;
        const LotId = await Lot.findById(id).populate('user','nombre')

       res.status(200).json({
          LotId
       })


}
const getLotbyIdZone = async (req, res)=>{
        const {id} = req.params;
        const zonelots = await Lot.find({idzone: id})

       res.status(200).json({
        zonelots
       })
}

const getLotbyIdFarm = async (req, res)=>{
        const idfarm =  mongoose.Types.ObjectId(req.farm.id);
        const zonelots = await Lot.aggregate(
            [
                {
                    $lookup:{
                        from : 'zones',
                        foreignField: '_id',
                        localField: 'idzone',
                        as: 'idzone'                        
                    }
                },
                {$unwind : '$idzone'},
                {$match: {'idzone.idfarm' : idfarm, status: true},},
                {$project :{
                    _id : 1,
                    nombre : 1,
                    meters : 1,
                    idzone : '$idzone._id',
                    user : 1,
                    status : 1
                }}

            ]
        )

       res.status(200).json({
        zonelots
       })
}



const newLot = async (req, res = response)=>{
        
    const {status, ...data} = req.body;   
    
    data.nombre = data.nombre.toUpperCase();
    data.user = req.user._id;
    nombre = data.nombre
    
        // const LotDB = await Lot.findOne({nombre});
        // if(LotDB){
        //    return res.status(400).json({
        //         msg: `la Lot ${LotDB.nombre} ya existe`
        //     });
        // }

    

        const lot = new Lot(data);

        // guardar

        await lot.save();

        res.status(200).json(lot);

}

// update Lot

const updateLot = async(req, res = response)=>{
    const {id} = req.params;
    
        const{status, user, ...data} = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
  
        const actualizaLot = await Lot.findByIdAndUpdate(id, data,{new:true});

        res.status(200).json(actualizaLot);

}

// BORRAR Lot - ESTADO A FALSE

const deleteLot = async (req, res=response)=>{
    const {id} = req.params;
    const {status,...data} = req.body
    if (status == null){
    const deleteLot = await Lot.findByIdAndUpdate(id, {status:false},{new: true});
    res.status(200).json(deleteLot);
    }else{
        const deleteLot = await Lot.findByIdAndUpdate(id, {status:status},{new: true});
        res.status(200).json(deleteLot);
    }

}

module.exports = {
    newLot,
    getLots,
    getLotbyId,
    getLotbyIdZone,
    getLotbyIdFarm,
    updateLot,
    deleteLot
}