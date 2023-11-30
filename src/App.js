import './App.css';
import Example from './components/Example';
import { StickyNavbar } from './components/Navbar';
import { BoilerHome } from './pages/BoilerHome';
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

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "/signedin",
        element: <Home />,
      },
      {
        path: "/signedin/new",
        element: <NewEntry />,
      },
      {
        path:"/signedin/analysis",
        element: <Analysis />,
      },
      {
        path:"/signedin/profile",
        element: <Profile />,
      },
    ],

  },
]);

function App() {
  return (
    <div className="max-h-[768px] overflow-scroll">
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
