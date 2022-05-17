
const {response, request} = require('express');
var mongoose = require('mongoose');

const MenuOptions = require('../models/menuoptions');
const User = require('../models/user');
const SubMenuOptions = require('../models/submenuoptions');



 
const getMenuOptions = async (req = request, res = response) => {
      const querySt = {status : true}
      const userAuth = req.user._id
      const MenuOption = await User.aggregate(
        [
         
           {
              $match: {_id : userAuth}
            },
               {$project:{
              _id: 0,
              idusergroup : 1
            }},
              { 
              $graphLookup:{ 
                from:'menuoptions',
                startWith:  '$idusergroup',
                connectFromField: 'idusergroup',
                connectToField: 'idusergroup',
                restrictSearchWithMatch :{ 'status': true},
                as: 'menuoptios',
              }
            },
            {$unwind : '$menuoptios'},
            {$project: {
                    idsubmenuoptions: '$menuoptios.idsubmenuoption'          
              }},
              
              {$lookup:{
              from: 'submenuoptions',
              localField: 'idsubmenuoptions',
              foreignField: '_id',
              as: 'submenuoptions'
          }},
          {$unwind : '$submenuoptions'},
          {$project: {
            idsubmenu: '$submenuoptions.idsubmenu'          
          }},
          {$lookup:{
            from: 'submenus',
            localField: 'idsubmenu',
            foreignField: '_id',
            as: 'submenu'
          }},
          {$unwind : '$submenu'},
          {$project: {
            idmainmenu: '$submenu.idmainmenu'          
          }},
          {$lookup:{
            from: 'mainmenus',
            localField: 'idmainmenu',
            foreignField: '_id',
            as: 'mainmenu'
          }},
          {$unwind : '$mainmenu'},
          {$project: {
            idmainmenu: '$mainmenu._id', mainmenu: '$mainmenu.mainmenu', ruta: '$mainmenu.ruta', icon: '$mainmenu.icon'        
          }},
          {$group:{_id: {mainmenuid: '$idmainmenu', mainmenu:'$mainmenu', ruta: '$ruta', icon:'$icon'} }},
          {$project: {
            _id:0,
            mainmenuid: '$_id.mainmenuid', mainmenu:'$_id.mainmenu',ruta: '$_id.ruta', icon: '$_id.icon'        
          }},
          {$sort:{mainmenu: 1}},
        ]
      )
    res.json(
        {
          MenuOption,
            }
    )
  }
 
const getSubMenu = async (req = request, res = response) => {
      const querySt = {status : true}
      const userAuth = req.user._id
   
      const idmainmenuparam = mongoose.Types.ObjectId(req.params.id)
      
      const SubMenus = await User.aggregate(
        [
         
           {
              $match: {_id : userAuth}
            },
               {$project:{
              _id: 0,
              idusergroup : 1
            }},
              { 
              $graphLookup:{ 
                from:'menuoptions',
                startWith:  '$idusergroup',
                connectFromField: 'idusergroup',
                connectToField: 'idusergroup',
                restrictSearchWithMatch :{ 'status': true},
                as: 'menuoptios',
              }
            },
            {$unwind : '$menuoptios'},
            {$project: {
                    idsubmenuoptions: '$menuoptios.idsubmenuoption'          
              }},
              
              {$lookup:{
              from: 'submenuoptions',
              localField: 'idsubmenuoptions',
              foreignField: '_id',
              as: 'submenuoptions'
          }},
          {$unwind : '$submenuoptions'},
          {$project: {
            idsubmenu: '$submenuoptions.idsubmenu'          
          }},
          {$lookup:{
            from: 'submenus',
            localField: 'idsubmenu',
            foreignField: '_id',
            as: 'submenu'
          }},
          {$unwind : '$submenu'},
          {$project: {
            idmainmenu: '$submenu.idmainmenu',
            idsubmenu: '$idsubmenu',
            submenu: '$submenu.submenu',

          }},
          {$match:{idmainmenu : idmainmenuparam}},
          {$group:{ _id:{
            idmainmenu: '$idmainmenu', 
            idsubmenu: '$idsubmenu',
            submenu: '$submenu'
          }}},
          {$project:{
            _id: 0,
            // idmainmenu: '$_id.idmainmenu', 
            idsubmenu: '$_id.idsubmenu',
            submenu: '$_id.submenu'
          }},
          {$sort:{submenu: 1}},
       
        ]
      )
    res.json(
        {
          SubMenus,
            }
    )
  }
 
const getSubMenuOptions = async (req = request, res = response) => {
      const querySt = {status : true}
      const userAuth = req.user._id
     const idsubmenuparam = mongoose.Types.ObjectId(req.params.id)
     const SubMenuOptions = await User.aggregate(
        [
         
           {
              $match: {_id : userAuth}
            },
               {$project:{
              _id: 0,
              idusergroup : 1
            }},
              { 
              $graphLookup:{ 
                from:'menuoptions',
                startWith:  '$idusergroup',
                connectFromField: 'idusergroup',
                connectToField: 'idusergroup',
                restrictSearchWithMatch :{ 'status': true},
                as: 'menuoptios',
              }
            },
            {$unwind : '$menuoptios'},
            {$project: {
                    idsubmenuoptions: '$menuoptios.idsubmenuoption',          
                    status: '$menuoptios.status'          
              }},
              
              {$lookup:{
              from: 'submenuoptions',
              localField: 'idsubmenuoptions',
              foreignField: '_id',
              as: 'submenuoptions'
          }},
          {$unwind : '$submenuoptions'},
          {$project: {
            // submenuoptions: '$submenuoptions'
            idsubmenu: '$submenuoptions.idsubmenu',
            title: '$submenuoptions.title',
            ruta: '$submenuoptions.ruta',
            icon: '$submenuoptions.icon',
            status: '$status'

          }},
          {$match:{idsubmenu : idsubmenuparam}},
          {$project: {
            title: 1,
            ruta: 1,
            icon: 1,
            status: 1

          }},
          {$sort:{title: 1}},
          

        ]
      )
    res.json(
        {
          SubMenuOptions,
            }
    )
  }

  const getRoutesOptions = async (req = request, res = response) => {
  const querySt = {status : true}
  const userAuth = req.user._id
  // const idsubmenuparam = mongoose.Types.ObjectId(req.params.id)
  const NavigateOptions = await User.aggregate(
     [
      
        {
           $match: {_id : userAuth}
         },
            {$project:{
           _id: 0,
           idusergroup : 1
         }},
           { 
           $graphLookup:{ 
             from:'menuoptions',
             startWith:  '$idusergroup',
             connectFromField: 'idusergroup',
             connectToField: 'idusergroup',
            //  restrictSearchWithMatch :{ 'status': true},
             as: 'menuoptios',
           }
         },
         {$unwind : '$menuoptios'},
         {$project: {
                 idsubmenuoptions: '$menuoptios.idsubmenuoption',          
                 status: '$menuoptios.status'          
           }},
           
           {$lookup:{
           from: 'submenuoptions',
           localField: 'idsubmenuoptions',
           foreignField: '_id',
           as: 'submenuoptions'
       }},
       {$unwind : '$submenuoptions'},
       {$project: {
         // submenuoptions: '$submenuoptions'
         idsubmenu: '$submenuoptions.idsubmenu',
         title: '$submenuoptions.title',
         ruta: '$submenuoptions.ruta',
         icon: '$submenuoptions.icon',
         status: '$status'

       }},
      //  {$match:{idsubmenu : idsubmenuparam}},
       {$project: {
        //  title: 1,
         ruta: 1,
        //  icon: 1,
         status: 1

       }},
      //  {$sort:{title: 1}},
       

     ]
   )
  res.json({NavigateOptions})  
}

const putMenuOptions = async (req, res = response) => {
    
    res.json('este es el PUt de User Menu')
  }

const postMenuOptions = async (req, res = response) => {

    const data = req.body;
  


    const MenuOption = new MenuOptions(data);

    await MenuOption.save();
    res.status(201).json(
        {
                      MenuOption
        }
    )
  }

const deleteMenuOptions = async(req, res = response) => {
  res.json('este es el Delete de User Menu')
  }

  const putMenuOptionsAdminId = async(req = request, res = response) => {
    const {id} = req.params;
    const {status,...data} = req.body
    
    optionsaccess = await MenuOptions.findByIdAndUpdate(id,{status: status}, {new: true});

    


    res.json({optionsaccess});
}



  const getMenuOptionsAdmin = async(req = request, res = response) => {
    const querySt = {status : true}
    accessoptions = await SubMenuOptions.aggregate([
      {$lookup:{
        from: 'submenus',
        localField: 'idsubmenu',
        foreignField: '_id',
        as: 'suboptions'
      }},
      // {$match:{status: true}},
      {$unwind:'$suboptions'},
      {$lookup:{
        from: 'mainmenus',
        localField: 'suboptions.idmainmenu',
        foreignField: '_id',
        as: 'mainoptions'
      }},
      {$unwind: '$suboptions' },
      {$unwind: '$mainoptions' },
      {$project:{
        _id : 0,
        id: '$_id',
        mainmenu: '$mainoptions.mainmenu',
        submenu: '$suboptions.submenu',
        title : '$title',
        detail : '$detail',
        // status: '$status'
      }}
      
    ])

    res.json({
      accessoptions
    })
}


  const getMenuOptionsAdminbyID = async(req = request, res = response) => {
    const querySt = {status : true};
    const idusergroupq = mongoose.Types.ObjectId(req.params.id);
    optionsaccess = await MenuOptions.aggregate([
      {
        $match: {idusergroup : idusergroupq}
          
      },
      {$lookup:{
        from: 'submenuoptions',
        localField: 'idsubmenuoption',
        foreignField: '_id',
        as: 'options'
      }},
      {$unwind : '$options'},
      {$lookup:{
        from: 'submenus',
        localField: 'options.idsubmenu',
        foreignField: '_id',
        as: 'submenu'
      }},
      {$unwind : '$submenu'},
      {$project: {
        _id : 0,
        id: '$_id',
        idusergroup : '$idusergroup',
        groupaccess : '$submenu.submenu',
        title : '$options.title',
        detail : '$options.detail',
        status: '$status',
      }},
    ]);

    res.json({
      optionsaccess
    })
}








  module.exports = {
        //auth
        getMenuOptions,
        getSubMenu,
        getSubMenuOptions,
        getRoutesOptions,
        //Crud
        putMenuOptions,
        postMenuOptions,
        deleteMenuOptions,
        //Crud Auth Access
        getMenuOptionsAdmin,
        getMenuOptionsAdminbyID,
        putMenuOptionsAdminId
  }



  