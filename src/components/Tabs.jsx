import React, { useState } from 'react';
import TodoList from './TodoList';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <button onClick={() => handleTabChange('all')}>All Tasks</button>
      <button onClick={() => handleTabChange('completed')}>Completed Tasks</button>
      <button onClick={() => handleTabChange('deleted')}>Deleted Tasks</button>

      <TodoList filter={activeTab} />
    </div>
  );
};

export default Tabs;

