import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import RestaurantMenu from "./src/components/RestaurantMenu";
import Collection from "./src/components/Collections";
import Cart from "./src/components/Cart";
import Search from "./src/components/Search";
import SignIn from "./src/components/SignIn";
import Error from "./src/components/Error";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import UserContext from "./src/utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./src/utils/appStore";

const AppLayout = () => {
  const [userName, setUserName] = useState("Sign In");

  return (
    <Provider store={appStore}>
      <UserContext.Provider
        value={{
          loggedInUser: userName,
          setUserName,
        }}
      >
        <div className="App-Layout">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resID",
        element: <RestaurantMenu />,
      },
      {
        path: "/collection/:collectionID/:tag",
        element: <Collection />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
