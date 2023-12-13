// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['incomplete', 'in-progress', 'completed'], default: 'incomplete' },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
