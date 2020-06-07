const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Project = require('../models/projects');
const Task = require('../models/tasks');

// get a specific project
router.get('/:projectId', checkAuth, (req, res, next) => {
  const query = {
    $and: [
      { user: { $regex: req.userData.username, $options: 'i' } },
      { _id: req.params.projectId },
    ],
  };

  Project.find(query)
    .populate('tasks')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// get all the projects
router.get('/', checkAuth, (req, res, next) => {
  const query = {
    user: req.userData.username
      ? { $regex: req.userData.username, $options: 'i' }
      : null,
  };

  Project.find(query)
    .populate('tasks', 'task due done')
    .select('tasks project user')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Create a new project
router.post('/', checkAuth, (req, res, next) => {
  const { project } = req.body;
  const { username } = req.userData;
  // const query = {
  //   $and: [
  //     { user: { $regex: req.userData.username, $options: 'i' } },
  //     { project },
  //   ],
  // };

  const tempTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    task: 'temp',
    user: req.userData.username,
    due: new Date(),
    projectRelated: project,
    done: false,
  });
  Project.find({ user: username, project })
    .exec()
    .then(userResult => {
      if (userResult.length > 0) {
        return res.status(409).json({
          message: 'Project already exists',
        });
      }
      tempTask.save().then(result => {
        const newProject = new Project({
          _id: new mongoose.Types.ObjectId(),
          user: req.userData.username,
          project,
          tasks: tempTask._id,
        });

        newProject
          .save()
          .then(docs => {
            res.status(201).json(docs);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    });
});

// Delete the project
router.delete('/:projectId', checkAuth, (req, res, next) => {
  const id = req.params.projectId;
  Project.remove({ _id: id, user: req.userData.username })
    .exec()
    .then(result => res.status(200).json({ message: 'Project was deleted' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
