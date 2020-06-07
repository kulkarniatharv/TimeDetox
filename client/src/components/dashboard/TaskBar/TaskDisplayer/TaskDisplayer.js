import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import $ from 'jquery';
import './TaskDisplayer.css';
import auth from '../../../../Auth';

const TaskDisplayer = props => {
  const { tasks, project, remove } = props;

  auth.authenticated = true;
  const token = auth.getJWT();

  useEffect(() => {
    $.fn.slideFadeToggle = function(speed, easing, callback) {
      return this.animate(
        { opacity: 'toggle', height: 'toggle' },
        speed,
        easing,
        callback
      );
    };

    $('.deleteList li .delete').on('click', function(e) {
      $(this).addClass('active hover');
      const line = $('<div />').addClass('line');
      const li = $(this).parent();
      const span = $(this)
        .parent()
        .children('span:first-child');
      setTimeout(function() {
        li.append(line);
        line.css('right', li.width() - span.width() - 28 + 6);
        line.animate(
          {
            width: span.width() + 22,
          },
          400,
          function() {
            li.addClass('beforeSlice');
            line
              .css({
                left: 0,
                right: 'auto',
              })
              .animate(
                {
                  width: 0,
                },
                200,
                function() {
                  li.addClass('slice');
                  setTimeout(function() {
                    li.slideFadeToggle(300, function() {
                      li.remove();
                    });
                  }, 500);
                }
              );
          }
        );
      }, 200);
    });
  });

  let filteredTasks = tasks.filter(task => {
    console.log(task.task);
    return task.task !== 'temp';
  });

  filteredTasks = tasks.map(task => (
    <li key={task._id} className="list-items">
      <span style={{ color: 'white' }}>
        {task.task} <br /> Due: {task.due.slice(0, 10)}
      </span>

      <div className="delete">
        <svg viewBox="0 0 22 22">
          <a href="#" onClick={() => remove(task._id, token)}>
            <circle cx="11" cy="11" r="10" />
          </a>
        </svg>
      </div>
    </li>
  ));

  return (
    <div className="displayer">
      <h3 className="project-heading">{project}</h3>

      <ul className="deleteList">{filteredTasks}</ul>
    </div>
  );
};

TaskDisplayer.propTypes = {
  tasks: PropTypes.array,
  project: PropTypes.string,
  remove: PropTypes.func,
};

export default TaskDisplayer;
