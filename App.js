import React from "react";
import ReactDOM from "react-dom/client";

// Functional Components
const Heading = () => {
  return <h1 className="heading">Namaste React Functional Component</h1>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Heading/>);