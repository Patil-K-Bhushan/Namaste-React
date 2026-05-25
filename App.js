import React from "react";
import ReactDOM from "react-dom/client";

// Functional Components

let data = 1000

const Title = () => (
  <h1 className="head" tabIndex="5">
    Namaste React using JSX
  </h1>
)

const Heading = () => {
  return <div id="container">
    {Title()}
    <Title/>
    <Title></Title>
    <h2>{data}</h2> //JS inside Functional Components
  </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Heading/>);