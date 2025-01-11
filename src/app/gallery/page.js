"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const GalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Photos" },
    { id: "recent", label: "Recent" },
    { id: "favorites", label: "Favorites" },
    { id: "albums", label: "Albums" },
  ];

  const images = [
    {
      id: 1,
      src: "https://via.placeholder.com/800x600",
      title: "Family Reunion 2023",
      date: "2023-12-25",
      description: "Annual family gathering at Grandma's house",
      tags: ["reunion", "holiday", "family"],
    },
    {
      id: 2,
      src: "https://via.placeholder.com/800x600",
      title: "Christmas 2022",
      date: "2022-12-25",
      description: "Christmas celebration with the whole family",
      tags: ["christmas", "holiday", "celebration"],
    },
    {
      id: 3,
      src: "https://via.placeholder.com/800x600",
      title: "Summer Vacation",
      date: "2023-07-15",
      description: "Family trip to the beach",
      tags: ["vacation", "summer", "beach"],
    },
    {
      id: 4,
      src: "https://via.placeholder.com/800x600",
      title: "Wedding Anniversary",
      date: "2023-06-20",
      description: "Mom and Dad's 30th wedding anniversary",
      tags: ["anniversary", "celebration", "love"],
    },
    {
      id: 5,
      src: "https://via.placeholder.com/800x600",
      title: "Birthday Party",
      date: "2023-09-10",
      description: "Little Sarah's 5th birthday celebration",
      tags: ["birthday", "party", "children"],
    },
    {
      id: 6,
      src: "https://via.placeholder.com/800x600",
      title: "New Year 2023",
      date: "2023-01-01",
      description: "New Year celebration with fireworks",
      tags: ["newyear", "celebration", "fireworks"],
    },
  ];

  const filteredImages = images.filter((image) => {
    if (searchQuery) {
      return image.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleImageClick = (image) => {
    // setSelectedImage(image);
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // setIsUploading(true);
      // Simulating upload delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // setIsUploading(false);
      // Here you would typically handle the actual file upload
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Family Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Cherish your family memories
          </p>
        </div>

        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
          Upload Photos
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No photos found</p>
        </div>
      )}
    </motion.div>
  );
};

export default GalleryPage;
