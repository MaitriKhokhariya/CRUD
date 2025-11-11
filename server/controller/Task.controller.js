import Task from '../models/Task.js'

// Create a new user
export const createTasks = async (req, res) => {
  // console.log("reqq  user",req.user.id)
  // const {userId}=req.user.id;
  const { title, description ,status} = req.body;

  const task = new Task({ title, description,status, userId: req.user.id });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    // findByIdAndUpdate takes three arguments:
    // 1. The ID of the document to update
    // 2. The update object (req.body contains the fields to be updated)
    // 3. Options object: { new: true } returns the updated document, not the original [1].
    //    { runValidators: true } ensures that Mongoose schema validators are applied during the update.

    const userId = req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({
        success: false,
        error: "task not found"
      })
    }

    if (task.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        error: " not  authorize to update task "
      })
    }


    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      // If no task is found with that ID, findByIdAndUpdate returns null [2].
      return res.status(404).json({ message: 'Task not found' });
    }

    // In a real application, if you have sensitive data like a password in req.body
    // you might want to hash it before passing it to findByIdAndUpdate or handle it
    // with Mongoose pre-save hooks on the schema.

    res.status(200).json(updatedTask);
  } catch (error) {
    // Catches validation errors (if runValidators: true is used) or cast errors (invalid ID format)
    res.status(400).json({ message: error.message });
  }
};
// Delete a user
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskone = await Task.findById(req.params.id);
    if (!taskone) {
      return res.status(400).json({
        success: false,
        error: "task not found"
      })
    }

    if (taskone.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        error: " not  authorize to update task "
      })
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }
    await Task.findByIdAndDelete(req.params.id); // Note: in newer Mongoose versions, use user.deleteOne() or findByIdAndDelete()
    res.status(200).json({ message: 'task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllTaskByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "user not found"
      })
    }
    const tasks = await Task.find({userId});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controller/taskController.js
export const getAllTaskByUser1 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Extract query parameters
    const { page = 1, limit = 5, status, search } = req.query;

    // Build filter object
    const filter = { userId };
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Get filtered + paginated tasks
    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,
      tasks,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
