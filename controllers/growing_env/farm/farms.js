const { response, request } = require("express");
const {Farm} = require('../../../models')

// OBTENER Farms PAGINADO - TOTAL -  POPULATE

const getFarms = async (req = request, res = response)=>{

    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true};

    const [Farms, totalFarms] = await Promise.all([

            Farm.find(),            
            // .skip(Number(init))
            // .limit(Number(limit)),
            Farm.countDocuments()]
    )

    res.status(200).json({
        totalFarms,
        Farms
    })

}

// OBTENER SOLO UNA Farm CON POPULATE

const getFarmbyId = async (req, res)=>{

        const {id} = req.params;
        const FarmId = await Farm.findById(id).populate('user','nombre')

       res.status(200).json({
          FarmId
       })


}



const newFarm = async (req, res = response)=>{

        const nombre = req.body.nombre.toUpperCase();
         
        const farmDB = await Farm.findOne({nombre});

        if(farmDB){
           return res.status(400).json({
                msg: `la Farm ${farmDB.nombre} ya existe`
            });
        }

        //generar la informacion para el modelo
        const data = {
            nombre,
            user: req.user._id
        }

        const farm = new Farm(data);

        // guardar

        await farm.save();

        res.status(200).json(farm);

}

// update Farm

const updateFarm = async(req, res = response)=>{
    const {id} = req.params;
    
        const{status, user, ...data} = req.body;
    

        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
  
        const updateFarm = await Farm.findByIdAndUpdate(id, data,{new:true});

        res.status(200).json(updateFarm);

}

// BORRAR Farm - ESTADO A FALSE

const deleteFarm = async (req, res=response)=>{
    const {id} = req.params;
    const {status,...data} = req.body
    if (status == null){
    const deleteFarm = await Farm.findByIdAndUpdate(id, {status:false},{new: true});
    res.status(200).json(deleteFarm);
    }else{
        const deleteFarm = await Farm.findByIdAndUpdate(id, {status:status},{new: true});
        res.status(200).json(deleteFarm);
    }

}

module.exports = {
    newFarm,
    getFarms,
    getFarmbyId,
    updateFarm,
    deleteFarm
}