import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import useAuth from "@/hooks/useAuth";
import { HeadProvider, Title } from "react-head";
import { Link } from "react-router-dom";

const ErrorForRoot = () => {
  const { user } = useAuth();
  return (
    <div>
      <HeadProvider>
        <Title>404 | EventHub</Title>
      </HeadProvider>
      <header className="sticky top-0 z-10 border-2 backdrop-blur-sm bg-black/40">
        <Navbar></Navbar>
      </header>
      <div className="flex justify-center items-center min-h-[50vh] flex-col gap-y-10">
        <div>
          {!user && (
            <Link
              to={"/login"}
              className="mr-3 w-full py-2 px-7 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-900">
              Login
            </Link>
          )}
          <Link
            to={"/"}
            className="w-full py-2 px-7 mt-4 text-white bg-gray-800 rounded-md hover:bg-gray-900">
            Back To Home
          </Link>
        </div>
        <img src="https://i.ibb.co.com/6ZLQtqj/404.gif" alt="" />
      </div>
      <footer className="dm-sans-font">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default ErrorForRoot;
