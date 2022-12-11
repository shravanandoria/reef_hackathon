import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import EditProfile from "./pages/EditProfile";
import CreateProject from "./pages/CreateProject";
import Freelancers from "./pages/Freelancers";
import ActiveProjects from "./pages/ActiveProjects";
import GettingStarted from "./pages/GettingStarted";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Project from "./pages/Project";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";

function App() {
  const routes = [
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
    {
      path: "/createprofile",
      element: <CreateProfile />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/project/:id",
      element: <Project />,
    },
  ];

  return (
    <div>
      <Navbar />
      <Routes>
        {routes.map((e, index) => (
          <Route key={index} path={e.path} element={e.element} />
        ))}
      </Routes>
      <Footer />
      {/* <RouterProvider router={router}></RouterProvider> */}
    </div>
  );
}

export default App;
