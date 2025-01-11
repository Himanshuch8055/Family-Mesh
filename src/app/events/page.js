"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  ClockIcon,
  GiftIcon,
  CakeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Search from "@/components/Search";
import { useNotification } from "@/context/NotificationContext";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { notify } = useNotification();

  const events = [
    {
      id: 1,
      type: "birthday",
      title: "Emma's Birthday Party",
      date: "2024-02-15",
      time: "15:00",
      location: "Home",
      participants: ["John Smith", "Sarah Smith", "Emma Smith", "James Smith"],
      description: "Celebrating Emma 10th birthday with family and friends.",
      icon: CakeIcon,
      color: "pink",
    },
    {
      id: 2,
      type: "anniversary",
      title: "Wedding Anniversary",
      date: "2024-03-20",
      time: "19:00",
      location: "Italian Restaurant",
      participants: ["John Smith", "Sarah Smith"],
      description: "Celebrating 15 years of marriage.",
      icon: HeartIcon,
      color: "red",
    },
    // Add more events...
  ];

  const eventTypes = [
    { id: "all", label: "All Events", icon: CalendarIcon },
    { id: "birthday", label: "Birthdays", icon: CakeIcon },
    { id: "anniversary", label: "Anniversaries", icon: HeartIcon },
    { id: "celebration", label: "Celebrations", icon: GiftIcon },
  ];

  const handleCreateEvent = (formData) => {
    notify("Event created successfully!", "success");
    setIsCreating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Family Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Plan and organize your family gatherings
          </p>
        </div>
        <Button
          variant="primary"
          icon={<PlusIcon className="h-5 w-5" />}
          onClick={() => setIsCreating(true)}
        >
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search events..."
          className="max-w-2xl"
        />

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {eventTypes.map((type) => (
            <Button
              key={type.id}
              variant={type.id === "all" ? "primary" : "secondary"}
              icon={<type.icon className="h-5 w-5" />}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            hover
            onClick={() => setSelectedEvent(event)}
            className="cursor-pointer"
          >
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-${event.color}-100 dark:bg-${event.color}-900/30`}
                >
                  <event.icon
                    className={`w-6 h-6 text-${event.color}-600 dark:text-${event.color}-400`}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-2" />
                  {event.participants.length} attendees
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Details Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div
                className={`p-4 rounded-lg bg-${selectedEvent.color}-100 dark:bg-${selectedEvent.color}-900/30`}
              >
                <selectedEvent.icon
                  className={`w-8 h-8 text-${selectedEvent.color}-600 dark:text-${selectedEvent.color}-400`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedEvent.type}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Date & Time
                  </h4>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    {selectedEvent.date} at {selectedEvent.time}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Location
                  </h4>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {selectedEvent.location}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Attendees
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Description
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedEvent.description}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  notify("Event added to calendar!", "success");
                  setSelectedEvent(null);
                }}
              >
                Add to Calendar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        title="Create New Event"
      >
        <div className="space-y-4">
          {/* Add form fields for creating new event */}
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateEvent}>
              Create Event
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default EventsPage;
