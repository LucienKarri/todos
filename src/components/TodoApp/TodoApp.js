import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

const initialData = [
  {
    id: uuidv4(),
    description: 'learn react',
    timeLeft: 123,
    created: new Date(),
    completed: false,
  },
  {
    id: uuidv4(),
    description: 'practice react',
    timeLeft: 234,
    created: new Date(),
    completed: false,
  },
  {
    id: uuidv4(),
    description: 'relax',
    timeLeft: 345,
    created: new Date(),
    completed: false,
  },
];

const TodoApp = () => {
  const [todos, setTodos] = useState(initialData);
  const [filter, setFilter] = useState('all');

  const createTask = (description, timeLeft) => {
    return {
      id: uuidv4(),
      description,
      timeLeft,
      created: new Date(),
      completed: false,
    };
  };

  const addTask = (description, timeLeft) => {
    const newTask = createTask(description, timeLeft);
    setTodos([...todos, newTask]);
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const editTask = (id, editValue) => {
    const newTodos = todos.map((task) => {
      if (task.id === id) {
        return { ...task, ...editValue };
      }
      return task;
    });
    setTodos(newTodos);
  };

  const onToggleCompleted = (id) => {
    const newTodos = todos.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }

      return task;
    });
    setTodos(newTodos);
  };

  const onClearCompleted = () => {
    const needDelete = todos.filter((task) => task.completed);
    needDelete.forEach((task) => deleteTask(task.id));
  };

  const onFilterChange = (value) => {
    setFilter(value);
  };

  const myFilter = (value) => {
    switch (value) {
      case 'active':
        return todos.filter((elem) => !elem.completed);
      case 'completed':
        return todos.filter((elem) => elem.completed);
      case 'all':
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp">
      <Header onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          tasks={myFilter(filter)}
          onTaskDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onTaskEdited={editTask}
        />
        <Footer
          tasksLeft={todos.filter((task) => !task.completed).length}
          onClearCompleted={onClearCompleted}
          filterValue={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
};

export default TodoApp;
