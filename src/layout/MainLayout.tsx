import React from "react";
// import LocomotiveScroll from "locomotive-scroll";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import useAuth from "@/hooks/useAuth";
import Loading from "../components/loading/loading";

const MainLayout = () => {
  // const locomotiveScroll = new LocomotiveScroll();
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
