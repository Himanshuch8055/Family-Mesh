"use client"

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Surname = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      setTimeout(() => {
        const mockResults = [
          {
            id: 1,
            surname: "Smith",
            count: 150,
            regions: ["North America", "Europe"],
          },
          { id: 2, surname: "Smithson", count: 75, regions: ["Europe"] },
          { id: 3, surname: "Smithfield", count: 45, regions: ["Australia"] },
        ].filter((result) =>
          result.surname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(mockResults);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Surname Search
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a surname..."
              className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Search Results */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching surnames...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <div className="grid gap-4">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {result.surname}
                    </h3>
                    <div className="mt-2 text-gray-600">
                      <p>Found in {result.count} family records</p>
                      <div className="mt-2">
                        <p className="font-medium">Common Regions:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.regions.map((region, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : searchQuery && !isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No results found for "{searchQuery}"
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Surname;
