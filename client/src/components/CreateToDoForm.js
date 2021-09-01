// Imported React library and hooks.
import React, { useState } from "react";
// Requiring Axios.
import axios from "axios";
// Imported Swal from sweetalert2.
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

// Started with an empty state (hook) for the input field and based on the value of the input and setting the state.
// Added handleSubmit to handle the submission function, to not add anything to the list if no value is entered and to add the item to the list.
const CreateToDoForm = () => {
  const [Todo, setTodo] = useState("");
  const [Due, setDue] = useState(new Date());

  //************************************************ const createdDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss')

  /**
   * Assigned an event.preventDefault() method to ensure that the page is not refreshed once the create function is executed.
   * Fetching the content from http://localhost:8080/cars/create. Utilizing the Post method.
   * Added the necessary props to alocate values to be written to the database.
   * If successful a modal (Sweetalert2 - Swal.fire) will appear to confirm success and the content will be added to the UI as objects.
   * If unsuccessful a modal (Sweetalert2 - Swal.fire) will appear displaying an error.
   * @param {*} e Posting content to the database and returning the content as objects to the UI.
   */

  const create = (e) => {
    e.preventDefault();

    axios
      .post("/todos/create", {
        Todo,
        Date: new Date(),
        Due,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          confirmButtonColor: "#000000",
          width: 400,
          timer: 3000,
          title: "SUCCESS!",
          text: response.data.message,
        }).then(function () {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          confirmButtonColor: "#ff0000",
          width: 400,
          title: "ERROR!",
          text: error,
        }).then(function () {
          window.location.reload();
        });
      });
  };

  // Returning the component. Added a placeholder and stated that values must be set upon changing the input element.
  // Called create on the button once the button is click for submission.
  return (
    <form onSubmit={(e) => create(e)} id="todoform">
      <h6>NEW TO-DO:</h6>
      <input
        type="text"
        className="input"
        value={Todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter to-do here..."
      />
      <h6 id="dueheader">DUE DATE:</h6>
      <DatePicker
        className="input"
        closeOnScroll={true}
        selected={Due}
        onChange={(date) => setDue(date)}
      />
      <button type="submit" onSubmit={(e) => create(e)} id="submitbutton">
        Add to List
      </button>
    </form>
  );
};

// Exported the ToDoForm to App.js.
export default CreateToDoForm;
