"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const TimelinePage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const events = [
    {
      id: 1,
      title: "Sarah's Wedding",
      date: "2023-06-15",
      description: "A beautiful summer wedding ceremony",
      image: "/wedding.jpg",
      category: "Celebration",
    },
    {
      id: 2,
      title: "Family Migration",
      date: "1950-01-01",
      description: "Family moved from their hometown to the current city",
      location: "New York, USA",
      category: "migration",
      participants: ["John Smith", "Mary Smith", "James Smith"],
      icon: <ChevronRightIcon className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-600",
      image: "https://via.placeholder.com/800x600",
      isImportant: true,
    },
    {
      id: 3,
      title: "Family Business",
      date: "1975-07-01",
      description: "Started the family business - Smith & Sons Trading Co.",
      location: "Chicago, USA",
      category: "business",
      participants: ["James Smith", "Robert Smith"],
      icon: <ChevronRightIcon className="w-5 h-5 text-green-600" />,
      color: "bg-green-600",
      image: "https://via.placeholder.com/800x600",
      isImportant: false,
    },
    {
      id: 4,
      title: "Family Reunion",
      date: "2000-12-25",
      description: "First major family reunion with all members",
      location: "Los Angeles, USA",
      category: "reunion",
      participants: ["All family members"],
      icon: <ChevronRightIcon className="w-5 h-5 text-yellow-600" />,
      color: "bg-yellow-600",
      image: "https://via.placeholder.com/800x600",
      isImportant: true,
    },
    {
      id: 5,
      title: "New Family Home",
      date: "2023-08-15",
      description: "Purchased and moved into the new family estate",
      location: "San Francisco, USA",
      category: "milestone",
      participants: ["Current generation"],
      icon: <ChevronRightIcon className="w-5 h-5 text-purple-600" />,
      color: "bg-purple-600",
      image: "https://via.placeholder.com/800x600",
      isImportant: true,
    },
  ];

  const categories = [
    { id: "all", name: "All Events", color: "bg-gray-600" },
    { id: "migration", name: "Migration", color: "bg-blue-600" },
    { id: "business", name: "Business", color: "bg-green-600" },
    { id: "reunion", name: "Reunion", color: "bg-yellow-600" },
    { id: "milestone", name: "Milestone", color: "bg-purple-600" },
    { id: "Celebration", name: "Celebration", color: "bg-blue-600" },
  ];

  const filteredEvents = events
    .filter((event) => filter === "all" || event.category === filter)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Family Timeline
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track important family moments and milestones
          </p>
        </div>

        <button
          onClick={() => setIsAddingEvent(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category.id
                ? `${category.color} text-white`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>

        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className={`relative flex items-center mb-8 ${
              index % 2 === 0 ? "justify-end" : ""
            }`}
          >
            <div
              className={`w-5/12 ${
                index % 2 === 0 ? "order-1 pl-8" : "order-2 pr-8"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                {event.image && (
                  <div className="relative h-40 mb-4 rounded-md overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {event.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {event.description}
                </p>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  {event.category}
                </span>
              </motion.div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"></div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {selectedEvent.image && (
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedEvent.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedEvent.description}
                </p>
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  {selectedEvent.category}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TimelinePage;