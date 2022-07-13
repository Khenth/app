const { response, request } = require("express");
const {FarmCropHarvest, Lot} = require('../../models')
const moment = require('moment');
// OBTENER Lots PAGINADO - TOTAL -  POPULATE

const getFarmCropHarvests = async (req = request, res = response)=>{
    const idfarm = req.farm._id; 
    const dateinit = req.query.dateinit;
    const datefin = req.query.datefin;
    const querySt = {status : true};

    const [FarmCropHarvests, totalFarmCropHarvests] = await Promise.all([
          FarmCropHarvest.aggregate([
            {
                $match : { $and: [{idfarm : idfarm}, {date :{$gte : dateinit}},{date :{$lte : datefin}}] } 
            },
            {$lookup:{
                from : 'lots',
                foreignField : '_id',
                localField : 'idlot',
                as: 'idlot'
            }},
            {$unwind : '$idlot'},
            {$lookup:{
                from : 'varieties',
                foreignField : '_id',
                localField : 'idvariety',
                as: 'idvariety'
            }},
            {$unwind : '$idvariety'},
            {$project:{
                _id : 0,
                id : '$_id',
                idvariety : '$idvariety._id',
                variety : '$idvariety.nombre',
                idspecie : '$idvariety.idspecie',
                manejo : '$idvariety.manejo',
                idlot : '$idlot._id',
                lot : '$idlot.nombre',
                mesh : '$mesh',             
                stems : '$stems',
                weight : '$weight',
                date : '$date',
                datecreate: '$datecreate',
                iduser : '$user'    
            }},
            {
                $lookup:{
                    from:'users',
                    localField: 'iduser',
                    foreignField : '_id',
                    as:'iduser'
                }
            },
            {
                $lookup:{
                    from:'species',
                    localField: 'idspecie',
                    foreignField : '_id',
                    as:'idspecie'
                }
            },
            {
               
                $unwind:'$idspecie'
            },
            {
               
                $unwind:'$iduser',
            },
            {
                $project:{
                id : '$id',
                idvariety : '$idvariety',
                variety : '$variety',
                idspecie : '$idspecie._id',
                specie : '$idspecie.nombre',
                manejo : '$manejo',
                idlot : '$idlot',
                lot : '$lot',
                mesh : '$mesh',
                stems : '$stems',
                weight : '$weight',
                date : '$date',
                datecreate: '$datecreate',
                user : '$iduser.name',
                }
            },
            
        ]),            
            // .skip(Number(init))
            // .limit(Number(limit)),
        FarmCropHarvest.countDocuments()]
    )

    res.status(200).json({
        totalFarmCropHarvests,
        FarmCropHarvests
    })

}

// OBTENER SOLO UNA Lot CON POPULATE

const getFarmCropHarvestbyId = async (req, res)=>{
        const {id} = req.params;
        const LotId = await Lot.findById(id).populate('user','nombre')
       res.status(200).json({
          LotId
       })


}



const newFarmCropHarvest = async (req, res = response)=>{       
    const {status, ...data} = req.body; 
    const dateNow = Date();
    data.user = req.user._id;
    data.idfarm = req.farm._id;
    data.date = moment(data.date).format('yyyy-MM-DD');
    console.log(data.date)
    data.datecreate = moment().format();
        const harvest = new FarmCropHarvest(data);
        // guardar
        await harvest.save();
        res.status(200).json(harvest);

}

// update Lot

const updateFarmCropHarvest = async(req, res = response)=>{
    const {id} = req.params;
        const{status, user, ...data} = req.body;
        data.user = req.user._id;
        const harvest = await FarmCropHarvest.findByIdAndUpdate(id, data,{new:true});
        res.status(200).json(harvest);

}

// BORRAR Lot - ESTADO A FALSE

const deleteFarmCropHarvest = async (req, res=response)=>{
    try {
        const {id} = req.params;
        const deleteFarmCropHarvest = await FarmCropHarvest.findByIdAndDelete(id);
        if(!deleteFarmCropHarvest)res.status(404).send("No item found")
        res.status(200).send({});
        
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    newFarmCropHarvest,
    getFarmCropHarvests,
    getFarmCropHarvestbyId,
    // getLotbyIdZone,
    updateFarmCropHarvest,
    deleteFarmCropHarvest
}