"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Edit, MapPin, Plus, Trash2, Users } from "lucide-react";

import useAuth from "@/hooks/useAuth";
import UseAxiosNormal from "@/hooks/useAxios/UseAxiosNormal";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UseMyEvents from "@/hooks/useMyEvents/UserMyEvents";
import Swal from "sweetalert2";
import Loading from "@/components/loading/loading";

interface Event {
  id: string;
  title: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendeeCount: number;
}

export default function MyEventsPage() {
  const { user, isLoading: userLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const axiosInstanceNormal = UseAxiosNormal();

  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { myEventsData, myEventsLoading, myEventsRefetch } = UseMyEvents();
  const [hideDescriptionMap, setHideDescriptionMap] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    console.log(myEventsData);

    if (!user || userLoading || myEventsLoading) return;
    // Fetch user's events using axios
    if (myEventsData) {
      const transformed = myEventsData.map((event: any) => {
        const dateObj = new Date(event.dateAndTime);
        return {
          id: event._id,
          title: event.eventTitle,
          name: event.name,
          location: event.location,
          description: event.description,
          attendeeCount: event.attendeeCount || 0,
          date: dateObj.toISOString().split("T")[0],
          time: dateObj.toTimeString().slice(0, 5),
        };
      });

      setEvents(transformed);
    }
  }, [user, userLoading, myEventsData, myEventsLoading]);

  const handleUpdateEvent = (event: Event) => {
    setEditingEvent(event);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setIsSubmitting(true);
    try {
      const updatePayload = {
        eventTitle: editingEvent.title,
        dateAndTime: `${editingEvent.date}T${editingEvent.time}`,
        location: editingEvent.location,
        description: editingEvent.description,
        attendeeCount: editingEvent.attendeeCount,
      };

      const { data } = await axiosInstanceNormal.patch(
        `/events/${editingEvent.id}`,
        updatePayload
      );

      if (data.success) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
        myEventsRefetch();
      }

      setIsUpdateDialogOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Something went wrong while updating.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const { data: userInsertInfo } = await axiosInstanceNormal.delete(
        `/events/${id}`
      );

      if (userInsertInfo.success) {
        Swal.fire({
          title: userInsertInfo.message,
          icon: "success",
        });

        // Optimistically update UI
        setEvents((prev) => prev.filter((event) => event.id !== id));

        // Optionally: refetch if needed to stay in sync
        myEventsRefetch();
      }
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong, try again";
      Swal.fire({
        title: "Event Delete Failed",
        text: errorMsg,
        icon: "error",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditingEvent((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "attendeeCount" ? parseInt(value) || 0 : value,
          }
        : null
    );
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const toggleDescription = (eventId: string) => {
    setHideDescriptionMap((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  if (myEventsLoading || userLoading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Events
              </h1>
              <p className="text-gray-600">Manage your created events</p>
            </div>
            <Link to="/add-event">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create New Event
              </Button>
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No events yet
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't created any events.
              </p>
              <Link to="/add-event">
                <Button>Create Your First Event</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl line-clamp-2">
                          {event.title}
                        </CardTitle>
                        <Badge variant="outline">My Event</Badge>
                      </div>
                      <CardDescription className="text-sm text-gray-600">
                        by {event.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(event.date)} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendeeCount} attendees</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        <span>
                          {hideDescriptionMap[event.id]
                            ? event.description
                            : `${event.description.slice(0, 30)}...`}
                        </span>{" "}
                        <button
                          onClick={() => toggleDescription(event.id)}
                          className="text-blue-600 underline ml-1 cursor-pointer">
                          {hideDescriptionMap[event.id]
                            ? "Show Less"
                            : "Show More"}
                        </button>
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 cursor-pointer"
                          onClick={() => handleUpdateEvent(event)}>
                          <Edit className="h-4 w-4 mr-1" /> Update
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1 cursor-pointer">
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{event.title}"
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="px-4 py-2 bg-black/90 rounded-xl text-white font-semibold cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="px-4 py-2 bg-red-500 text-white rounded-xl cursor-pointer"
                                onClick={() => handleDeleteEvent(event.id)}>
                                Delete Event
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Update Dialog */}
          <Dialog
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Update Event</DialogTitle>
                <DialogDescription>Edit your event details.</DialogDescription>
              </DialogHeader>
              {editingEvent && (
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="">
                    <InputField
                      id="edit-title"
                      name="title"
                      label="Event Title"
                      value={editingEvent.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      id="edit-date"
                      name="date"
                      type="date"
                      label="Date"
                      value={editingEvent.date}
                      onChange={handleInputChange}
                    />
                    <InputField
                      id="edit-time"
                      name="time"
                      type="time"
                      label="Time"
                      value={editingEvent.time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <InputField
                    id="edit-location"
                    name="location"
                    label="Location"
                    value={editingEvent.location}
                    onChange={handleInputChange}
                  />
                  <TextareaField
                    id="edit-description"
                    name="description"
                    label="Description"
                    value={editingEvent.description}
                    onChange={handleInputChange}
                  />
                  <InputField
                    id="edit-attendeeCount"
                    name="attendeeCount"
                    type="number"
                    label="Attendee Count"
                    value={editingEvent.attendeeCount.toString()}
                    onChange={handleInputChange}
                  />
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsUpdateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Event"}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ id, name, label, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required
      />
    </div>
  );
}

function TextareaField({ id, name, label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        required
      />
    </div>
  );
}
