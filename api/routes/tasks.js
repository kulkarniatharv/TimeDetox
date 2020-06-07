const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Task = require('../models/tasks');
const Project = require('../models/projects');

// Get particular task by id
router.get('/:taskId', checkAuth, (req, res, next) => {
  const query = {
    $and: [
      { user: { $regex: req.userData.username, $options: 'i' } },
      { _id: req.params.taskId },
    ],
  };
  Task.find(query)
    .exec()
    .then(doc => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No task found for the given ID.' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get all tasks
router.get('/', checkAuth, (req, res, next) => {
  const query = {
    user: req.userData.username
      ? { $regex: req.userData.username, $options: 'i' }
      : null,
  };
  Task.find(query)
    .select('_id task user due projectRelated done')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        tasks: docs.map(doc => ({
          id: doc._id,
          task: doc.task,
          due: doc.due,
          project: doc.projectRelated,
          done: doc.done,
          url: {
            request: {
              type: 'GET',
              url: `/tasks/${doc._id}`,
            },
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Create a new product
router.post('/', checkAuth, (req, res, next) => {
  const { task, due, project, done } = req.body;

  const projectQuery = {
    $and: [
      { user: { $regex: req.userData.username, $options: 'i' } },
      { project },
    ],
  };

  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    task,
    user: req.userData.username,
    due,
    projectRelated: project,
    done,
  });

  // finding the project to push this task
  Project.find(projectQuery)
    .exec()
    .then(doc => {
      console.log(doc);
      doc[0].tasks.push(newTask._id);
      console.log('Added to Project', doc);
      Project.update(projectQuery, { $set: doc[0] })
        .then(UpdateResult => {
          console.log(UpdateResult);
          newTask
            .save()
            .then(result => {
              res.status(201).json({
                _id: result._id,
                task: result.task,
                user: result.user,
                due: result.due,
                project: result.projectRelated,
                done: result.done,
                url: {
                  request: {
                    type: 'GET',
                    url: `/tasks/${result._id}`,
                  },
                },
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete a particular task by providing the taskId
router.delete('/:taskId', checkAuth, (req, res, next) => {
  const id = req.params.taskId;
  Task.remove({ _id: id, user: req.userData.username })
    .exec()
    .then(result => res.status(200).json({ message: 'Task was deleted' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete('/', checkAuth, (req, res, next) => {
  Task.remove({ user: req.userData.username })
    .exec()
    .then(result => res.status(200).json({ message: 'Task was deleted' }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update a task
router.patch('/:taskId', checkAuth, (req, res, next) => {
  const id = req.params.taskId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Task.update({ _id: id, user: req.userData.username }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(201).json({
        message: 'Product updated',
        url: {
          request: {
            type: 'GET',
            url: `/tasks/${id}`,
          },
        },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
