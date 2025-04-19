import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import EditGender from "./pages/gender/EditGender";
import DeleteGender from "./pages/gender/DeleteGender";
import Users from "./pages/layout/user/Users";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/genders",
    element: <Genders />,
  },
  {
    path: "/gender/edit/:gender_id",
    element: <EditGender />,
  },
  {
    path: "/gender/delete/:gender_id",
    element: <DeleteGender />,
  },
  {
    path: "/users",
    element: <Users />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
