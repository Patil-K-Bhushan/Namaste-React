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
  [ React.createElement("div", 
      { id: "child1" }, 
    [ React.createElement("h1", {}, "I'm an h1 tag"), React.createElement("h2", {}, "I'm an h2 tag")]
    ),
    React.createElement("div", 
      { id: "child2" }, 
    [ React.createElement("h1", {}, "I'm an h1 tag"), React.createElement("h2", {}, "I'm an h2 tag")]
    )
  ]
);

// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello World from React!",
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
