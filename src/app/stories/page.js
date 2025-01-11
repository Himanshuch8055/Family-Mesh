import React from 'react';

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "The Mountain Adventure",
      author: "John Doe",
      date: "Jan 15, 2024",
      excerpt: "A thrilling tale of mountain climbing and survival...",
      image: "https://picsum.photos/200/300.jpg",
    },
    {
      id: 2,
      title: "Ocean Discovery",
      author: "Jane Smith",
      date: "Jan 12, 2024",
      excerpt: "Exploring the depths of the mysterious ocean...",
      image: "https://picsum.photos/200/300.jpg",
    },
    {
      id: 3,
      title: "City Lights",
      author: "Mike Johnson",
      date: "Jan 10, 2024",
      excerpt: "A story about life in the bustling metropolis...",
      image: "https://picsum.photos/200/300.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Stories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <span>{story.author}</span>
                <span className="mx-2">•</span>
                <span>{story.date}</span>
              </div>
              <p className="text-gray-600 mb-4">{story.excerpt}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;