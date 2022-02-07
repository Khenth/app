
const {response, request} = require('express');


 
const getUser =  (req = request, res = response) => {
    const query = req.query;
    res.json(
        {
            "msg" : "get api - controller", 
            query
        }
    )
  }

const putUser = (req, res = response) => {
    id = req.params.id;
    res.json(
        {
            "msg" : "put api" ,
            id
        }
    )
  }

const postUser = (req, res = response) => {
    const body = req.body;
    res.status(201).json(
        {
            "msg" : "post api - controller", 
            body
        }
    )
  }

const deleteUser = (req, res = response) => {
    res.json(
        {
            "msg" : "delete api -controller " 
        }
    )
  }

const patchUser = (req, res = response) => {
    res.json(
        {
            "msg" : "patch api - controller" 
        }
    )
  }

  module.exports = {
        getUser,
        putUser,
        postUser,
        deleteUser,
        patchUser
  }