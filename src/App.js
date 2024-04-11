import React from "react";
import { useMediaQuery } from "react-responsive";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root from "./routes/Root";
import Analysis from "./pages/Analysis";
import { NewEntry } from "./pages/NewEntry";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { EditEntry } from "./pages/EditEntry";
import { Landing } from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signedin",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signedin/:userID",
        element: <Home />,
      },
      {
        path: "/signedin/:userID/new",
        element: <NewEntry />,
      },
      {
        path: "/signedin/:userID/analysis",
        element: <Analysis />,
      },
      {
        path: "/signedin/:userID/profile",
        element: <Profile />,
      },
      {
        path: "/signedin/edit/:userID/:entryID",
        element: <EditEntry />,
      },
    ],
  },
]);

const NonDesktopOnlyMessage = () => {
  return (
    <div style={{ textAlign: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
      <h1>This site is not currently optimized for mobile devices.</h1>
      <p>
        Please view it on a desktop or larger screen for the best experience.
      </p>
    </div>
  );
};

function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  return (
    <>
    { (isTabletOrMobile || isPortrait) ? (
      <NonDesktopOnlyMessage />
    ) : (
      <div className="max-h-[100vh] overflow-scroll">
      <RouterProvider router={router} />
    </div>
    )}
    </>
  );
}

export default App;
