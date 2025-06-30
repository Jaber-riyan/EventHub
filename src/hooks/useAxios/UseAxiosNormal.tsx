import axios from "axios";
import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../useAuth";

const axiosInstanceNormal = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`,
});
const UseAxiosNormal = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

//   useEffect(() => {
//     axiosInstanceNormal.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         console.log("error from interceptor : ", error);
//         if (error?.response?.date?.success) {
//           Swal.fire({
//             title: error?.response?.date?.message,
//             icon: "error",
//           });
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [logout, navigate]);

  return axiosInstanceNormal;
};

export default UseAxiosNormal;
