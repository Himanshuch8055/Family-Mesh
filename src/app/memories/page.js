"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Search from "@/components/Search";
import { useNotification } from "@/context/NotificationContext";

const MemoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const { notify } = useNotification();

  const memories = [
    {
      id: 1,
      type: "photo",
      title: "Summer Vacation 2023",
      date: "2023-07-15",
      location: "Beach Resort, Hawaii",
      participants: ["John Smith", "Sarah Smith", "Emma Smith", "James Smith"],
      description:
        "Our first family vacation to Hawaii. Beautiful beaches and unforgettable moments.",
      media: "https://picsum.photos/seed/picsum/350/200",
      likes: 12,
      comments: 5,
    },
    // Add more memories...
  ];

  const memoryTypes = [
    { id: "all", label: "All", icon: HeartIcon },
    { id: "photos", label: "Photos", icon: PhotoIcon },
    { id: "videos", label: "Videos", icon: VideoCameraIcon },
    { id: "documents", label: "Documents", icon: DocumentTextIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Family Memories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Cherish and preserve your family's precious moments
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search memories..."
          className="max-w-2xl"
        />

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {memoryTypes.map((type) => (
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

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <Card
            key={memory.id}
            hover
            onClick={() => setSelectedMemory(memory)}
            className="cursor-pointer"
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={memory.media}
                alt={memory.title}
                className="rounded-lg object-cover"
              />
            </div>
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {memory.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {memory.date}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {memory.location}
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-2" />
                  {memory.participants.length} family members
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <HeartIcon className="w-4 h-4 mr-1" />
                  {memory.likes} likes
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    notify("Memory added to favorites!", "success");
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  <HeartIcon className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Memory Modal */}
      <Modal
        isOpen={!!selectedMemory}
        onClose={() => setSelectedMemory(null)}
        title={selectedMemory?.title}
        size="large"
      >
        {selectedMemory && (
          <div className="space-y-6">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={selectedMemory.media}
                alt={selectedMemory.title}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Details
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {selectedMemory.date}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {selectedMemory.location}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Participants
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.participants.map((participant, index) => (
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
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedMemory.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default MemoriesPage;
