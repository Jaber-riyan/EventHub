import React from "react";
import UseAxiosNormal from "../useAxios/UseAxiosNormal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const UseEvents = () => {
  const axiosInstanceNormal = UseAxiosNormal();
  const { user } = useAuth();

  const {
    data: eventsData,
    isLoading: eventsLoading,
    refetch: eventsRefetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosInstanceNormal.get(`/events?userId=${user?.id}`);
      return data.events;
    },
  });

  return { eventsData, eventsLoading, eventsRefetch };
};

export default UseEvents;
