import React from 'react';

import NewTaskForm from '../NewTaskForm';

function Header({ onTaskAdded }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onTaskAdded={onTaskAdded} />
    </header>
  );
}

export default Header;
