import React from "react";
import UseAxiosNormal from "../useAxios/UseAxiosNormal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const UseMyEvents = () => {
  const axiosInstanceNormal = UseAxiosNormal();
  const { user } = useAuth();

  const {
    data: myEventsData,
    isLoading: myEventsLoading,
    refetch: myEventsRefetch,
  } = useQuery({
    queryKey: ["myEvents"],
    queryFn: async () => {
      const { data } = await axiosInstanceNormal.get(`/events/${user?.name}`);
      return data.events;
    },
  });

  return { myEventsData, myEventsLoading, myEventsRefetch };
};

export default UseMyEvents;
