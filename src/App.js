import './App.css';
import { SignUp } from './pages/SignUp';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Root from './routes/Root';
import { NewEntry } from './pages/NewEntry';
import { Home } from './pages/Home';
import Analysis from './pages/Analysis';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { EditEntry } from './pages/EditEntry';
import { Landing } from './pages/Landing';

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
        path:"/signedin/:userID/analysis",
        element: <Analysis />,
      },
      {
        path:"/signedin/:userID/profile",
        element: <Profile />,
      },
      {
        path:"/signedin/edit/:userID/:entryID",
        element: <EditEntry />,
      },
    ],

  },
]);

function App() {
  return (
    <div className="max-h-[100vh] overflow-scroll">
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
