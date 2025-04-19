"use client";

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MangaRow from './components/MangaRow';
import { getPopularManga, getLatestManga } from './services/api';

export default function Home() {
  const [currentSource, setCurrentSource] = useState('comick');
  const [popularManga, setPopularManga] = useState([]);
  const [latestManga, setLatestManga] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [popularData, latestData] = await Promise.all([
          getPopularManga(currentSource),
          getLatestManga(currentSource)
        ]);

        setPopularManga(popularData.results || []);
        setLatestManga(latestData.results || []);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentSource]);

  // For demo purposes when API doesn't respond
  const demoManga = Array(10).fill(null).map((_, i) => ({
    id: `demo-${i}`,
    title: `Manga Title ${i + 1}`,
    cover: null
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--space-cadet)] to-[var(--ultra-violet)]">
      <Navbar currentSource={currentSource} setCurrentSource={setCurrentSource} />

      <div className="container py-8">
        <div className="py-6 mb-6 border-b border-[var(--slate-blue)] border-opacity-10">
          <h1 className="text-2xl font-semibold mb-2 text-white">Welcome to <span className="text-[var(--tropical-indigo)]">HanaFlow</span></h1>
          <p className="text-gray-400 max-w-2xl text-sm">Discover and explore your favorite manga from different sources.</p>
        </div>

        <MangaRow 
          title="Popular Manga" 
          mangas={loading ? demoManga : (popularManga.length ? popularManga : demoManga)} 
        />

        <MangaRow 
          title="Latest Updates" 
          mangas={loading ? demoManga : (latestManga.length ? latestManga : demoManga)} 
        />
      </div>
    </main>
  );
}