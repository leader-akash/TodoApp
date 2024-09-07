import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../redux/todoSlice';

const TodoList = ({ filter }) => {
  const tasks = useSelector((state) => state.todos.tasks || []);
  const completedTasks = useSelector((state) => state.todos.completedTasks || []);
  const deletedTasks = useSelector((state) => state.todos.deletedTasks || []);
  const dispatch = useDispatch();

  // State for selected tasks
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Combine tasks and completed tasks based on filter
  const filteredTasks = (() => {
    switch (filter) {
      case 'completed':
        return completedTasks;
      case 'deleted':
        return deletedTasks;
      case 'all':
      default:
        return [...tasks, ...completedTasks];
    }
  })();

  // Handler for selecting or deselecting a task
  const handleSelect = (id) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((taskId) => taskId !== id)
        : [...prevSelected, id]
    );
  };

  // Handler for completing all selected tasks
  const handleCompleteSelected = () => {
    selectedTasks.forEach((id) => {
      dispatch(completeTask({ id }));
    });
    setSelectedTasks([]); // Clear selected tasks after completion
  };

  // Handler for deleting all selected tasks
  const handleDeleteSelected = () => {
    selectedTasks.forEach((id) => {
      dispatch(deleteTask({ id }));
    });
    setSelectedTasks([]); // Clear selected tasks after deletion
  };

  return (
    <div>
      {/* Buttons for batch operations */}
      <div className="mb-4">
        <button
          onClick={handleCompleteSelected}
          disabled={selectedTasks.length === 0}
        >
          Complete Selected
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedTasks.length === 0}
        >
          Delete Selected
        </button>
      </div>

      {/* List of tasks with checkboxes */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div key={task.id} className="flex space-x-2 items-center">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleSelect(task.id)}
            />
            <h3>{task.title}</h3>
            <p>{task.date}</p>
            <p>{task.timeSlot}</p>
            <p>{task.type}</p>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
            {filter === 'all' && (
              <>
                <button
                  onClick={() => dispatch(completeTask({ id: task.id }))}
                  disabled={task.completed}
                >
                  {task.completed ? 'Completed' : 'Complete'}
                </button>
                <button onClick={() => dispatch(deleteTask({ id: task.id }))}>
                  Delete Task
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TodoList;
