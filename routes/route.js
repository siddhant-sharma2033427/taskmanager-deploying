import express from "express";
const route = express.Router();
import { body, validationResult } from "express-validator"

//importing middleware for validating user
import fetchuser from "../middleware/fetchuser.js";
//importing controller from usercontroller js
import {NewUser,UserLogin,GetUser} from "../controller/userController.js"
//importing controller from taskcontroller
import {AllTask,AddTask,UpdateTask,DeleteTask} from '../controller/taskController.js'

// ROUTE 1: Create a User using: POST "/createuser". No login required
route.post('/createUser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"enter a vlid email").isEmail(),
    body('password',"password must be atleast 5 characters").isLength({min:5}),
],NewUser)

// ROUTE 2: Authenticate a User using: POST "/login". No login required
route.post('/login',[
    body('email',"enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({min:5})
],UserLogin)

// ROUTE 3: Get loggedin User Details using: POST "/getuser". Login required
route.get('/getUser',fetchuser,GetUser);


//Routs For task
//ROUTE 4: Fetching all the task using GET "/AllTasks". Login required
route.get('/AllTask',fetchuser,AllTask);

// ROUTE 5: Adding task using POST "/AddTask". Login required
route.post('/AddTask',fetchuser,AddTask);

//ROUTE 6: Updating task using PUT: "/UpdateTask". Login required
route.put('/UpdateTask/:id',fetchuser,UpdateTask);

//ROUTE 7: Deleting task using DELETE: "/DeleteTask". Login required
route.delete('/DeleteTask/:id',fetchuser,DeleteTask);
export default route;