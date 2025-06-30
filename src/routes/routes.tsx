import { createBrowserRouter } from "react-router-dom";
import "../index.css";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/pages/home";
import ErrorForRoot from "@/error/errorForRoot";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import EventsPage from "@/components/events/events";
import AddEventPage from "@/pages/add-event";
import MyEventsPage from "@/pages/my-events";
import PrivateRoutes from './privateRoutes/PrivateRoutes.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorForRoot></ErrorForRoot>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/events",
        element: <PrivateRoutes><EventsPage></EventsPage></PrivateRoutes>,
      },
      {
        path: "/add-event",
        element: <PrivateRoutes><AddEventPage></AddEventPage></PrivateRoutes>,
      },
      {
        path: "/my-events",
        element: <PrivateRoutes><MyEventsPage></MyEventsPage></PrivateRoutes>,
      },
    ],
  },
]);

export default router;
