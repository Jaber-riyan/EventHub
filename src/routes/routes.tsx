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
        element: <EventsPage></EventsPage>,
      },
      {
        path: "/add-event",
        element: <AddEventPage></AddEventPage>,
      },
      {
        path: "/my-events",
        element: <MyEventsPage></MyEventsPage>,
      },
    ],
  },
]);

export default router;
