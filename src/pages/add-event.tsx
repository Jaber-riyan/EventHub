import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosNormal from "@/hooks/useAxios/UseAxiosNormal";
import Loading from "@/components/events/loading";
import { Helmet } from "react-helmet-async";

export default function AddEventPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const axiosInstanceNormal = UseAxiosNormal();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    name: "",
    dateAndTime: "",
    location: "",
    description: "",
    attendeeCount: 0,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Pre-fill the name field with user's name
    setFormData((prev) => ({ ...prev, name: user.name }));
  }, [user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendeeCount" ? Number.parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData);
    try {
      const { data: userInsertInfo } = await axiosInstanceNormal.post(
        `/events/create-event`,
        formData
      );

      console.log(userInsertInfo);

      if (userInsertInfo.success) {
        Swal.fire({
          title: userInsertInfo.message,
          icon: "success",
        });

        setFormData({
          eventTitle: "",
          dateAndTime: "",
          location: "",
          description: "",
          attendeeCount: 0,
        });

        navigate(location?.state || "/add-event");
      }
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong, try again";
      Swal.fire({
        title: "Event create Failed",
        text: errorMsg,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Helmet>
          <title>Add Event | EventHub</title>
        </Helmet>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Event
            </h1>
            <p className="text-gray-600">
              Fill in the details to create your event
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </CardTitle>
              <CardDescription>
                Provide all the necessary information about your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="eventTitle"
                      name="eventTitle"
                      value={formData.eventTitle}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Organizer Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dateAndTime"
                    className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Event Date *
                  </Label>
                  <Input
                    id="dateAndTime"
                    name="dateAndTime"
                    type="datetime-local"
                    value={formData.dateAndTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="attendeeCount"
                    className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Initial Attendee Count
                  </Label>
                  <Input
                    id="attendeeCount"
                    name="attendeeCount"
                    type="number"
                    min="0"
                    value={formData.attendeeCount}
                    onChange={handleInputChange}
                    placeholder="0"
                    readOnly
                    disabled
                  />
                  <p className="text-sm text-gray-500">
                    This will be the starting number of attendees (default: 0)
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none">
                    {isSubmitting ? "Creating Event..." : "Add Event"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/events")}
                    className="flex-1 sm:flex-none">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
