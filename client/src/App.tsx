import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Genders from "./pages/gender/Genders";
import EditGender from "./pages/gender/EditGender";
import DeleteGender from "./pages/gender/DeleteGender";
import Users from "./pages/layout/user/Users";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/PotectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/genders",
    element: (
      <ProtectedRoute>
        <Genders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gender/edit/:gender_id",
    element: (
      <ProtectedRoute>
        <EditGender />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gender/delete/:gender_id",
    element: (
      <ProtectedRoute>
        <DeleteGender />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
