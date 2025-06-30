"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
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
  joined: boolean
}

export default function EventsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
  }, [user])

  // Mock events data
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Tech Conference 2024",
        name: "John Smith",
        date: "2024-12-15",
        time: "09:00",
        location: "San Francisco, CA",
        description:
          "Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge innovations.",
        attendeeCount: 250,
        joined: false,
      },
      {
        id: "2",
        title: "Music Festival",
        name: "Sarah Johnson",
        date: "2024-12-20",
        time: "18:00",
        location: "Los Angeles, CA",
        description: "Experience amazing live music from top artists in a beautiful outdoor setting.",
        attendeeCount: 1500,
        joined: false,
      },
      {
        id: "3",
        title: "Food & Wine Expo",
        name: "Mike Davis",
        date: "2024-12-25",
        time: "12:00",
        location: "New York, NY",
        description: "Taste exquisite dishes and wines from renowned chefs and wineries.",
        attendeeCount: 800,
        joined: true,
      },
      {
        id: "4",
        title: "Art Gallery Opening",
        name: "Emily Chen",
        date: "2024-12-10",
        time: "19:00",
        location: "Chicago, IL",
        description: "Discover contemporary art from emerging and established artists.",
        attendeeCount: 120,
        joined: false,
      },
      {
        id: "5",
        title: "Startup Pitch Night",
        name: "Alex Rodriguez",
        date: "2024-12-08",
        time: "18:30",
        location: "Austin, TX",
        description: "Watch innovative startups pitch their ideas to investors and industry experts.",
        attendeeCount: 200,
        joined: false,
      },
    ]
    setEvents(mockEvents)
  }, [])

  // Filter events based on search and filter options
  useEffect(() => {
    let filtered = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const today = new Date()
    const currentWeekStart = new Date(today.setDate(today.getDate() - today.getDay()))
    const currentWeekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
    const lastWeekStart = new Date(currentWeekStart)
    lastWeekStart.setDate(lastWeekStart.getDate() - 7)
    const lastWeekEnd = new Date(currentWeekEnd)
    lastWeekEnd.setDate(lastWeekEnd.getDate() - 7)
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)

    switch (filterOption) {
      case "today":
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate.toDateString() === new Date().toDateString()
        })
        break
      case "current-week":
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= currentWeekStart && eventDate <= currentWeekEnd
        })
        break
      case "last-week":
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= lastWeekStart && eventDate <= lastWeekEnd
        })
        break
      case "current-month":
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= currentMonthStart && eventDate <= currentMonthEnd
        })
        break
      case "last-month":
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= lastMonthStart && eventDate <= lastMonthEnd
        })
        break
    }

    // Sort by date and time (most recent first)
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })

    setFilteredEvents(filtered)
  }, [events, searchTerm, filterOption])

  const handleJoinEvent = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId && !event.joined
          ? { ...event, attendeeCount: event.attendeeCount + 1, joined: true }
          : event,
      ),
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Events</h1>
            <p className="text-gray-600">Discover and join amazing events in your area</p>
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
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                      {event.joined && (
                        <Badge variant="secondary" className="ml-2">
                          Joined
                        </Badge>
                      )}
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
                    <Button className="w-full" onClick={() => handleJoinEvent(event.id)} disabled={event.joined}>
                      {event.joined ? "Already Joined" : "Join Event"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
