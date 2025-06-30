import React from "react";
import UseAxiosNormal from "../useAxios/UseAxiosNormal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const UseFeaturesEvents = () => {
  const axiosInstanceNormal = UseAxiosNormal();

  const {
    data: featuresEventsData,
    isLoading: featuresEventsLoading,
    refetch: featuresEventsRefetch,
  } = useQuery({
    queryKey: ["featuresEvents"],
    queryFn: async () => {
      const { data } = await axiosInstanceNormal.get(`events/features-events`);
      return data.events;
    },
  });

  return { featuresEventsData, featuresEventsLoading, featuresEventsRefetch };
};

export default UseFeaturesEvents;
