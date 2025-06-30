"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UseEvents from "@/hooks/useEvents/UseEvents";
import Loading from "../loading/loading";
import UseAxiosNormal from "@/hooks/useAxios/UseAxiosNormal";
import Swal from "sweetalert2";

interface Event {
  _id: string;
  eventTitle: string;
  name: string;
  dateAndTime: string;
  location: string;
  description: string;
  attendeeCount: number;
  joinedUsers?: any[];
  joined: boolean;
}

export default function EventsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const { eventsData, eventsLoading, eventsRefetch } = UseEvents();
  const axiosInstanceNormal = UseAxiosNormal();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user]);

  useEffect(() => {
    if (eventsData && eventsData.length) {
      const transformed = eventsData.map((event: any) => {
        const dateObj = new Date(event.dateAndTime);
        return {
          ...event,
          date: dateObj.toISOString().split("T")[0],
          time: dateObj.toTimeString().split(" ")[0].slice(0, 5),
        };
      });
      setEvents(transformed);
    }
  }, [eventsData]);

  // Filter events based on search and filter options
  useEffect(() => {
    let filtered = events.filter((event) =>
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const currentDay = now.getDay(); // Sunday = 0
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - currentDay);
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    currentWeekEnd.setHours(23, 59, 59, 999);

    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(currentWeekStart.getDate() - 7);

    const lastWeekEnd = new Date(currentWeekEnd);
    lastWeekEnd.setDate(currentWeekEnd.getDate() - 7);

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    lastMonthEnd.setHours(23, 59, 59, 999);

    switch (filterOption) {
      case "today":
        filtered = filtered.filter((event) => {
          const date = new Date(event.dateAndTime);
          return date >= startOfToday && date <= endOfToday;
        });
        break;

      case "current-week":
        filtered = filtered.filter((event) => {
          const date = new Date(event.dateAndTime);
          return date >= currentWeekStart && date <= currentWeekEnd;
        });
        break;

      case "last-week":
        filtered = filtered.filter((event) => {
          const date = new Date(event.dateAndTime);
          return date >= lastWeekStart && date <= lastWeekEnd;
        });
        break;

      case "current-month":
        filtered = filtered.filter((event) => {
          const date = new Date(event.dateAndTime);
          return date >= currentMonthStart && date <= currentMonthEnd;
        });
        break;

      case "last-month":
        filtered = filtered.filter((event) => {
          const date = new Date(event.dateAndTime);
          return date >= lastMonthStart && date <= lastMonthEnd;
        });
        break;
    }

    // Sort by latest date first
    filtered.sort((a, b) => {
      const dateA = new Date(a.dateAndTime).getTime();
      const dateB = new Date(b.dateAndTime).getTime();
      return dateB - dateA;
    });

    setFilteredEvents(filtered);
  }, [events, searchTerm, filterOption]);

  const handleJoinEvent = async (eventId: string) => {
    if (!user || !user.id) return;

    try {
      const payload = {
        event: eventId,
        user: user.id,
      };

      const response = await axiosInstanceNormal.post("/events/join", payload);

      if (response.data.success) {
        Swal.fire({
          title: response.data.message,
          icon: "success",
        });
        eventsRefetch();
      } else {
        Swal.fire({
          title: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (eventsLoading) {
    return (
      <Loading/>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Events
            </h1>
            <p className="text-gray-600">
              Discover and join amazing events in your area
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterOption} onValueChange={setFilterOption}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="current-week">Current Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl line-clamp-2">
                        {event.eventTitle}
                      </CardTitle>
                      {event.joined && (
                        <Badge variant="secondary" className="ml-2">
                          Joined
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      by {event.name.toUpperCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.dateAndTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attendeeCount} attendees</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {event.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleJoinEvent(event._id)}
                      disabled={event.joined}>
                      {event.joined ? "Already Joined" : "Join Event"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No events found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
