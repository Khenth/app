const { response, request } = require("express");
const {Zone} = require('../../models')
var mongoose = require('mongoose');
// OBTENER Zones PAGINADO - TOTAL -  POPULATE

const getZones = async (req = request, res = response)=>{

    const {limit = 5, init = 0} = req.query;
    const querySt = {status : true};

    const [Zones, totalZones] = await Promise.all([

            Zone.find()            
            .skip(Number(init))
            .limit(Number(limit)),
            Zone.countDocuments()]
    )

    res.status(200).json({
        totalZones,
        Zones
    })

}

// OBTENER SOLO UNA Zone CON POPULATE

const getZonebyId = async (req, res)=>{

    const id = mongoose.Types.ObjectId(req.params.id);
        const ZoneId = await Zone.aggregate(
            [
                {$match:{ _id : id}},
        
                { 
                    $graphLookup:{ 
                      from:'lots',// desde que coleccion
                      startWith:  '$_id',// id local
                      connectFromField: '_id',// id local
                      connectToField: 'idzone',// id foranea
                      restrictSearchWithMatch :{ 'status': true},// filtro
                      as: 'lots',// renobre
                    }
                  },
              {$project:{
                _id:1 ,
                nombre: 1,
                status: 1,
                inside:1,
                user: 1,
                idfarm : 1,
                meters : {$sum: '$lots.meters'}
              }},{
                $lookup:{
                    from: 'farms',
                    localField: 'idfarm',
                    foreignField: '_id',
                    as: 'idfarm'
                }
              },
              {$unwind: '$idfarm'},
              {
                  $project : {
                        '_id' : 1,
                        'nombre': 1,
                        'status': 1,
                        'inside' : 1,
                        'user':1,
                      'idfarm._id':1,
                      'idfarm.nombre':1,
                      'meters':1

                  }
              }

            ]
        )
    const zone = ZoneId[0]
         if(zone == null){
           return res.status(400).json({
                msg: 'Zona no Existe'
            });
        }

       res.status(200).json(
          zone
       )


}

const getZonebyIdFarm = async (req, res)=>{
    // const {id} = req.params;
    // const zones = await Zone.find({idfarm : id}).populate('idfarm','nombre')

        const id = mongoose.Types.ObjectId(req.params.id);

        const zones = await Zone.aggregate(
            [
                {$match:{ idfarm : id}},
        
                { 
                    $graphLookup:{ 
                      from:'lots',// desde que coleccion
                      startWith:  '$_id',// id local
                      connectFromField: '_id',// id local
                      connectToField: 'idzone',// id foranea
                      restrictSearchWithMatch :{ 'status': true},// filtro
                      as: 'lots',// renobre
                    }
                  },
              {$project:{
                _id:1 ,
                nombre: 1,
                status: 1,
                inside:1,
                user: 1,
                idfarm : 1,
                meters : {$sum: '$lots.meters'}
              }},{
                $lookup:{
                    from: 'farms',
                    localField: 'idfarm',
                    foreignField: '_id',
                    as: 'idfarm'
                }
              },
              {$unwind: '$idfarm'},
              {
                  $project : {
                        '_id' : 1,
                        'nombre': 1,
                        'status': 1,
                        'inside' : 1,
                        'user':1,
                      'idfarm._id':1,
                      'idfarm.nombre':1,
                      'meters':1

                  }
              }

            ]
        )

       res.status(200).json({
          zones
       })


}



const newZone = async (req, res = response)=>{
       const{status, ...data} = req.body;
       
        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
        // const zoneDB = await Zone.findOne({'nombre': data.nombre}).populate('idfarm', 'nombre');
        // if(zoneDB){
        //    return res.status(400).json({
        //         msg: `la Zone ${zoneDB.nombre} ya existe`
        //     });
        // }
        //generar la informacion para el modelo
        const newzone = new Zone(data);
        // guardar
        await newzone.save();

       const {_id} = newzone
       const zone = await Zone.findById(_id).populate('idfarm', 'nombre')


        res.status(200).json(zone);

}

// update Zone

const updateZone = async(req, res = response)=>{
    const {id} = req.params;   
        const{status, user, ...data} = req.body;
        data.nombre = data.nombre.toUpperCase();
        data.user = req.user._id;
        const actualizaZone = await Zone.findByIdAndUpdate(id, data,{new:true}).populate('idfarm', 'nombre');

        res.status(200).json(actualizaZone);

}

// BORRAR Zone - ESTADO A FALSE

const deleteZone = async (req, res=response)=>{
    const {id} = req.params;
    const {status,...data} = req.body
    if (status == null){
    const deleteZone = await Zone.findByIdAndUpdate(id, {status:false},{new: true});
    res.status(200).json(deleteZone);
    }else{
        const deleteZone = await Zone.findByIdAndUpdate(id, {status:status},{new: true});
        res.status(200).json(deleteZone);
    }

}

module.exports = {
    newZone,
    getZones,
    getZonebyId,
    getZonebyIdFarm,
    updateZone,
    deleteZone,
}