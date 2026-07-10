import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header/Header";
import Body from "./src/components/Body/Body";
import About from "./src/components/About/About";
import Contact from "./src/components/Contact/Contact";
import RestaurantMenu from "./src/components/RestaurantMenu/RestaurantMenu";
import Collection from "./src/components/Collections/Collections";
import Cart from "./src/components/Cart/Cart";
import Search from "./src/components/Search/Search";
import SignIn from "./src/components/SignIn/SignIn";
import Error from "./src/components/Error/Error";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./src/contexts/UserContext";
import LocationContext from "./src/contexts/LocationContext";
import { getUserLocation, DEFAULT_COORDS } from "./src/utils/getLocation";
import { Provider } from "react-redux";
import appStore from "./src/utils/appStore";

const AppLayout = () => {
  const [userName, setUserName] = useState("Sign In");

  // Start with the default location, then update once the browser
  // resolves the user's real coordinates (or keeps default if denied).
  const [coords, setCoords] = useState(DEFAULT_COORDS);

  useEffect(() => {
    getUserLocation().then(setCoords);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider
        value={{
          loggedInUser: userName,
          setUserName,
        }}
      >
        <LocationContext.Provider value={coords}>
          <div className="App-Layout">
            <Header />
            <Outlet />
          </div>
        </LocationContext.Provider>
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
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurant/:resID", element: <RestaurantMenu /> },
      { path: "/collection/:collectionID/:tag", element: <Collection /> },
      { path: "/cart", element: <Cart /> },
      { path: "/search", element: <Search /> },
      { path: "/signIn", element: <SignIn /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
