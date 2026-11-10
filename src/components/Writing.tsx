import React, { useState } from 'react';
import { ExternalLink, FileText, BookOpen, Feather } from 'lucide-react';
import {
  RESEARCH_ITEMS,
  ESSAY_ITEMS,
  CREATIVE_ITEMS,
  WritingItem,
} from '../data/portfolioData';

interface WritingProps {
  accentColor: string;
}

export const Writing: React.FC<WritingProps> = ({ accentColor }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'research' | 'essays' | 'creative'>('all');

  const renderItem = (item: WritingItem) => (
    <div
      key={item.id}
      className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-2 sm:gap-6 py-5 border-b border-[#e8e8e8] last:border-b-0 group"
    >
      <span className="text-[#6b6b6b] text-[0.9rem] pt-0.5 font-normal">{item.when}</span>

      <div>
        <h5 className="text-[1.08rem] font-semibold leading-[1.4] text-[#141414] group-hover:text-black">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
              style={{ color: accentColor }}
            >
              <span>{item.title}</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          ) : (
            item.title
          )}
        </h5>

        {item.where && (
          <div className="text-[#6b6b6b] text-[0.92rem] mt-0.5 font-normal flex flex-wrap items-center gap-2">
            <span>{item.where}</span>
            {item.tags && item.tags.length > 0 && (
              <span className="inline-flex gap-1 text-[11px]">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-1.5 py-0.2 bg-gray-100 text-gray-600 rounded font-normal"
                  >
                    #{tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        )}

        {item.desc && (
          <p className="text-[0.95rem] mt-1.5 max-w-[640px] text-[#333] leading-relaxed">
            {item.desc}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section id="writing" className="border-t border-[#e8e8e8]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8 py-20 sm:py-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        {/* Sticky Sidebar */}
        <div className="md:sticky md:top-28 self-start space-y-3">
          <h2
            className="text-xs uppercase tracking-[0.14em] font-bold transition-colors"
            style={{ color: accentColor }}
          >
            Research &amp; Writing
          </h2>

          <div className="flex md:flex-col flex-wrap gap-1 text-xs pt-1">
            {[
              { id: 'all', label: 'All Writing' },
              { id: 'research', label: 'Research' },
              { id: 'essays', label: 'Essays & Papers' },
              { id: 'creative', label: 'Poetry & Books' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1 text-left rounded transition text-xs font-medium ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Column */}
        <div>
          {/* Research Section */}
          {(activeTab === 'all' || activeTab === 'research') && (
            <div className="mb-12">
              <h4 className="text-xs uppercase tracking-[0.14em] text-[#6b6b6b] font-semibold mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>Research</span>
              </h4>
              <div className="border-t border-[#e8e8e8]">
                {RESEARCH_ITEMS.map((item) => renderItem(item))}
              </div>
            </div>
          )}

          {/* Essays Section */}
          {(activeTab === 'all' || activeTab === 'essays') && (
            <div className="mb-12">
              <h4 className="text-xs uppercase tracking-[0.14em] text-[#6b6b6b] font-semibold mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>Essays &amp; papers</span>
              </h4>
              <div className="border-t border-[#e8e8e8]">
                {ESSAY_ITEMS.map((item) => renderItem(item))}
              </div>
            </div>
          )}

          {/* Creative Section */}
          {(activeTab === 'all' || activeTab === 'creative') && (
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-[0.14em] text-[#6b6b6b] font-semibold mb-2 flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span>Poetry &amp; books</span>
              </h4>
              <div className="border-t border-[#e8e8e8]">
                {CREATIVE_ITEMS.map((item) => renderItem(item))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
