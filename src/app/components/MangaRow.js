
"use client";

import { useRef, useEffect, useState } from 'react';
import MangaCard from './MangaCard';

export default function MangaRow({ title, mangas }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  // Auto scroll animation
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    let scrollInterval;
    let direction = 1;
    
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScroll - 10) {
            direction = -1;
          } else if (container.scrollLeft <= 10) {
            direction = 1;
          }
          
          container.scrollLeft += direction * 0.5;
        }
      }, 30);
    };
    
    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };
    
    startScrolling();
    
    return () => {
      stopScrolling();
    };
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  if (!mangas || mangas.length === 0) {
    return (
      <div className="my-8 glass-panel p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="p-8 text-center bg-[var(--ultra-violet)] bg-opacity-20 rounded-lg border border-[var(--slate-blue)] border-opacity-20">
          <div className="animate-pulse flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--slate-blue)] opacity-50"></div>
          </div>
          <p className="text-gray-300">Loading manga data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-12 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>
        <div className="flex space-x-1.5">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-md bg-[var(--ultra-violet)] bg-opacity-40 hover:bg-opacity-60 transition-colors"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-md bg-[var(--ultra-violet)] bg-opacity-40 hover:bg-opacity-60 transition-colors"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="scrollable-container relative flex gap-6 pb-8 pt-2 overflow-x-auto"
        onMouseEnter={() => {
          setIsPaused(true);
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setShowControls(false);
        }}
      >
        {mangas.map((manga, index) => (
          <div 
            key={index} 
            className="w-[180px] flex-shrink-0 transform transition-all duration-300"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              opacity: 1
            }}
          >
            <MangaCard manga={manga} />
          </div>
        ))}
      </div>
    </div>
  );
}
