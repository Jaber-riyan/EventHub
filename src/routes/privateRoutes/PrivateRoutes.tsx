import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import useAuth from "../../hooks/useAuth";
import Loading from "@/components/events/loading";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoutes;
