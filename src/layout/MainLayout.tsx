import React from "react";
// import LocomotiveScroll from "locomotive-scroll";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

const MainLayout = () => {
    // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default MainLayout;
