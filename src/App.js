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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewEntry />,
      },
      {
        path: "signup",
        element: <SignUp />,
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
