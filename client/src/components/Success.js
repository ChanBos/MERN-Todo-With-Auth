// Imported React library.
import React from "react";

/**
 * Created an success alert component using Bootstrap.
 * Set the message prop to display the success messages.
 */

const Success = ({ message }) => {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
};

// Exporting Success.js to Booking.js and Home.js.
export default Success;
