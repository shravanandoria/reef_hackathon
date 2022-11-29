import React from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import EditProfile from "./pages/EditProfile";
import CreateProject from "./pages/CreateProject";
import Freelancers from "./pages/Freelancers";
import ActiveProjects from "./pages/ActiveProjects";
import GettingStarted from "./pages/GettingStarted";
import Footer from "./components/Footer";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/createproject",
      element: <CreateProject />,
    },
    {
      path: "/freelancers",
      element: <Freelancers />,
    },
    {
      path: "/editprofile",
      element: <EditProfile />,
    },
    {
      path: "/activeprojects",
      element: <ActiveProjects />,
    },
    {
      path: "/gettingstarted",
      element: <GettingStarted />,
    },
  ]);

  return (
    <div>
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
      <Footer />
    </div>
  );
}

export default App;
