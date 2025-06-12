import React, { createContext, useContext, useState } from 'react';

const BookmarkContext = createContext();

export const useBookmark = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const toggleBookmark = (job) => {
    setBookmarkedJobs((prev) => {
      const isBookmarked = prev.find((j) => j._id === job._id);
     return isBookmarked
  ? prev.filter((j) => j._id !== job._id)
  : [...prev, job];
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedJobs, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
