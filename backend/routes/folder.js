const express = require('express')
const router = express.Router()


const Folder = require('../models/Folder')
// create
router.post('/',(req,res)=>{
    const newFolder = {
        name: req.body.name
    }
    console.log('new folder')
    console.log(newFolder)

    Folder.findOne({
        name: req.body.name
    })
    .then(folder =>{
        //checking if folder name exist
        if(!folder){
            Folder.create(newFolder)
            .then(folder=>res.send("folder created" + newFolder.name))
            .catch(err=>res.send(err))
            res.json({msg :"folder created success"})
        }
        else{
            res.json({msg :"folder with that name already exist"})
        }
    })
    .catch(err=>res.send(err))
    
})
// display
router.get('/',(req,res)=>{
    Folder.find()
    .then(folder=>res.json(folder))
    .catch(err=>res.send(err))
})

// delete 
router.delete('/:id', (req,res) =>{
    Folder.findByIdAndRemove(req.params.id, (err, data) => {
        console.log("deleted");
    })
    .then(() => { res.json("successfully deleted") })
    .catch(() => { res.json("error")})
})



module.exports = router