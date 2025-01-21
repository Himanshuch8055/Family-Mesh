"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  CalendarIcon,
  HeartIcon,
  BookOpenIcon,
  UserCircleIcon,
  ChartBarIcon,
  ClockIcon,
  PhotoIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    {
      name: "Family Tree",
      href: "/tree",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
    {
      name: "Activities",
      type: "dropdown",
      icon: <ClockIcon className="w-5 h-5" />,
      items: [
        {
          name: "Timeline",
          href: "/timeline",
          icon: <ClockIcon className="w-5 h-5" />,
        },
        {
          name: "Statistics",
          href: "/statistics",
          icon: <ChartBarIcon className="w-5 h-5" />,
        },
        {
          name: "Gallery",
          href: "/gallery",
          icon: <PhotoIcon className="w-5 h-5" />,
        },
      ],
    },
    {
      name: "Events & Memories",
      type: "dropdown",
      icon: <CalendarIcon className="w-5 h-5" />,
      items: [
        {
          name: "Events",
          href: "/events",
          icon: <CalendarIcon className="w-5 h-5" />,
        },
        {
          name: "Memories",
          href: "/memories",
          icon: <HeartIcon className="w-5 h-5" />,
        },
        {
          name: "Stories",
          href: "/stories",
          icon: <BookOpenIcon className="w-5 h-5" />,
        },
      ],
    },
    {
      name: "Discover",
      type: "dropdown",
      icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
      items: [
        {
          name: "Surname Origin",
          href: "/surname",
          icon: <MagnifyingGlassIcon className="w-5 h-5" />,
        },
      ],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    setMobileMenuOpen(false);
  };

  const NavItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (item.type === "dropdown") {
      return (
        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span className="text-gray-400 dark:text-gray-500">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-1 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{subItem.icon}</span>
                      <span>{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <span
          className={`transition-colors duration-200 ${
            pathname === item.href
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400"
          }`}
        >
          {item.icon}
        </span>
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <header
      className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "shadow-lg dark:shadow-gray-800/30"
          : "border-b border-gray-100 dark:border-gray-800"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/"
              className="group flex items-center space-x-2 focus:outline-none"
            >
              <motion.h1
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Family Flow
              </motion.h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </motion.button>

            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/login")}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <UserIcon className="w-5 h-5" />
                <span>Login</span>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
            >
              <div className="space-y-1 px-2 pb-3 pt-2">
                {user && (
                  <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="w-8 h-8 text-gray-400" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                )}

                {navigation.map((item) =>
                  item.type === "dropdown" ? (
                    <div key={item.name} className="space-y-1">
                      <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {item.name}
                      </div>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={({ isActive }) => `
                            flex items-center space-x-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }
                          `}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={({ isActive }) => `
                        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                            : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )
                )}

                {/* Mobile Authentication Button */}
                {user ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      router.push("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Login</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;