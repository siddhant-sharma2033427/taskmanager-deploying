import Task from "../models/Task.js";
import { validationResult } from "express-validator";

export const AllTask = async (req,res)=>{
    try {
        //extracting all user task based on user id which we will get from middleware
        const tasks=await Task.find({user:req.user.id});
        res.json(tasks);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}

export const AddTask = async (req,res)=>{
    try {
        const {title,description,status,dueDate} = req.body;
        //checking user details based on conditions in routes
        console.log("middddle ware",req.user.id);
        const task = await Task.create({
            title,description,status,dueDate,user:req.user.id
        })
        console.log(task);
        // const savedTask = await task.save();
        return res.json(task);
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error");
    }
}

export const UpdateTask = async (req,res)=>{
    try {
        console.log("update",req.body);
        //extracting all the values from request body
        const {title,description,status,dueDate} = req.body;
        //creating new Task object
        const newTask ={};

        //adding values to object
        if(title){newTask.title=title};
        if(description){newTask.description=description};
        if(status){newTask.status=status};
        if(dueDate){newTask.dueDate=dueDate};

        //finding the note to be updated and update it 
        let task = await Task.findById(req.params.id);
        if(!task){return res.status(404).send("Task not found ")};
        console.log(task.user.toString(),req.user.id)
        if(task.user.toString() !== req.user.id){
            return res.status(401).send("not allowed");
        }
        task = await Task.findByIdAndUpdate(req.params.id,{$set:newTask},{new:true});
        res.json({task});

    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
}

export const DeleteTask = async(req,res)=>{
    try {
        //find task to be deleted
        let task = await Task.findById(req.params.id);
        if(!task){return res.status(404).send("not found")}

        //allow deletion only if user owns this task
        if(task.user.toString() !==  req.user.id){
            return res.status(401).send("Not allowed");
        }

        task = await Task.findByIdAndDelete(req.params.id);
        res.json({"success":true, task:task});

    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
}