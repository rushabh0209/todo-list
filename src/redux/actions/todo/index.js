import * as actionType from '../actionType';

export const setTodo = (data) => {
  return {
    type: actionType.SET_TODO,
    payload: data
  };
};

export const deleteTodo = (data) => {
  return {
    type: actionType.DELETE_TODO,
    payload: data
  };
}

export const editTodo = (data) => {
  return {
    type: actionType.EDIT_TODO,
    payload: data
  };
}

export const editTodoStatus = (data) => {
  return {
    type: actionType.EDIT_TODO_STATUS,
    payload: data
  };
}

export const getTodo = () => {
  return {
    type: actionType.GET_TODO
  };
};
