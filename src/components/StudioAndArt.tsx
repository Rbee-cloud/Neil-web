import React, { useState } from 'react';
import { Palette, Waves, BookOpen, Music, Utensils, Maximize2, X } from 'lucide-react';
import { BIO_DATA, Artwork } from '../data/bio';

export const StudioAndArt: React.FC = () => {
  const { artworks, influences } = BIO_DATA;
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);

  return (
    <section id="studio" className="py-20 md:py-24 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            <Palette className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Multidisciplinary Notebook</span>
            <span aria-hidden="true">/</span>
            <span>Digital Canvas &amp; Atlantic Life</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            From São Paulo to the Atlantic Shore
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            Writing does not exist in isolation. Digital brushwork, cold-water swimming, culinary experimentation, 
            and an eclectic reading habit continually shape how I observe and construct ideas.
          </p>
        </div>

        {/* Featured Artwork Gallery Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
              Digital Tablet Paintings &amp; Studies
            </h3>
            <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
              Click to enlarge &amp; view notes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <div
                key={art.id}
                onClick={() => setActiveArtwork(art)}
                className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2 bg-white/90 text-stone-900 rounded-full shadow-xs">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-mono text-[11px]">{art.year}</span>
                    <span className="font-mono text-[11px]">{art.medium.split(',')[0]}</span>
                  </div>
                  <h4 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 font-light">
                    {art.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Life & Intellectual Anchors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
          
          {/* Card 1: Open Water Swimming */}
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase">
              <Waves className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Atlantic Waters</span>
            </div>
            <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
              Open-Water Swimming
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              Early morning training against Atlantic swells. A rigorous ritual of focus that strips away digital noise 
              and builds somatic endurance.
            </p>
          </div>

          {/* Card 2: Culinary Experimentation */}
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase">
              <Utensils className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>The Kitchen</span>
            </div>
            <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
              Culinary Alchemy
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              Testing recipes that fuse Brazilian tropical flavors with Portuguese seafood traditions. Cooking as a deliberate, 
              slow craft of composition.
            </p>
          </div>

          {/* Card 3: Sound & Playlists */}
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase">
              <Music className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Acoustic Memory</span>
            </div>
            <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
              Curated Soundscapes
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              From Bossa Nova and MPB to neoclassical piano, post-bop jazz, and ambient electronic music supporting deep 
              writing flow.
            </p>
          </div>

          {/* Card 4: Equestrianism */}
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase">
              <span className="font-mono text-[11px] font-bold text-emerald-600">EQ</span>
              <span>Horsemanship</span>
            </div>
            <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
              Equestrian Focus
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              Riding along coastal trails. Learning non-verbal communication, posture, and reciprocal balance with a 
              living partner.
            </p>
          </div>

        </div>

        {/* Bookshelf & Intellectual Lineage */}
        <div className="mt-16 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Intellectual Desk</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mb-6">
            Core Influences &amp; Required Reading
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {influences.map((inf) => (
              <div key={inf.author} className="space-y-1.5 p-4 rounded bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {inf.author}
                  </span>
                  <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400">
                    {inf.theme}
                  </span>
                </div>
                <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300">
                  {inf.work}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light pt-1">
                  {inf.note}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Artwork Lightbox Modal */}
      {activeArtwork && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveArtwork(null)}
        >
          <div
            className="bg-stone-900 border border-stone-800 rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activeArtwork.image}
                alt={activeArtwork.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <button
                onClick={() => setActiveArtwork(null)}
                className="absolute top-4 right-4 p-2 bg-stone-950/70 text-white rounded-full hover:bg-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-white bg-stone-900">
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                <span>{activeArtwork.medium}</span>
                <span>{activeArtwork.year}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium mt-1">
                {activeArtwork.title}
              </h3>
              <p className="mt-2 text-sm text-stone-300 font-light leading-relaxed">
                {activeArtwork.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
