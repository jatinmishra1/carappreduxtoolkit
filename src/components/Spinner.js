import React from "react";
import { BarLoader } from "react-spinners";
function Spinner() {
  return (
    <div className="spinner">
      <BarLoader size="large" />
    </div>
  );
}

export default Spinner;
