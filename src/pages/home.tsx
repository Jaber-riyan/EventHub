import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UseEvents from "@/hooks/useEvents/UseEvents";
import UseFeaturesEvents from "@/hooks/useFeaturesEvents/UseFeaturesEvents";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  const { featuresEventsData, featuresEventsLoading, featuresEventsRefetch } =
    UseFeaturesEvents();
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
  // console.log(eventsData);
  const features = [
    {
      icon: Calendar,
      title: "Easy Event Creation",
      description: "Create and manage events with our intuitive interface",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with like-minded people and build communities",
    },
    {
      icon: MapPin,
      title: "Location Based",
      description: "Find events happening near you or anywhere in the world",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about event changes and updates",
    },
  ];

  console.log(featuresEventsData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>Home | EventHub</title>
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row justify-between items-center gap-10 py-10">
          {/* Left Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Discover Amazing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Events
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl">
              Create, discover, and join events that matter to you. Connect with
              your community and make lasting memories.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/events">
                <Button size="lg" className="text-lg px-8 py-3">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/add-event">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-transparent">
                  Create Event
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              className="rounded-2xl w-full max-w-md md:max-w border-4 border-blue-400"
              src="https://demo.ovathemes.com/eventmana/wp-content/uploads/2015/09/event-1a.jpg"
              alt="Event"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EventHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and discover amazing events
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trending Events
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss out on these popular upcoming events
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresEventsData &&
              featuresEventsData
                .slice(0, 3)
                .map((event: any, index: number) => (
                  <motion.div
                    key={event?.eventTitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-xl mb-3">
                          {event.eventTitle}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mb-3">
                          by {event.name.toUpperCase()}
                        </CardDescription>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.dateAndTime)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees || 0} attendees</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          <Link to={"/events"}>Join Event</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-10">
          <Link to="/events">
            <Button variant={"outline"} size="lg" className="text-lg px-8 py-3">
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
