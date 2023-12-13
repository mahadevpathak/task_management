// controllers/taskController.js
const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(`Error getting ${status} tasks:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTask = async (req, res) => {
  const { title, status } = req.body;

  try {
    const newTask = await Task.create({ title, status });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTasks,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
};
