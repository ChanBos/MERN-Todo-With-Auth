// Imported React library and hooks.
import React, { useState, useEffect } from "react";
// Requiring Axios.
import axios from "axios";
// Imported ToDo component.
import ToDo from "./ToDo";

/**
 * Set the initial state of todos.
 * Returning a table with a header containing all of the todo data.
 * Checking the length of the array and iterating over the todo items via the map() method.
 */

const ToDoList = () => {
  const [todos, setTodos] = useState([]);

  // Utilized the useEffect() hook to get/ read the information from the database and respond displaying the data. If an error occurs the error
  // will be logged to console.
  useEffect(() => {
    axios
      .get("todo")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setTodos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {console.log(todos.length)}
      <header>
        <h1>To Do List</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th className="thdate">CREATED:</th>
            <th id="thtodo">TO-DO:</th>
            <th className="thdate">DUE:</th>
          </tr>
        </thead>
        <tbody>
          {todos && todos.length > 0
            ? todos.map((todo) => <ToDo key={todo._id} {...todo} />)
            : null}
        </tbody>
      </table>
    </div>
  );
};

// Exported the ToDo to App.js.
export default ToDoList;
