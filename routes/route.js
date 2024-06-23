import express from "express";
const route = express.Router();
import { body, validationResult } from "express-validator"

//importing middleware for validating user
import fetchuser from "../middleware/fetchuser.js";
//importing controller from usercontroller js
import {NewUser,UserLogin,GetUser} from "../controller/userController.js"
//importing controller from taskcontroller
import {AllTask,AddTask,UpdateTask,DeleteTask} from '../controller/taskController.js'

// ROUTE 1: Create a User using: POST "/api/createuser". No login required
route.post('/api/createUser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"enter a vlid email").isEmail(),
    body('password',"password must be atleast 5 characters").isLength({min:5}),
],NewUser)

// ROUTE 2: Authenticate a User using: POST "/api/login". No login required
route.post('/api/login',[
    body('email',"enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({min:5})
],UserLogin)

// ROUTE 3: Get loggedin User Details using: POST "/api/getuser". Login required
route.get('/api/getUser',fetchuser,GetUser);


//Routs For task
//ROUTE 4: Fetching all the task using GET "/api/AllTasks". Login required
route.get('/api/AllTask',fetchuser,AllTask);

// ROUTE 5: Adding task using POST "/api/AddTask". Login required
route.post('/api/AddTask',fetchuser,AddTask);

//ROUTE 6: Updating task using PUT: "/api/UpdateTask". Login required
route.put('/api/UpdateTask/:id',fetchuser,UpdateTask);

//ROUTE 7: Deleting task using DELETE: "/api/DeleteTask". Login required
route.delete('/api/DeleteTask/:id',fetchuser,DeleteTask);
export default route;