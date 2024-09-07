// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || [],
  deletedTasks: JSON.parse(localStorage.getItem('deletedTasks')) || [],
};

// Redux Slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      const taskToDelete = state.tasks.find(task => task.id === action.payload);
      if (taskToDelete) {
        state.deletedTasks.push(taskToDelete);
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        localStorage.setItem('deletedTasks', JSON.stringify(state.deletedTasks));
      }
    },
    completeTask: (state, action) => {
      const taskToComplete = state.tasks.find(task => task.id === action.payload);
      if (taskToComplete) {
        state.completedTasks.push(taskToComplete);
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks));
      }
    },
    deleteMultipleTasks: (state, action) => {
      action.payload.forEach(id => {
        const taskToDelete = state.tasks.find(task => task.id === id);
        if (taskToDelete) {
          state.deletedTasks.push(taskToDelete);
          state.tasks = state.tasks.filter(task => task.id !== id);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('deletedTasks', JSON.stringify(state.deletedTasks));
    },
    completeMultipleTasks: (state, action) => {
      action.payload.forEach(id => {
        const taskToComplete = state.tasks.find(task => task.id === id);
        if (taskToComplete) {
          state.completedTasks.push(taskToComplete);
          state.tasks = state.tasks.filter(task => task.id !== id);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks));
    }
  }
});

// export const { addTask, editTask, deleteTask, completeTask, deleteMultipleTasks, completeMultipleTasks } = tasksSlice.actions;
// export const store = configureStore({ reducer: tasksSlice.reducer });
