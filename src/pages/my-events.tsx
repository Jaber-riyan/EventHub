import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Edit, Trash2, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

interface Event {
  id: string
  title: string
  name: string
  date: string
  time: string
  location: string
  description: string
  attendeeCount: number
}

export default function MyEventsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
  }, [user, navigate])

  // Mock user's events data
  useEffect(() => {
    const mockUserEvents: Event[] = [
      {
        id: "1",
        title: "My Tech Meetup",
        name: user?.name || "John Doe",
        date: "2024-12-18",
        time: "19:00",
        location: "Downtown Conference Center",
        description: "A networking event for tech professionals to share ideas and connect.",
        attendeeCount: 45,
      },
      {
        id: "2",
        title: "Photography Workshop",
        name: user?.name || "John Doe",
        date: "2024-12-22",
        time: "14:00",
        location: "City Park",
        description: "Learn advanced photography techniques in a hands-on outdoor workshop.",
        attendeeCount: 25,
      },
      {
        id: "3",
        title: "Book Club Meeting",
        name: user?.name || "John Doe",
        date: "2024-12-28",
        time: "18:30",
        location: "Local Library",
        description: "Monthly discussion of our current book selection with fellow book lovers.",
        attendeeCount: 12,
      },
    ]
    setEvents(mockUserEvents)
  }, [user])

  const handleUpdateEvent = (event: Event) => {
    setEditingEvent(event)
    setIsUpdateDialogOpen(true)
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEvents((prevEvents) => prevEvents.map((event) => (event.id === editingEvent.id ? editingEvent : event)))

      toast({
        title: "Event Updated Successfully!",
        description: "Your event has been updated.",
      })

      setIsUpdateDialogOpen(false)
      setEditingEvent(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))

      toast({
        title: "Event Deleted",
        description: "Your event has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingEvent) return

    const { name, value } = e.target
    setEditingEvent((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "attendeeCount" ? Number.parseInt(value) || 0 : value,
          }
        : null,
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
              <p className="text-gray-600">Manage your created events</p>
            </div>
            <Link to="/add-event">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Event
              </Button>
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-500 mb-6">You haven't created any events. Start by creating your first event!</p>
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                        <Badge variant="outline">My Event</Badge>
                      </div>
                      <CardDescription className="text-sm text-gray-600">by {event.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(event.date)} at {event.time}
                          </span>
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
                      <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleUpdateEvent(event)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="flex-1">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your event "{event.title}"
                                and remove all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteEvent(event.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
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

          {/* Update Event Dialog */}
          <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Update Event</DialogTitle>
                <DialogDescription>Make changes to your event details below.</DialogDescription>
              </DialogHeader>
              {editingEvent && (
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Event Title</Label>
                      <Input
                        id="edit-title"
                        name="title"
                        value={editingEvent.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Organizer Name</Label>
                      <Input
                        id="edit-name"
                        name="name"
                        value={editingEvent.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-date">Date</Label>
                      <Input
                        id="edit-date"
                        name="date"
                        type="date"
                        value={editingEvent.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-time">Time</Label>
                      <Input
                        id="edit-time"
                        name="time"
                        type="time"
                        value={editingEvent.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      name="location"
                      value={editingEvent.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      value={editingEvent.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-attendeeCount">Attendee Count</Label>
                    <Input
                      id="edit-attendeeCount"
                      name="attendeeCount"
                      type="number"
                      min="0"
                      value={editingEvent.attendeeCount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
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
  )
}
