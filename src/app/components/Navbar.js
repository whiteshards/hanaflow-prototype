"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar({ currentSource, setCurrentSource }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const sources = [
    { id: 'comick', name: 'ComicK' },
    { id: 'nhentai', name: 'NHentai' },
  ];

  return (
    <header className="bg-[var(--space-cadet)] shadow backdrop-blur-sm sticky top-0 z-50 border-b border-[var(--slate-blue)] border-opacity-20">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-semibold text-white relative group">
          <span className="text-[var(--tropical-indigo)]">
            HanaFlow
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--tropical-indigo)] opacity-70 transition-all duration-200 group-hover:w-full"></span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-xl mx-6">
          <div className="relative flex-grow">
            <input
              type="search"
              placeholder="Search for manga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar flex-grow pl-9"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            type="submit" 
            className="ml-2 py-2 px-3 bg-[var(--tropical-indigo)] hover:bg-[var(--risd-blue)] rounded-md text-white font-medium transition-colors"
          >
            Search
          </button>
        </form>

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 bg-[var(--ultra-violet)] bg-opacity-50 hover:bg-opacity-70 px-3 py-2 rounded-md transition-colors"
          >
            <span className="hidden sm:inline text-sm">Source:</span>
            <span className="font-medium text-sm">{sources.find(s => s.id === currentSource)?.name || currentSource}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform duration-200 ${isMenuOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="dropdown-menu absolute right-0 mt-2 w-48 py-1 z-50">
              {sources.map(source => (
                <div 
                  key={source.id}
                  className={`dropdown-item ${currentSource === source.id ? 'bg-[var(--slate-blue)] bg-opacity-30 font-medium' : ''}`}
                  onClick={() => {
                    setCurrentSource(source.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {source.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSearch} className="md:hidden container pb-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for manga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar w-full pl-10 pr-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </header>
  );
}