// Imported React library.
import React from "react";
// Imported components from React Bootstrap.
import { Button } from "react-bootstrap";
// Imported Swal from sweetalert2.
import Swal from "sweetalert2";

/**
 * Styled the modals. Set the background, width, the buttons' text and colors and added titles.
 * Created forms for the handleShowSignUp and handleShowSignIn modals. Added the actions on the buttons to redirect to the permitted routes.
 * @returns sweetalert2 Modals with the form to input the username and password and buttons to send the request onClick().
 */

const ToDoAuth = () => {
  const handleShowSignUp = () => {
    Swal.fire({
      background: "#ffffff",
      width: 500,
      title: "Never Forget Anything Again!",
      showCloseButton: true,
      html: `<form action="/sign-up" method="POST">
      <input type="text" id="Name" name="Name" class="swal2-input" placeholder="Name"/>
      <input type="text" id="Email" name="Email" class="swal2-input" placeholder="Email"/>
      <input type="password" id="password" name="password" class="swal2-input" placeholder="Password"/>
      </form>`,
      confirmButtonText: "Sign Up",
      confirmButtonColor: "#303030",
    })
      .then(function () {
        Swal.fire({
          title: "Success!",
          text: "You have been signed up successfully.",
          type: "success",
          timer: 3000,
        });
      })
      .then(function () {
        window.location.href = "todo";
      });
  };

  const handleShowSignIn = () => {
    Swal.fire({
      background: "#ffffff",
      width: 500,
      title: "Let's Get Organized!",
      showCloseButton: true,
      html: `<form action="/sign-in" method="POST">
      <input type="text" id="username" name="username" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">
      </form>`,
      confirmButtonText: "Sign In",
      confirmButtonColor: "#303030",
    })
      .then(function () {
        Swal.fire({
          title: "Success!",
          text: "You have been signed in.",
          type: "success",
          timer: 3000,
        });
      })
      .then(function () {
        window.location.href = "/secret";
      });
  };

  /**
   * This modal does not have a form, only a button that fires another message confirming the sign out action and that redirects to the signed
   * out route.
   */

  const handleShowSignOut = () => {
    Swal.fire({
      background: "#ffffff",
      width: 500,
      title: "Done For The Day?",
      showCloseButton: true,
      confirmButtonText: "Sign Out",
      confirmButtonColor: "#303030",
    })
      .then(function () {
        Swal.fire({
          title: "Until Next Time!",
          text: "You have been signed out.",
          type: "success",
          timer: 3000,
        });
      })
      .then(function () {
        window.location.href = "/signout";
      });
  };

  return (
    <div id="authbuttoncontainer">
      <Button className="authbutton" type="button" onClick={handleShowSignUp}>
        Sign Up
      </Button>
      <Button className="authbutton" type="button" onClick={handleShowSignIn}>
        Sign In
      </Button>
      <Button className="authbutton" type="button" onClick={handleShowSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

// Exported the ToDoAuth to App.js.
export default ToDoAuth;
