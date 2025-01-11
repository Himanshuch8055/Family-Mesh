"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowsPointingOutIcon,
  ShareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { ReactFlowProvider } from "reactflow";
import FamilyTree from "@/components/FamilyTree";
import MemberForm from "@/components/MemberForm";

const FamilyTreePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formMode, setFormMode] = useState("add");

  const handleAddMember = useCallback(() => {
    setSelectedMember(null);
    setFormMode("add");
    setIsMemberFormOpen(true);
  }, []);

  const handleEditMember = useCallback((member) => {
    setSelectedMember(member);
    setFormMode("edit");
    setIsMemberFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsMemberFormOpen(false);
    setSelectedMember(null);
  }, []);

  const handleFormSubmit = useCallback((formData) => {
    // Handle form submission
    console.log("Form submitted:", formData);
    setIsMemberFormOpen(false);
    setSelectedMember(null);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Family Tree
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize and manage your family connections
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddMember}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Member
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ShareIcon className="h-5 w-5 mr-2" />
            Share
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search family members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleFullscreen}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors whitespace-nowrap"
        >
          <ArrowsPointingOutIcon className="h-5 w-5 mr-2" />
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </motion.button>
      </div>

      {/* Family Tree Visualization Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-h-[600px] border border-gray-200 dark:border-gray-700">
        <ReactFlowProvider>
          <FamilyTree onEditMember={handleEditMember} />
        </ReactFlowProvider>
      </div>

      {/* Member Form */}
      <AnimatePresence>
        {isMemberFormOpen && (
          <MemberForm
            isOpen={isMemberFormOpen}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            member={selectedMember}
            mode={formMode}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FamilyTreePage;