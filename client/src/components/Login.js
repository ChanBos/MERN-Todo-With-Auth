// Imported React library.
import React, { useState } from "react";
// Requiring Axios.
import axios from "axios";
// Imported components from React Bootstrap.
import { Button, Form, FormControl, Modal } from "react-bootstrap";
// Imported components.
import Error from "../components/Error";
import Success from "../components/Success";

/**
 * Created a login function to allow the user to login.
 * Props: email, password, show, error, success. Set the initial states.
 * Set the handlers to show the modal once the handleShow() function is called (boolean = true) and to not show
 * once the onHide() function is called (boolean = false).
 * Made use of an asynchronous function to Post the information to "/users/login".
 * If successful, the request will be sent and the user will be allowed to access the application. A message will display in the modal and the
 * user will be redirected to the application.
 * Set for the currentUser to be stringified and stored in local storage.
 * If an error occurs the error will be logged and an alert message will display in the modal.
 */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const login = async () => {
  //   const user = {
  //     Email: email,
  //     Password: password,
  //   };
  //   console.log('user:', user)
  //   try {
  //     const result = await axios.post("/users/login", user).data;
  //     localStorage.setItem("currentUser", JSON.stringify(result));
  //     setSuccess(true);
  //     setTimeout(function () {
  //       window.location.href = "/users/user";
  //     }, 2000);
  //   } catch (err) {
  //     console.log(err);
  //     setError(true);
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      url: "/users/login",
      method: "post",
      data: {
        Email: email,
        Password: password,
      },
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        setSuccess(true);
        sessionStorage.setItem("token", response.data.token);
        setTimeout(function () {
          window.location.href = "/users/user";
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="authbutton">
        Login
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Let's Get Effectively Busy Today!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="/login" method="POST">
            <FormControl
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <FormControl
              type="password"
              className="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form>
          <div>
            {error && (
              <Error message="Something went wrong. Please try again later." />
            )}
            {success && <Success message="Login Successful." />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="authmodalbutton"
          >
            Close
          </Button>
          <Button
            className="authmodalbutton"
            type="button"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Exported the Login to App.js.
export default Login;
