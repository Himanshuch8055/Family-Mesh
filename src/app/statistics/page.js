"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const StatisticsPage = () => {
  const [activeChart, setActiveChart] = useState("relationships");

  const stats = [
    {
      id: 1,
      name: "Total Family Members",
      value: "156",
      change: "+12",
      changeType: "increase",
      icon: UsersIcon,
    },
    {
      id: 2,
      name: "Generations",
      value: "5",
      change: "+1",
      changeType: "increase",
      icon: UserGroupIcon,
    },
    {
      id: 3,
      name: "Countries",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: GlobeAltIcon,
    },
    {
      id: 4,
      name: "Family Events",
      value: "48",
      change: "+8",
      changeType: "increase",
      icon: CalendarIcon,
    },
  ];

  const charts = [
    {
      id: "relationships",
      name: "Family Relationships",
      icon: UserGroupIcon,
      description: "Distribution of family relationships and connections",
    },
    {
      id: "demographics",
      name: "Demographics",
      icon: ChartPieIcon,
      description: "Age and gender distribution across generations",
    },
    {
      id: "locations",
      name: "Geographic Distribution",
      icon: MapPinIcon,
      description: "Where family members are located globally",
    },
    {
      id: "timeline",
      name: "Historical Timeline",
      icon: ArrowTrendingUpIcon,
      description: "Key events and milestones in family history",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Family Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Insights and analytics about your family tree
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-center space-x-1">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  this year
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Chart Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto p-4 space-x-4">
            {charts.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeChart === chart.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <chart.icon className="h-5 w-5 mr-2" />
                {chart.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {charts.find((c) => c.id === activeChart)?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {charts.find((c) => c.id === activeChart)?.description}
            </p>
          </div>

          {/* Chart Placeholder */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                Chart visualization will appear here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    New family member added
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    2 days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Facts
          </h3>
          <div className="space-y-4">
            {[
              "Most common surname: Smith",
              "Average family size: 4.2 members",
              "Oldest family record: 1850",
            ].map((fact, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <ChartPieIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-gray-900 dark:text-white">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatisticsPage;