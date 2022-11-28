import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./styles/index.css";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Homepage from "./pages/Homepage";
// import CreateProject from "./pages/CreateProject";
// import Freelancers from "./pages/Freelancers";

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />}>
//           <Route index element={<Homepage />} />
//           <Route path="Freelancers" element={<Freelancers />} />
//           <Route path="CreateProject" element={<CreateProject />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
