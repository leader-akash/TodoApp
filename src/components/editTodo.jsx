import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../redux/todoSlice';

const EditTaskModal = ({ task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date);
  const [timeSlot, setTimeSlot] = useState(task.timeSlot);
  const [type, setType] = useState(task.type);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { title, date, timeSlot, type };
    dispatch(editTask({ id: task.id, updatedTask }));
    onClose(); // Close modal after editing
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            placeholder="Time Slot"
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
