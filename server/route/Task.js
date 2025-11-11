import express from "express"; 
const router = express.Router();
import authMiddleware from '../middlewares/auth.js'; // Assuming auth.js is in a 'middleware' folder
import { createTasks ,updateTask,deleteTask,getAllTaskByUser ,getAllTaskByUser1 } from "../controller/Task.controller.js"

// Create a new user
router.post('/createTasks',authMiddleware, createTasks);  // crate new task 

// // Get all users
router.get('/', authMiddleware,getAllTaskByUser);   // get all  user
router.get('/tasks', authMiddleware,getAllTaskByUser1);   // get all  user

// // Get a single user
// router.get('/:id', authMiddleware, getUserById);   // get ID user



// // Update a user
router.put('/:id',authMiddleware, updateTask);   //  update user 

// // Delete a user
router.delete('/:id',authMiddleware, deleteTask);  //   delete user 



// router.post('/login', Login);


export default router;
