/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { setTodo, editTodo, deleteTodo, editTodoStatus } from '../../redux/actions/todo';
import Form from './Form';
import FilterButton from './FilterButton';
import Todo from './Todo';
import { nanoid } from 'nanoid';

import './todo.css';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Main = (props) => {
  console.log('propsprops', props.todo.data);
  const tasks = props?.todo?.data;
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    props.editTodoStatusHandler(id);
  }

  function deleteTask(id) {
    props.deleteTodoHandler(id);
  }

  function editTask(id, newName) {
    props.editTodoHandler({ id, newName });
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  function addTask(name) {
    const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
    props.setTodoHandler(newTask);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTodoHandler: (data) => dispatch(setTodo(data)),
    editTodoHandler: (data) => dispatch(editTodo(data)),
    editTodoStatusHandler: (data) => dispatch(editTodoStatus(data)),
    deleteTodoHandler: (id) => dispatch(deleteTodo(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
