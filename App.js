import React from "react";
import ReactDOM from "react-dom/client";

/*

<div id = "parent">
    <div id = "child1">
        <h1></h1>
        <h2></h2>
    </div>
    <div id = "child2">
        <h1></h1>
        <h22></h2>
    </div>
</div>

*/

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", 
      { id: "child1" }, 
    [ React.createElement("h1", {}, "This is Namaste React 🚀"), React.createElement("h2", {}, "By Akshay Saini")]
  )
);

// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello World from React!",
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
