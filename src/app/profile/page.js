"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircleIcon,
  CakeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  PencilIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  ShareIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useNotification } from "@/context/NotificationContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const { notify } = useNotification();
  const [profile, setProfile] = useState({
    name: "John Smith",
    dateOfBirth: "1990-05-15",
    age: 33,
    location: "New York, USA",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    occupation: "Software Engineer",
    bio: "Loving father of two, dedicated husband, and passionate about family history.",
    relationships: [
      { type: "Spouse", name: "Sarah Smith", since: "2015" },
      { type: "Child", name: "Emma Smith", age: 7 },
      { type: "Child", name: "James Smith", age: 5 },
      { type: "Parent", name: "Robert Smith", age: 65 },
      { type: "Parent", name: "Mary Smith", age: 62 },
    ],
    timeline: [
      {
        date: "2023-12-25",
        event: "Family Christmas Celebration",
        type: "event",
      },
      {
        date: "2023-11-30",
        event: "Emma's School Performance",
        type: "achievement",
      },
      {
        date: "2023-10-15",
        event: "Family Vacation to Hawaii",
        type: "travel",
      },
      {
        date: "2023-09-01",
        event: "James Started Kindergarten",
        type: "milestone",
      },
    ],
    stats: {
      familyMembers: 12,
      eventsAttended: 24,
      photosShared: 156,
      storiesShared: 18,
    },
  });

  const handleSave = () => {
    notify("Profile updated successfully!", "success");
    setIsEditing(false);
  };

  const handlePhotoUpload = (event) => {
    // Handle photo upload logic
    notify("Profile photo updated successfully!", "success");
    setIsPhotoModalOpen(false);
  };

  const tabContents = {
    personal: (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CakeIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-gray-900 dark:text-white block">
                      {profile.dateOfBirth}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {profile.age} years old
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {profile.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BriefcaseIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {profile.occupation}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {profile.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {profile.email}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile.bio}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profile.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    ),
    relationships: (
      <Card>
        <CardHeader>
          <CardTitle>Family Relationships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.relationships.map((relation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <HeartIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {relation.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {relation.type}
                      </span>
                      {relation.since && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Since {relation.since}
                          </span>
                        </>
                      )}
                      {relation.age && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {relation.age} years old
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                >
                  Message
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    ),
    timeline: (
      <Card>
        <CardHeader>
          <CardTitle>Recent Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {profile.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-gray-200 dark:bg-gray-700" />
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 -translate-x-1/2" />
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {item.event}
                  </p>
                  <div className="inline-flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.type === "event"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.type === "achievement"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : item.type === "travel"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-600 dark:to-blue-700 rounded-full p-1"
              >
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                  <UserCircleIcon className="w-20 h-20 text-blue-600 dark:text-blue-400" />
                </div>
              </motion.div>
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow group-hover:scale-110"
              >
                <PhotoIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.name}
                </h1>
                <ShareIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {profile.occupation}
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {profile.location}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-4 h-4" />
                <span>Last active 2 hours ago</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              icon={<ShareIcon className="h-5 w-5" />}
            >
              Share Profile
            </Button>
            <Button
              variant="primary"
              icon={<PencilIcon className="h-5 w-5" />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mt-8 border-b border-gray-200 dark:border-gray-700">
          {["personal", "relationships", "timeline"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {tabContents[activeTab]}
        </motion.div>
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Occupation
            </label>
            <input
              type="text"
              value={profile.occupation}
              onChange={(e) =>
                setProfile({ ...profile, occupation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Photo Upload Modal */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Update Profile Photo"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="photo-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                  Drop a file or click to upload
                </span>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsPhotoModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsPhotoModalOpen(false)}
            >
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Profile;
