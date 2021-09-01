// Imported React library and hooks.
import React, { useState, useEffect } from "react";
// Requiring Axios.
import axios from "axios";
// Imported moment to format the date outputs.
import moment from "moment";
// Imported ToDo component.
import DeleteToDo from "./DeleteToDo";

/**
 * Created a function to output the todo data via a table.
 * @param {*} param0 _id, Date, Todo, Due
 * @returns A table with the with the dates (created, due) formatted with moment, the todo items and buttons to complete and delete the listings.
 */

const TodoList = ({ data }) => {
  const { _id, Date, Todo, Due } = data;

  return (
    <tr>
      <td>{moment(Date).format("L")}</td>
      <td className="todotext">{Todo}</td>
      <td>{moment(Due).format("L")}</td>
      <td className="tdactions">
        <DeleteToDo _id={_id} />
      </td>
    </tr>
  );
};

/**
 * Set the initial state of todos.
 * Utilized the useEffect() hook to get/ read the information from the database and respond displaying the data. If an error occurs the error
 * will be logged to console.
 * Returning a table with a header containing all of the todo data.
 * Checking the length of the array and iterating over the todo items via the map() method.
 */

const GetToDoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios({
      url: "/todos/gettodo",
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        const data = res.data;
        console.log("data:", data);
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
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
          {todos && todos.length >= 0
            ? todos.map((todo, _id) => <TodoList data={todo} key={_id} />)
            : null}
        </tbody>
      </table>
    </div>
  );
};

// Exported the ToDo to App.js.
export default GetToDoList;
