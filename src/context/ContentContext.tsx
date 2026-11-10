import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Edit3, Check, RotateCcw } from 'lucide-react';
import {
  PORTFOLIO_CONTENT,
  PROJECTS,
  OTHER_ITEMS,
  RESEARCH_ITEMS,
  ESSAY_ITEMS,
  CREATIVE_ITEMS,
  EXPERIENCE_ITEMS,
  RECOGNITION_ITEMS,
  EDUCATION_ITEMS,
  SKILL_CATEGORIES,
  Project,
} from '../data/portfolioData';

export interface SiteContent {
  hero: typeof PORTFOLIO_CONTENT.hero;
  about: typeof PORTFOLIO_CONTENT.about;
  work: {
    projects: Project[];
    otherItems: typeof OTHER_ITEMS;
  };
  writing: {
    researchItems: typeof RESEARCH_ITEMS;
    essayItems: typeof ESSAY_ITEMS;
    creativeItems: typeof CREATIVE_ITEMS;
  };
  experience: {
    items: typeof EXPERIENCE_ITEMS;
  };
  recognition: {
    items: typeof RECOGNITION_ITEMS;
  };
  education: {
    items: typeof EDUCATION_ITEMS;
    skills: typeof SKILL_CATEGORIES;
  };
  contact: typeof PORTFOLIO_CONTENT.contact;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: { ...PORTFOLIO_CONTENT.hero },
  about: { ...PORTFOLIO_CONTENT.about },
  work: {
    projects: [...PROJECTS],
    otherItems: [...OTHER_ITEMS],
  },
  writing: {
    researchItems: [...RESEARCH_ITEMS],
    essayItems: [...ESSAY_ITEMS],
    creativeItems: [...CREATIVE_ITEMS],
  },
  experience: {
    items: [...EXPERIENCE_ITEMS],
  },
  recognition: {
    items: [...RECOGNITION_ITEMS],
  },
  education: {
    items: [...EDUCATION_ITEMS],
    skills: [...SKILL_CATEGORIES],
  },
  contact: { ...PORTFOLIO_CONTENT.contact },
};

const STORAGE_KEY = 'anb_site_content_v2';

interface ContentContextType {
  content: SiteContent;
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;
  updateField: (path: string, value: any) => void;
  resetAllContent: () => void;
  syncToBaseCode: (extraPayload?: Record<string, any>) => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_SITE_CONTENT,
            ...parsed,
            hero: { ...DEFAULT_SITE_CONTENT.hero, ...parsed.hero },
            about: { ...DEFAULT_SITE_CONTENT.about, ...parsed.about },
            work: {
              projects: parsed.work?.projects || DEFAULT_SITE_CONTENT.work.projects,
              otherItems: parsed.work?.otherItems || DEFAULT_SITE_CONTENT.work.otherItems,
            },
            contact: { ...DEFAULT_SITE_CONTENT.contact, ...parsed.contact },
          };
        }
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('anb_edit_mode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save content to localStorage', e);
    }
  }, [content]);

  useEffect(() => {
    localStorage.setItem('anb_edit_mode', isEditMode ? 'true' : 'false');
  }, [isEditMode]);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);
  const setEditMode = (val: boolean) => setIsEditMode(val);

  const updateField = (path: string, value: any) => {
    setContent((prev) => {
      const cloned = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current: any = cloned;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];
        if (current[key] === undefined || current[key] === null) {
          current[key] = !isNaN(Number(nextKey)) ? [] : {};
        }
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;
      return cloned;
    });
  };

  // Load from site-content.json if available
  useEffect(() => {
    fetch('/site-content.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          const payload = data.content ? data.content : data;
          if (payload.about || payload.hero) {
            setContent((prev) => ({
              ...prev,
              ...payload,
              hero: { ...prev.hero, ...(payload.hero || {}) },
              about: { ...prev.about, ...(payload.about || {}) },
              contact: { ...prev.contact, ...(payload.contact || {}) },
            }));
          }
        }
      })
      .catch(() => {});
  }, []);

  const syncToBaseCode = async (extraPayload?: Record<string, any>): Promise<boolean> => {
    try {
      const res = await fetch('/api/sync-to-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ...extraPayload,
        }),
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to sync to base code', e);
      return false;
    }
  };

  const resetAllContent = () => {
    if (window.confirm('Reset all edited text back to original default content?')) {
      localStorage.removeItem(STORAGE_KEY);
      setContent(DEFAULT_SITE_CONTENT);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isEditMode,
        toggleEditMode,
        setEditMode,
        updateField,
        resetAllContent,
        syncToBaseCode,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface EditableTextProps {
  path: string;
  value: string;
  className?: string;
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({
  path,
  value,
  className = '',
  tag: Tag = 'span',
}) => {
  const { isEditMode, updateField } = useContent();
  const [justSaved, setJustSaved] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  const { setEditMode } = useContent();

  if (!isEditMode) {
    return (
      <Tag
        className={`${className} hover:cursor-pointer transition`}
        onDoubleClick={() => setEditMode(true)}
        title="Double-click to edit, or toggle 'Edit' in the section"
      >
        {value}
      </Tag>
    );
  }

  return (
    <span className="relative inline-block group/editable">
      <Tag
        ref={ref as any}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          const newVal = e.currentTarget.innerText.trim();
          if (newVal !== value) {
            updateField(path, newVal);
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
          }
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
          if (
            e.key === 'Enter' &&
            !e.shiftKey &&
            (Tag === 'h1' || Tag === 'h2' || Tag === 'h3' || Tag === 'h4' || Tag === 'h5')
          ) {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        className={`${className} outline-dashed outline-1 outline-blue-400 hover:outline-blue-600 hover:bg-blue-50/20 px-1 py-0.5 rounded cursor-text transition-all`}
        title="Click to edit text. Click outside to save."
      >
        {value}
      </Tag>

      <span className="absolute -top-3 -right-2 hidden group-hover/editable:flex items-center gap-0.5 px-1 py-0.5 bg-blue-600 text-white text-[9px] rounded shadow-xs z-10 pointer-events-none">
        <Edit3 className="w-2.5 h-2.5" />
        <span>Edit</span>
      </span>

      {justSaved && (
        <span className="absolute -top-3 -right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] rounded shadow-xs z-20 animate-fade-in pointer-events-none">
          <Check className="w-2.5 h-2.5" />
          <span>Saved</span>
        </span>
      )}
    </span>
  );
};
