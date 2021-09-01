// Imported React library and stylesheet.
import React from "react";
// Imported components.
import GetToDoList from "../components/GetToDoList";
import CreateToDoForm from "../components/CreateToDoForm";

/**
 * Created the CompiledTodo function and returning the authorzied todo components to be exported to App.js.
 * @returns Application that returns all of the authorized todo components.
 */

const CompiledTodo = () => {
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="app">
      <div className="todo-list">
        <GetToDoList />
        <CreateToDoForm />
      </div>
      <div id="imagecontainer">
        <button type="button" onClick={logout} className="authbutton signout">
          Sign Out
        </button>
        <img src="../images/motivationlogo.png" alt="Motivational Quote Logo" />
      </div>
    </div>
  );
};

// Exported the CompiledTodo.js to App.js.
export default CompiledTodo;
