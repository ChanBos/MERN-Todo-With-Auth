// Imported React library and stylesheet.
import React from "react";
// Imported stylesheet.
import "./App.css";
// Imported components.
import ToDoAuth from "./components/ToDoAuth";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";

/**
 * Created the App function and returning components to be exported to Index.js.
 * Added the React Bootstrap link.
 * @returns Application that returns all of the components.
 */

const App = () => {
  return (
    <div className="app">
      <div className="todo-list">
        <ToDoList />
        <ToDoForm />
      </div>
      <div id="imagecontainer">
        <ToDoAuth />
        <img src="./images/motivationlogo.png" alt="Motovational Quote Logo" />
      </div>
    </div>
  );
};

// Exported the App.js to Index.js.
export default App;
