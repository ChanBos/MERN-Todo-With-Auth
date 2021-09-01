// Imported React library.
import React from "react";

/**
 * Created an error alert component using Bootstrap.
 * Set the message prop to display the error messages.
 */

const Error = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

// Exporting Error.js to Booking.js and Home.js.
export default Error;
