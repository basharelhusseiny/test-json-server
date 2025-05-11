import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/create", element: <Create /> },
    { path: "/read/:id", element: <Read /> },
    { path: "/update/:id", element: <Update /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
