import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Agencies from "../pages/Agencies";
import Register from "../pages/Register";

// reservation pages
import Info from "../pages/reservation/Info";
import Summary from "../pages/reservation/Summary";
import Confirm from "../pages/reservation/Confirm";
import Success from "../pages/reservation/Success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "details/:id", element: <Details /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "agences", element: <Agencies /> },
      {path: "/register",element: <Register />},

      // ✅ Reservation flow
      { path: "reservation/info/:id", element: <Info /> },
      { path: "reservation/summary/:id", element: <Summary /> },
      { path: "reservation/confirm/:id", element: <Confirm /> },
      { path: "reservation/success", element: <Success /> },
    ],
  },
]);