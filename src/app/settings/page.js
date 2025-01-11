"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@headlessui/react";
import { toast } from "react-hot-toast";
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  BellSlashIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      {/* <BackgroundPattern /> */}
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your preferences and account settings
          </p>
        </div>

        {/* Theme Settings */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>Theme Preferences</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === "dark" ? (
                  <MoonIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                ) : (
                  <SunIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {theme === "dark"
                      ? "Use dark theme for reduced eye strain in low light"
                      : "Use light theme for better visibility in bright environments"}
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onChange={toggleTheme}
                className={`${
                  theme === "dark" ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Toggle theme</span>
                <span
                  className={`${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </section>

        {/* Notifications & Privacy */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Privacy & Notifications
          </h2>

          <div className="space-y-4">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {notifications ? (
                  <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                ) : (
                  <BellSlashIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Notifications
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive updates about family events and activities
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onChange={setNotifications}
                className={`${
                  notifications ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    notifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {privacy ? (
                  <LockClosedIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                ) : (
                  <GlobeAltIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Private Profile
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Make your family tree visible only to family members
                  </p>
                </div>
              </div>
              <Switch
                checked={privacy}
                onChange={setPrivacy}
                className={`${
                  privacy ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Enable privacy</span>
                <span
                  className={`${
                    privacy ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
