const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task: { type: String, required: true },
  user: { type: String, required: true },
  due: { type: Date, required: true },
  projectRelated: { type: String, required: true },
  done: { type: Boolean, required: true },
});

module.exports = mongoose.model('Task', taskSchema);
