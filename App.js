import React from "react";
import ReactDOM from "react-dom/client";

// Core React Element
const heading = React.createElement(
  "h1",
  {id: "heading"},
  "Namaste React 🚀"
);
console.log (heading);

// JSX Element
const jsxHeading = <h1 id="heading">Namaste React</h1>;
console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);