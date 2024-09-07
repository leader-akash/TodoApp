import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/todoSlice';
import { v4 as uuid } from 'uuid';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [type, setType] = useState('weekly');

  const dispatch = useDispatch();
  //   const tasks = useSelector((state) => state.todos.tasks);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // if (tasks.some(task => task.timeSlot === timeSlot)) {
    //   alert('Time slot already exists.');
    //   return;
    // }
    const newTask = { id: uuid(), title, date, timeSlot, type, completed: false };
    dispatch(addTask(newTask));
    setTitle('');
    setDate('');
    setTimeSlot('');

    // setData({
    //             title: '',
    //             date: '',
    //             timeSlot: '',
    //             type: 'weekly', 
    //             isComplete: false,
    //             isDelete: false,

    //         });
  }, [title, date, timeSlot, type, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} placeholder="Time Slot" />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;

