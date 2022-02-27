import { SET_TODO, EDIT_TODO, EDIT_TODO_STATUS, DELETE_TODO } from '../../actions/actionType';

let initalState = {
  data: [
    { id: 'todo-0', name: 'Eat', completed: true },
    { id: 'todo-1', name: 'Sleep', completed: false },
    { id: 'todo-2', name: 'Repeat', completed: false }
  ]
};

const todoStore = (state = initalState, action) => {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case EDIT_TODO:
      const editedTaskList = [...state.data].map((task) => {
        // if this task has the same ID as the edited task
        if (action.payload.id === task.id) {
          //
          return { ...task, name: action.payload.newName };
        }
        return task;
      });
      return {
        ...state,
        data: [...editedTaskList]
      };
    case EDIT_TODO_STATUS:
      const updatedTasks = [...state.data].map((task) => {
        // if this task has the same ID as the edited task
        if (action.payload === task.id) {
          // use object spread to make a new obkect
          // whose `completed` prop has been inverted
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return {
        ...state,
        data: [...updatedTasks]
      };
    case DELETE_TODO:
      const remainingTasks = [...state.data].filter((task) => action.payload !== task.id);
      return {
        ...state,
        data: [...remainingTasks]
      };
    default:
      return state;
  }
};

export default todoStore;
