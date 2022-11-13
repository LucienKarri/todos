import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

const initialData = [
  {
    id: uuidv4(),
    description: 'learn react',
    min: 13,
    sec: 37,
    created: new Date(),
    completed: false,
  },
  {
    id: uuidv4(),
    description: 'practice react',
    min: 13,
    sec: 37,
    created: new Date(),
    completed: false,
  },
  {
    id: uuidv4(),
    description: 'relax',
    min: 13,
    sec: 37,
    created: new Date(),
    completed: false,
  },
];

const TodoApp = () => {
  const [todos, setTodos] = useState(initialData);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(myFilter(filter));
  }, [filter, todos]);

  const createTask = (description, min, sec) => {
    return {
      id: uuidv4(),
      description,
      min,
      sec,
      created: new Date(),
      completed: false,
    };
  };

  const addTask = (description, min, sec) => {
    setTodos((todos) => {
      const newTask = createTask(description, min, sec);

      return [newTask, ...todos];
    });
  };

  const deleteTask = (id) => {
    setTodos((todos) => {
      const newTodos = todos.filter((task) => task.id !== id);

      return newTodos;
    });
  };

  const editTask = (id, description) => {
    setTodos((todos) => {
      const newTodos = todos.map((task) => {
        if (task.id === id) {
          task.description = description;
        }
        return task;
      });

      return newTodos;
    });
  };

  const onToggleCompleted = (id) => {
    setTodos((todos) => {
      const newTodos = todos.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }

        return task;
      });

      return newTodos;
    });
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
          tasks={filteredTodos}
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
/*
export default class TodoApp extends Component {
  static createTodoItem(description, timerMin, timerSec) {
    const task = {
      id: uuidv4(),
      description,
      timerMin,
      timerSec,
      created: new Date(),
      completed: false,
    };

    return task;
  }

  state = {
    data: [
      {
        id: uuidv4(),
        description: 'learn react',
        timerMin: 13,
        timerSec: 37,
        created: new Date(),
        completed: false,
      },
      {
        id: uuidv4(),
        description: 'practice react',
        timerMin: 13,
        timerSec: 37,
        created: new Date(),
        completed: false,
      },
      {
        id: uuidv4(),
        description: 'relax',
        timerMin: 13,
        timerSec: 37,
        created: new Date(),
        completed: false,
      },
    ],
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const newData = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newData,
      };
    });
  };

  addItem = (description, timerMin, timerSec) => {
    const newItem = TodoApp.createTodoItem(description, timerMin, timerSec);

    this.setState(({ data }) => {
      const newData = [newItem, ...data];

      return {
        data: newData,
      };
    });
  };

  editItem = (id, description) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, description };
      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      return {
        data: newData,
      };
    });
  };

  onClearCompleted = () => {
    const { data } = this.state;
    const completedCount = data.filter((elem) => elem.completed);
    completedCount.forEach((elem) => this.deleteItem(elem.id));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  myFilter(filter) {
    const { data } = this.state;

    switch (filter) {
      case 'active':
        return data.filter((elem) => !elem.completed);
      case 'completed':
        return data.filter((elem) => elem.completed);
      case 'all':
      default:
        return data;
    }
  }

  render() {
    const { data, filter } = this.state;
    const nonCompletedCount = data.filter((elem) => !elem.completed).length;
    const filteredData = this.myFilter(filter);

    return (
      <section className="todoapp">
        <Header onTaskAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEdited={this.editItem}
          />
          <Footer
            left={nonCompletedCount}
            onClearCompleted={this.onClearCompleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}
*/
