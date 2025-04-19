
import Image from 'next/image';
import Link from 'next/link';

export default function MangaCard({ manga }) {
  // Process the thumbnail URL properly
  const processThumbnailUrl = (url) => {
    if (!url) return "https://placehold.co/200x300/262644/9090ff?text=No+Cover";
    
    // Remove escape characters and any trailing '#'
    let processedUrl = url.replace(/\\/g, '').replace(/#$/, '');
    
    // Ensure URL is properly formed
    if (!processedUrl.startsWith('http')) {
      processedUrl = `https:${processedUrl}`;
    }
    
    return processedUrl;
  };
  
  const thumbnailUrl = processThumbnailUrl(manga.thumbnail_url);
  
  return (
    <Link href={`/manga/${manga.id}`} className="card group transform transition-all duration-200 hover:-translate-y-1">
      <div className="relative h-[240px] w-full overflow-hidden rounded-md">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--space-cadet)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity z-10"></div>
        <Image 
          src={thumbnailUrl}
          alt={manga.title || "Manga Cover"}
          fill
          sizes="(max-width: 640px) 150px, 200px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          priority={true}
          unoptimized
        />
        
        {/* Status badge */}
        {manga.status && (
          <div className="absolute top-2 right-2 z-20 bg-[var(--slate-blue)] bg-opacity-70 px-1.5 py-0.5 rounded text-xs font-medium">
            {manga.status}
          </div>
        )}
      </div>
      <div className="p-2 bg-[var(--ultra-violet)] bg-opacity-70 rounded-b-md">
        <h3 className="text-xs font-medium line-clamp-2 text-white group-hover:text-[var(--tropical-indigo)] transition-colors">
          {manga.title}
        </h3>
      </div>
    </Link>
  );
}
