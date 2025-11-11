import express from "express";

// import User from "../models/User.js";

const router = express.Router();
import authMiddleware from '../middlewares/auth.js'; // Assuming auth.js is in a 'middleware' folder

// // GET route with error handling
// router.get("/retrieveData", async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

import { getAllUsers, getUserById, updateUser, createUser, deleteUser, Login } from "../controller/User.controller.js"
import upload from '../middlewares/uploadMiddleware.js';

// Get all users
router.get('/', getAllUsers);   // get all  user

// Get a single user
router.get('/user_id', authMiddleware, getUserById);   // get ID user

// Create a new user
router.post('/register', upload.single('avatar'), createUser);  // register new user 

// Update a user
router.put('/:id', updateUser);   //  update user 

// Delete a user
router.delete('/:id', deleteUser);  //   delete user 

router.post('/login', Login);


export default router;
