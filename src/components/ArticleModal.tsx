import React, { useState, useEffect } from 'react';
import { X, Bookmark, BookmarkCheck, Share2, Check, Type, ArrowLeft } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + article.id);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg max-w-3xl w-full my-auto overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Reading Controls Bar */}
        <div className="sticky top-0 z-20 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Archive</span>
          </button>

          {/* Reader Preferences & Actions */}
          <div className="flex items-center gap-3">
            {/* Font Family Toggle */}
            <div className="hidden sm:inline-flex rounded-md border border-stone-200 dark:border-stone-800 p-0.5 bg-stone-100 dark:bg-stone-900 text-[11px] font-mono">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2 py-0.5 rounded ${fontFamily === 'serif' ? 'bg-white dark:bg-stone-800 font-semibold text-stone-900 dark:text-stone-100 shadow-2xs' : 'text-stone-500'}`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2 py-0.5 rounded ${fontFamily === 'sans' ? 'bg-white dark:bg-stone-800 font-semibold text-stone-900 dark:text-stone-100 shadow-2xs' : 'text-stone-500'}`}
              >
                Sans
              </button>
            </div>

            {/* Font Size Toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              title="Toggle reading text size"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded hover:bg-stone-200/60 dark:hover:bg-stone-800 text-xs flex items-center gap-1"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px]">{fontSize === 'normal' ? '1x' : '1.2x'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(article.id)}
              title={isSaved ? 'Bookmarked' : 'Bookmark'}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded hover:bg-stone-200/60 dark:hover:bg-stone-800"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              title="Copy link to article"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded hover:bg-stone-200/60 dark:hover:bg-stone-800"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded hover:bg-stone-200/60 dark:hover:bg-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Article Content Body */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto">
          
          {/* Header Metadata (Clean unboxed - zero pills) */}
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 mb-3">
            <span className="font-semibold text-stone-800 dark:text-stone-200">{article.publication}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
            {article.title}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light italic pb-6 border-b border-stone-200 dark:border-stone-800">
            {article.subtitle}
          </p>

          {/* Byline */}
          <div className="py-4 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>By Aditya Neil Banerjee</span>
            <span>Vol. Archive</span>
          </div>

          {/* Article Sections */}
          <div
            className={`mt-4 space-y-6 ${
              fontFamily === 'serif' ? 'font-serif' : 'font-sans'
            } ${fontSize === 'normal' ? 'text-base leading-relaxed' : 'text-lg leading-loose'} text-stone-800 dark:text-stone-200`}
          >
            {article.content.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                {sec.sectionHeading && (
                  <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-xl pt-4">
                    {sec.sectionHeading}
                  </h3>
                )}

                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="font-light">
                    {p}
                  </p>
                ))}

                {sec.quote && (
                  <blockquote className="my-6 p-5 rounded-md bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 font-serif italic text-lg leading-relaxed">
                    "{sec.quote}"
                    {sec.quoteAuthor && (
                      <cite className="block not-italic text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
                        — {sec.quoteAuthor}
                      </cite>
                    )}
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 font-mono flex items-center justify-between">
            <span>End of Piece</span>
            <span>The OHS Observer &amp; Research Archive</span>
          </div>

        </div>
      </div>
    </div>
  );
};
