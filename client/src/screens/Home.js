// Imported React library.
import React from "react";
// Imported components.
import SignUp from "../components/SignUp";
import Login from "../components/Login";

/**
 * Created a Home component that returns the main page with an image and the sign up and login components.
 * Also added a quote and a short write-up of the application.
 */

const Home = () => {
  return (
    <div id="homecontainer">
      <div id="homeimagecontainer">
        <img src="../images/motivationlogo.png" alt="Motivational Quote Logo" />
      </div>
      <div id="authcontainer">
        <h1 id="authheader">
          &#10077; Life is those moments where we forget to live but are too
          busy to enjoy. &#10078; - Debasish Mridha
        </h1>
        <h6>
          Allow us to help you declutter your life so you have more time for
          things that matter most.
        </h6>
        <div id="authbuttoncontainer">
          <SignUp />
          <h6 id="authbuttonheader">OR</h6>
          <Login />
        </div>
      </div>
    </div>
  );
};

// Exporting Home to App.js.
export default Home;
