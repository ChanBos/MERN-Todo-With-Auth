// Imported React library.
import React, { useState } from "react";
// Requiring Axios.
import axios from "axios";
// Imported Font Awesome library and icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// Imported Swal from sweetalert2.
import Swal from "sweetalert2";

/**
 * Set the initial values of the props.
 * Assigned an event.preventDefault() method to ensure that the page is not refreshed once the delete function is executed.
 * Fetching the content from http://localhost:8080/cars/delete/:id. Utilizing the Delete method.
 * Added the necessary props to remove values from the database.
 * If successful a modal (Sweetalert2 - Swal.fire) will appear to confirm success and the content will be added to the UI as objects.
 * If unsuccessful a modal (Sweetalert2 - Swal.fire) will appear displaying an error.
 * @param {*} e Deleting content that exists in the database via id.
 */

const DeleteToDo = ({ _id }) => {
  const [todos, setTodos] = useState([]);

  const remove = (e, _id) => {
    e.preventDefault();

    axios
      .delete(`/todos/delete/${_id}`) //Have to send the JWT back to the Server, send via headers
      .then((response) => {
        const del = todos.filter((todo) => _id !== todo._id);
        setTodos(del);
        console.log("response", response);
        Swal.fire({
          icon: "success",
          confirmButtonColor: "#000000",
          timer: 3000,
          width: 400,
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
          text: error.response.data.message,
        }).then(function () {
          window.location.reload();
        });
      });
  };

  return (
    <div>
      <td className="tdactions">
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={(e) => remove(e, _id)}
          id="removebutton"
          title="Remove"
        />
      </td>
    </div>
  );
};

// Exported the ToDo to TodoList.js.
export default DeleteToDo;
