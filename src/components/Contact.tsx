import React from 'react';
import { Linkedin, FileText, ArrowUp, Check } from 'lucide-react';
import { ACCENT_THEMES, AccentTheme, LINKEDIN_URL } from '../data/portfolioData';
import { useContent, EditableText } from '../context/ContentContext';

interface ContactProps {
  accentColor: string;
  onSelectTheme: (theme: AccentTheme) => void;
  onOpenCv: () => void;
}

export const Contact: React.FC<ContactProps> = ({
  accentColor,
  onSelectTheme,
  onOpenCv,
}) => {
  const { content } = useContent();
  const { contact } = content;
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="text-white transition-colors duration-500 relative"
      style={{ backgroundColor: accentColor }}
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-28 pb-10">
        <h2 className="text-[clamp(2.6rem,6vw,4.6rem)] font-bold tracking-[-0.035em] leading-[1.05] mb-6">
          <EditableText path="contact.heading" value={contact.heading} tag="span" />
        </h2>

        <p className="max-w-[540px] text-lg sm:text-xl opacity-92 mb-8 font-normal leading-relaxed">
          <EditableText path="contact.subheading" value={contact.subheading} tag="span" />
        </p>

        <div className="flex flex-wrap items-center gap-4 my-8">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition shadow-md hover:scale-[1.02]"
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span>Connect on LinkedIn</span>
          </a>

          <button
            onClick={onOpenCv}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/40 hover:border-white text-white font-semibold text-sm hover:bg-white/10 transition"
          >
            <FileText className="w-4 h-4" />
            <span>View Full Curriculum Vitae</span>
          </button>
        </div>

        {/* Theme Accent Color Palette Swatches */}
        <div className="mt-14 pt-8 border-t border-white/20 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-80 block">
              Site Accent Palette
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {ACCENT_THEMES.map((th) => {
                const isActive = accentColor.toLowerCase() === th.color.toLowerCase();
                return (
                  <button
                    key={th.id}
                    onClick={() => onSelectTheme(th)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform duration-200 flex items-center justify-center ${
                      isActive
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-white/40 hover:border-white hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: th.color }}
                    title={th.name}
                    aria-label={`Select ${th.name} color`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs opacity-75 max-w-xs font-light">
            Caldas da Rainha, Portugal · Student, Researcher &amp; Editor
          </p>
        </div>

        {/* Direct Footer Links */}
        <div className="flex gap-7 mt-12 flex-wrap text-base font-medium">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="opacity-85 hover:opacity-100 hover:underline underline-offset-6 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://www.deleve.eu"
            target="_blank"
            rel="noreferrer"
            className="opacity-85 hover:opacity-100 hover:underline underline-offset-6 transition"
          >
            Leve
          </a>
          <a
            href="https://www.rowbots.eu"
            target="_blank"
            rel="noreferrer"
            className="opacity-85 hover:opacity-100 hover:underline underline-offset-6 transition"
          >
            Rowbot
          </a>
          <button
            onClick={onOpenCv}
            className="opacity-85 hover:opacity-100 hover:underline underline-offset-6 transition text-left cursor-pointer"
          >
            CV (PDF)
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex justify-between items-center flex-wrap gap-4 text-sm opacity-80">
          <span>© {currentYear} Aditya Neil Banerjee</span>
          <a
            href="#top"
            className="inline-flex items-center gap-1 hover:opacity-100 transition no-underline hover:underline underline-offset-4"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
