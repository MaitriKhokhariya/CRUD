// controllers/userController.js
import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import path from 'path';
// Get all users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('name email avatar');;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};



// Create a new user
export const createUser = async (req, res) => {

  const fullPath = req.file.path;

  // Find the index where 'uploads\' starts
  const startIndex = fullPath.indexOf('uploads' + path.sep); // path.sep is \ on Windows

  let relativePath = null;
  if (startIndex !== -1) {
    // Extract the substring starting from that index
    relativePath = fullPath.substring(startIndex);
    relativePath = relativePath.replace(/\\/g, "/");

  }



  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // Remember to hash passwords in a real application!
    // avatar: req.file ? req.file.path : null,
    avatar: req.file ? relativePath : null,
  });
  console.log("Creating User with avatar:", user);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if (req.body.password != null) {
      user.password = req.body.password; // Hash passwords!
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.id); // Note: in newer Mongoose versions, use user.deleteOne() or findByIdAndDelete()
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'abcc', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};