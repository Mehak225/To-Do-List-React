import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './images/png2.png';

function TodoApp() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('data')) || []);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    const taskName = taskInput.trim();
    if (taskName === '') {
      alert('You must write the task!');
    } else {
      setTasks([...tasks, { name: taskName, checked: false }]);
    }
    setTaskInput('');
  };

  const toggleTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], checked: !updatedTasks[index].checked };
    setTasks(updatedTasks);
  };

  const deleteTask = (indexToDelete, event) => {
    // Prevent event propagation
    event.stopPropagation();
  
    const updatedTasks = tasks.filter((task, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };
  
  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List <img src={logo} height="41px" alt="Logo" />
        </h2>
        <div className="row">
          <input type="text" value={taskInput} onChange={handleInputChange} placeholder="ADD YOUR TASK" />
          <button onClick={addTask}>ADD</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? 'checked' : ''}
              onClick={() => toggleTask(index)}
            >
              {task.name}
              <span onClick={(event) => deleteTask(index, event)}>&times;</span>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;