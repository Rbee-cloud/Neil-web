import React, { useState, useMemo } from 'react';
import { Search, X, ExternalLink } from 'lucide-react';
import {
  PROJECTS,
  RESEARCH_ITEMS,
  ESSAY_ITEMS,
  CREATIVE_ITEMS,
  EXPERIENCE_ITEMS,
  RECOGNITION_ITEMS,
  EDUCATION_ITEMS,
  SKILL_CATEGORIES,
  CERTIFICATES,
  ARTWORKS,
} from '../data/portfolioData';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  desc?: string;
  link?: string;
  targetSection: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  onSelectProject?: (projectId: string) => void;
}

const QUICK_SEARCH_TAGS = [
  'Leve',
  'Rowbot',
  'Art',
  'Earnings Calls',
  'Amartya Sen',
  'Diana Award',
  'CREST Gold',
  'Python',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  accentColor,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const list: SearchResult[] = [];

    PROJECTS.forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.desc.some((d) => d.toLowerCase().includes(q)) ||
        p.meta.toLowerCase().includes(q)
      ) {
        list.push({
          id: p.id,
          title: p.title,
          subtitle: p.meta,
          category: 'Project',
          desc: p.desc[0],
          link: p.link,
          targetSection: '#work',
        });
      }
    });

    RESEARCH_ITEMS.forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.where.toLowerCase().includes(q) ||
        (r.desc && r.desc.toLowerCase().includes(q))
      ) {
        list.push({
          id: r.id,
          title: r.title,
          subtitle: r.where,
          category: 'Research Paper',
          desc: r.desc,
          link: r.link,
          targetSection: '#writing',
        });
      }
    });

    ESSAY_ITEMS.forEach((e) => {
      if (
        e.title.toLowerCase().includes(q) ||
        e.where.toLowerCase().includes(q) ||
        (e.desc && e.desc.toLowerCase().includes(q))
      ) {
        list.push({
          id: e.id,
          title: e.title,
          subtitle: e.where,
          category: 'Essay',
          desc: e.desc,
          link: e.link,
          targetSection: '#writing',
        });
      }
    });

    CREATIVE_ITEMS.forEach((c) => {
      if (
        c.title.toLowerCase().includes(q) ||
        c.where.toLowerCase().includes(q) ||
        (c.desc && c.desc.toLowerCase().includes(q))
      ) {
        list.push({
          id: c.id,
          title: c.title,
          subtitle: c.where,
          category: 'Poetry & Book',
          desc: c.desc,
          link: c.link,
          targetSection: '#writing',
        });
      }
    });

    EXPERIENCE_ITEMS.forEach((x) => {
      if (
        x.title.toLowerCase().includes(q) ||
        x.desc.toLowerCase().includes(q) ||
        x.where.toLowerCase().includes(q)
      ) {
        list.push({
          id: x.id,
          title: x.title,
          subtitle: x.where,
          category: 'Experience',
          desc: x.desc,
          link: x.link,
          targetSection: '#experience',
        });
      }
    });

    RECOGNITION_ITEMS.forEach((h) => {
      if (h.title.toLowerCase().includes(q) || h.where.toLowerCase().includes(q)) {
        list.push({
          id: h.id,
          title: h.title,
          subtitle: h.where ? `${h.when} · ${h.where}` : h.when,
          category: 'Recognition',
          link: h.link,
          targetSection: '#recognition',
        });
      }
    });

    EDUCATION_ITEMS.forEach((edu) => {
      if (edu.title.toLowerCase().includes(q) || edu.where.toLowerCase().includes(q)) {
        list.push({
          id: edu.id,
          title: edu.title,
          subtitle: edu.where,
          category: 'Education',
          targetSection: '#education',
        });
      }
    });

    SKILL_CATEGORIES.forEach((s, idx) => {
      if (s.items.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
        list.push({
          id: `skill-${idx}`,
          title: `${s.category}: ${s.items}`,
          subtitle: 'Technical & Creative Skills',
          category: 'Skills',
          targetSection: '#education',
        });
      }
    });

    CERTIFICATES.forEach((cert) => {
      if (
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.description && cert.description.toLowerCase().includes(q))
      ) {
        list.push({
          id: cert.id,
          title: cert.title,
          subtitle: `${cert.issuer} (${cert.year})`,
          category: 'Certificate',
          desc: cert.description,
          link: cert.link,
          targetSection: '#certificates',
        });
      }
    });

    ARTWORKS.forEach((art) => {
      if (
        art.title.toLowerCase().includes(q) ||
        art.medium.toLowerCase().includes(q) ||
        art.description.toLowerCase().includes(q)
      ) {
        list.push({
          id: art.id,
          title: art.title,
          subtitle: `${art.medium} (${art.year})`,
          category: 'Artwork',
          desc: art.description,
          targetSection: '#art',
        });
      }
    });

    return list;
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchResult) => {
    onClose();
    if (item.category === 'Project' && onSelectProject) {
      onSelectProject(item.id);
    }
    const elem = document.querySelector(item.targetSection);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search papers, essays, Leve, Rowbot, honors, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base bg-transparent focus:outline-hidden placeholder:text-gray-400 text-gray-900"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            ESC
          </button>
        </div>

        {/* Results List or Quick Prompts */}
        <div className="max-h-96 overflow-y-auto p-2">
          {!query.trim() && (
            <div className="p-6 text-center text-sm text-gray-500">
              <p className="font-medium text-gray-700">Quick Search</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching for "economics", "water", "Locke", "buoy", "compost", "Stanford" or "poetry".
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {QUICK_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No matching entries found for "{query}".
            </div>
          )}

          {results.map((res) => (
            <button
              key={res.id}
              onClick={() => handleSelect(res)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition flex items-start justify-between gap-4 group border-b border-gray-50 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                    {res.category}
                  </span>
                  {res.subtitle && (
                    <span className="text-xs text-gray-400 truncate">{res.subtitle}</span>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition">
                  {res.title}
                </h4>
                {res.desc && (
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{res.desc}</p>
                )}
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-gray-600 shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
