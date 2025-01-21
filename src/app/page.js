"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  CalendarIcon,
  PhotoIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from '@/context/ThemeContext';

const features = [
  {
    name: "Family Tree Visualization",
    description:
      "Create and visualize your family connections with our interactive family tree builder.",
    icon: UserGroupIcon,
  },
  {
    name: "Timeline & Statistics",
    description:
      "Track important family events and visualize family statistics over time.",
    icon: ChartBarIcon,
  },
  {
    name: "Photo Gallery",
    description:
      "Store and organize family photos with smart albums and facial recognition.",
    icon: PhotoIcon,
  },
  {
    name: "Events Calendar",
    description:
      "Never miss important family dates with our smart event reminder system.",
    icon: CalendarIcon,
  },
  {
    name: "Memories Collection",
    description:
      "Preserve precious family memories with our digital memory collection feature.",
    icon: HeartIcon,
  },
  {
    name: "Family Stories",
    description: "Document and share family stories for future generations.",
    icon: BookOpenIcon,
  },
];

const testimonials = [
  {
    content:
      "Family Flow has transformed how we preserve our family history. It's intuitive and beautiful!",
    author: "Sarah Johnson",
    role: "Family Historian",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    content:
      "The best platform for keeping our growing family connected across continents.",
    author: "Michael Chen",
    role: "Parent of 3",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    content:
      "Finally, a modern solution for managing family memories and connections!",
    author: "Emma Rodriguez",
    role: "Digital Archivist",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 sm:pt-24 lg:pt-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-90"></div>
          <div className="absolute -top-[50rem] -left-[50rem] h-[100rem] w-[100rem] rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <motion.div
              className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Preserve Your</span>
                <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300">
                  Family Legacy
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-8">
                Connect generations, preserve memories, and build your family's
                digital legacy with Family Flow - the modern platform for family
                history and connections.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-4 text-base font-semibold text-white shadow-lg hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started Free
                  <ArrowRightIcon
                    className="ml-3 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-700 px-8 py-4 text-base font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transform hover:scale-105 transition-all duration-200"
                >
                  Watch Demo
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative mx-auto w-full rounded-2xl  lg:max-w-md overflow-hidden">
                <img
                  src={"./family1.png"}
                  alt="Family Flow App Interface"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to preserve your family history
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Powerful features designed to help you connect, organize, and
              celebrate your family's journey.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute -top-4 left-4">
                  <span className="inline-flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900 p-3">
                    <feature.icon
                      className="h-6 w-6 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Loved by families worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              See what our users are saying about their experience with Family
              Flow.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg"
              >
                <div className="relative">
                  <svg
                    className="absolute -top-4 -left-4 h-8 w-8 text-gray-200 dark:text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-lg text-gray-600 dark:text-gray-300">
                    {testimonial.content}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-90"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start preserving your family legacy today
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of families who trust Family Flow to keep their
              memories alive.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-4 text-base font-semibold text-white shadow-lg hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRightIcon
                  className="ml-3 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
