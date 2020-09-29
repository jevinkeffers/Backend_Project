//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// bringing in data from each model
const projectModel = require('../models/projectModel');


router.get("/",async (request,response)=>{
    const userid = request.session.user_id; 
    let projectData = await projectModel.getAll(userid);

    //Filtering through data recieved from the model to remove null from rendering in the view
    for(let i = 0;i<projectData.length;i++){
        if (projectData[i].name == null){
            projectData[i].name = '';
        }
    }
    response.render("template",{
        locals: {
            title: "Project",
            data: projectData,
            is_logged_in: request.session.is_logged_in
        },
        //This is the actual view
        partials:{
            partial:"partial-projects"
            
        }
    })
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    const userid = request.session.user_id; 
    const projectName = request.body.projectTitle;
    const projectDescription = request.body.projectDesc;
    const project_id = request.body.Project_id;
    // const project_id = request.body.id;
    console.log(">>>>>>",request.body);

    await projectModel.currentProjectNumber(project_id);
    await projectModel.currentuserID(userid);
    await projectModel.submitProject(userid,projectName,projectDescription);
    projectData = await projectModel.getAll(userid);
    
    //response.redirect("/projects")
    if(projectName == undefined){
        response.redirect("/todo")
    }else{
        response.redirect("/projects")
    }
    
})


//exporting out of the router
module.exports = router;