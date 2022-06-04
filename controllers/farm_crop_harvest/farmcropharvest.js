const { response, request } = require("express");
const {FarmCropHarvest} = require('../../models')
const moment = require('moment');
// OBTENER Lots PAGINADO - TOTAL -  POPULATE

const getFarmCropHarvests = async (req = request, res = response)=>{

    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true};

    const [FarmCropHarvests, totalFarmCropHarvests] = await Promise.all([

        FarmCropHarvest.find()            
            .skip(Number(init))
            .limit(Number(limit)),
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
// const getLotbyIdZone = async (req, res)=>{
//         const {id} = req.params;
//         const zonelots = await Lot.find({idzone: id})

//        res.status(200).json({
//         zonelots
//        })


// }



const newFarmCropHarvest = async (req, res = response)=>{       
    const {status, ...data} = req.body;   
    data.user = req.user._id;
    data.datecreate = moment();

    // console.log(moment(data.date, 'DD/MM/YYYY', true)) 
    // console.log(data.date) 
    // console.log(moment("12/25/1995", "MM-DD-YYYY")) 
    // console.log(moment('01/12/2016', 'DD/MM/YYYY', true).format()) 
        // const LotDB = await Lot.findOne({nombre});
        // if(LotDB){
        //    return res.status(400).json({
        //         msg: `la Lot ${LotDB.nombre} ya existe`
        //     });
        // }
        const harvest = new FarmCropHarvest(data);
        // guardar
        await harvest.save();
        res.status(200).json(harvest);

}

// update Lot

const updateFarmCropHarvest = async(req, res = response)=>{
    const {id} = req.params;
    
        const{status, user, ...data} = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
  
        const actualizaLot = await Lot.findByIdAndUpdate(id, data,{new:true});

        res.status(200).json(actualizaLot);

}

// BORRAR Lot - ESTADO A FALSE

const deleteFarmCropHarvest = async (req, res=response)=>{
    const {id} = req.params;
    const {status,...data} = req.body
    if (status == null){
    const deleteFarmCropHarvest = await Lot.findByIdAndUpdate(id, {status:false},{new: true});
    res.status(200).json(deleteFarmCropHarvest);
    }else{
        const deleteFarmCropHarvest = await Lot.findByIdAndUpdate(id, {status:status},{new: true});
        res.status(200).json(deleteFarmCropHarvest);
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