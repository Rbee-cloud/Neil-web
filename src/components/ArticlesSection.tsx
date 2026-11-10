import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Bookmark, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';

interface ArticlesSectionProps {
  onSelectArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSave: (id: string) => void;
}

const CATEGORIES = [
  'All',
  'Business & Markets',
  'Philosophy & Society',
  'Tech & Media',
  'Culture & Arts',
  'Personal Essays',
] as const;

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  onSelectArticle,
  savedArticleIds,
  onToggleSave,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Exclude the long research paper from the general essay listing since it has its own dedicated section
      if (article.category === 'Research' && activeCategory !== 'All') {
        return false;
      }
      
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;
      
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="writings" className="py-20 md:py-24 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
              <span>Writings &amp; Commentary</span>
              <span aria-hidden="true">/</span>
              <span>The OHS Observer &amp; Notebook</span>
            </div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
              Essays, Columns &amp; Inquiries
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search essays, tags, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-stone-200/60 dark:border-stone-800/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 shadow-2xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => {
            const isSaved = savedArticleIds.includes(article.id);
            return (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group relative bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-all hover:shadow-xs cursor-pointer"
              >
                <div>
                  {/* Clean unboxed metadata line with typographic separators (No pills!) */}
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-stone-800 dark:text-stone-300 font-medium">
                        {article.publication}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(article.id);
                      }}
                      title={isSaved ? 'Remove from bookmarks' : 'Save for later'}
                      className="p-1 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                {/* Footer: Tags and Read CTA */}
                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span key={tag}>
                        #{tag}
                        {idx < 2 && article.tags.length > idx + 1 && <span className="ml-1 opacity-40">/</span>}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 dark:text-stone-100 group-hover:translate-x-0.5 transition-transform">
                    <span>Read piece</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 border border-dashed border-stone-200 dark:border-stone-800 rounded-lg">
            <p className="font-serif text-lg text-stone-700 dark:text-stone-300">
              No articles found matching "{searchQuery}"
            </p>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting All categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-medium text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 rounded-md"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
