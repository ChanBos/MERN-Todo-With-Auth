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
 * Created a sign up function to allow the user to sign up.
 * Props: name, email, password, cpassword, show, error, success. Set the initial states.
 * Set the handlers to show the modal once the handleShow() function is called (boolean = true) and to not show
 * once the onHide() function is called (boolean = false).
 * Made use of an asynchronous function to Post the information to "/users/signup".
 * If successful, the request will be sent and the user will be allowed to access the application. A message will display in the modal and the
 * user will be redirected to the application.
 * If an error occurs the error will be logged and an alert message will display in the modal.
 */

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const register = async () => {
  //   if (password === cpassword) {
  //     const user = {
  //       Name: name,
  //       Email: email,
  //       Password: password,
  //       cpassword,
  //     };
  //     console.log("user:", user);
  //     try {
  //       const result = await axios.post("/users/signup", user).data;
  //       console.log("result:", result);
  //       setSuccess(true);
  //       setTimeout(function () {
  //         window.location.href = "/users/user";
  //       }, 2000);
  //     } catch (err) {
  //       console.log(err);
  //       setError(true);
  //     }
  //   } else {
  //     alert("The passwords do not match.");
  //   }
  // };

  const handleSignUp = (e) => {
    e.preventDefault();

    axios({
      url: "/users/signup",
      method: "post",
      data: {
        Name: name,
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
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Never Forget Anything Again!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="/login" method="POST">
            <FormControl
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <FormControl
              type="text"
              className="email"
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
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <FormControl
              type="password"
              className="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form>
          {error && (
            <Error message="Something went wrong. Please try again later." />
          )}
          {success && <Success message="Registered Successfully." />}
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
            onClick={(e) => handleSignUp(e)}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Exported the SignUp to App.js.
export default SignUp;
