import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Bootstrap CSS & JS imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Components imports
import Home from "./components/Home";
import ShowECDetails from "./components/YearlyEnergyConsumptionDetails";
import ShowCountryEClist from "./components/CountryEnergyConsumptionList";
import ShowCountryDashboard from "./components/CountryDashboard";
import ShowCountryGraph from "./components/CountryGraph";

// Routes
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/ec/:id", element: <ShowCountryDashboard /> },
  { path: "/ec/:id/list-all", element: <ShowCountryEClist /> },
  { path: "/ec/:id/:year", element: <ShowECDetails /> },
  { path: "/ec/:id/graph", element: <ShowCountryGraph /> },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);