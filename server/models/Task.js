// models/User.js
import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'todo', 'done'], // Enum defining allowed values
        required: true,
        default: "pending"
    },
    userId: {
         required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // References the 'User' model
    }
});

const User = mongoose.model('Task', TaskSchema);

export default User;

