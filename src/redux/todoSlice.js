import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todosState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log('serial', serializedState)
    localStorage.setItem('todosState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};


const initialState = loadState() || {
    tasks: [],
    deletedTasks: [],
    completedTasks: [],
  };
  
  const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTask: (state, action) => {
        state.tasks.push(action.payload);
        saveState(state);
      },
      editTask: (state, action) => {
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updatedTask };
          saveState(state);
        }
      },
      deleteTask: (state, action) => {
        const { id } = action.payload;
        const task = state.tasks.find(task => task.id === id);
        if (task) {
          state.deletedTasks.push(task);
          state.tasks = state.tasks.filter(task => task.id !== id);
          saveState(state);
        }
      },
      completeTask: (state, action) => {
        const { id } = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          // Mark the task as completed
          const task = state.tasks[taskIndex];
          task.completed = true;
          
          // Move the task to the completedTasks array
          state.completedTasks.push(task);
          state.tasks = state.tasks.filter(task => task.id !== id);
          console.log('state', state)
          saveState(state);
        }
      },
      // setTasks: (state, action) => {
      //   state.tasks = action.payload;
      //   saveState(state);
      // },
    },
  });
  
  export const { addTask, editTask, deleteTask, completeTask, setTasks } = todosSlice.actions;
  
export default todosSlice.reducer;
