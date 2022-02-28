/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTodo, editTodo, deleteTodo, editTodoStatus } from '../../redux/actions/todo';
import Form from './Form';
import FilterButton from './FilterButton';
import Todo from './Todo';
import { nanoid } from 'nanoid';
import { removeCookies } from '../../utils/cookies';
import RouterHook from '../../hooks/useRoute';
import { FILTER_MAP, FILTER_NAMES } from '../../utils/utils';
import './todo.css';

const Main = (props) => {
  const tasks = props?.todo?.data;

  const { navigate } = RouterHook();

  const [filter, setFilter] = useState('All');

  const logout = () => {
    navigate('/login');
    removeCookies('isLogin');
  };

  const addTask = (name) => {
    const newTask = { id: 'todo-' + nanoid(), name: name, completed: false };
    props.setTodoHandler(newTask);
  };

  const toggleTaskCompleted = (id) => {
    props.editTodoStatusHandler(id);
  };

  const editTask = (id, newName) => {
    props.editTodoHandler({ id, newName });
  };

  const deleteTask = (id) => {
    props.deleteTodoHandler(id);
  };

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

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map((name) => (
          <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
        ))}
      </div>
      <h2 id="list-heading" tabIndex="-1">
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
