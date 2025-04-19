
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import MangaCard from '../components/MangaCard';
import { searchManga } from '../services/api';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentSource, setCurrentSource] = useState('comick');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    async function performSearch() {
      setLoading(true);
      try {
        const results = await searchManga(query, currentSource);
        setSearchResults(results.results || []);
      } catch (error) {
        console.error('Error searching manga:', error);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query, currentSource]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--space-cadet)] to-[var(--ultra-violet)]">
      <Navbar currentSource={currentSource} setCurrentSource={setCurrentSource} />
      
      <div className="container py-10">
        <div className="header-section">
          <h1 className="text-3xl font-bold mb-3 text-white">
            Search Results for: <span className="text-[var(--tropical-indigo)]">{query}</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Source:</span>
            <span className="px-4 py-1.5 bg-[var(--slate-blue)] rounded-full text-white text-sm font-medium shadow-inner shadow-black/30">
              {currentSource === 'comick' ? 'ComicK' : 'NHentai'}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="glass-panel p-16 grid place-items-center h-80">
            <div className="text-center">
              <div className="animate-spin w-16 h-16 border-4 border-[var(--tropical-indigo)] border-t-transparent rounded-full mb-6 mx-auto"></div>
              <p className="text-xl font-medium text-gray-200">Searching for manga...</p>
              <p className="text-gray-400 mt-2">This may take a moment</p>
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="glass-panel p-16 text-center border border-[var(--slate-blue)] border-opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-6 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl mb-3 font-semibold text-[var(--tropical-indigo)]">No manga found</h3>
            <p className="text-gray-300 max-w-md mx-auto">We couldn't find any manga matching your search. Try a different search term or check another source.</p>
            
            <div className="mt-8 flex justify-center space-x-4">
              <button onClick={() => setCurrentSource(currentSource === 'comick' ? 'nhentai' : 'comick')} 
                className="btn btn-primary">
                Try {currentSource === 'comick' ? 'NHentai' : 'ComicK'} source
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-300 mb-6">Found {searchResults.length} results</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {searchResults.map((manga, index) => (
                <div 
                  key={index} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MangaCard manga={manga} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
