import React, { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([
    {
      content: 'Learn React',
      isCompleted: false,
    },
    {
      content: 'Learn React hooks',
      isCompleted: false,
    },
    {
      content: 'Build awesome apps',
      isCompleted: false,
    }
  ]);


  function handleKeyDown(e, i) {
    if(e.key === 'Enter') {
      createTodo(e,i);
    }

    if(e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodo(i);
    }
  }

  function createTodo(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function updateTodo(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  function removeTodo(i) {
    if(i === 0 && todos.length === 1) return;
    setTodos(() => todos.slice(0,i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  function toggleTodoComplete(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Todo Application</h1>
        <p>This is a simple todo application using react hooks. Below, I explained the process of each crud method</p>
        <ul>
          <ol>Add: At the last item, press enter to add a new item</ol>
          <ol>Delete: Backspace until the item is empty to remove the todo item.</ol>
          <ol>Update: Type in line with the respective item that you want to change</ol>
        </ul>
      </div>
      <form className ="todo-list">
        <ul>
          {todos.map((todo, i) => (
          <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
            <div className={'checkbox'} onClick={() => toggleTodoComplete(i)}>
              {todo.isCompleted && (
                <span>&#x2714;</span>
              )}
            </div>  
            <input type="text" value={todo.content} onKeyDown={e => handleKeyDown(e, i)} onChange={e => updateTodo(e, i)} />
          </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
