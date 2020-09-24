//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const todoModel = require('../models/todoModel');


router.get("/",async (request,response)=>{
  
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    
    // console.log("request body from the todolist  -->>> ", request.body)
    // Defining keys from the request body
    const entryDelete = request.body.Delete;
    const entryProgress = request.body.Progress;
    const entryBack = request.body.Back;

    // This is how we will decide what to do when the form is submitted from todolist view
    if(entryDelete != undefined ){
        //delete the entry 
        console.log("we will delete id: ",entryDelete)
        const taskID = entryDelete;
        let todoModelData = await todoModel.deleteOne(taskID);
    }
    if(entryProgress != undefined){
        // progress the entry
        console.log("we will progress id: ",entryProgress)
        const taskID = entryProgress;
        todoModelData = await todoModel.progressOne_completed(taskID);
    }
    if (entryBack != undefined) {
        // back the entry
        console.log("we will back id: ",entryBack)
        const taskID = entryBack;
        todoModelData = await todoModel.backOne_intesting(taskID);
    }
    
    
    response.redirect("/todo")
    
})


//exporting out of the router
module.exports = router;