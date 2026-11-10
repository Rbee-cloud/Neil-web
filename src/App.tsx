/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Edit3, RotateCcw, Camera, Save, Check } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Writing } from './components/Writing';
import { Experience } from './components/Experience';
import { Recognition } from './components/Recognition';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { Art } from './components/Art';
import { Contact } from './components/Contact';
import { SearchModal } from './components/SearchModal';
import { CvModal } from './components/CvModal';
import { ProjectModal } from './components/ProjectModal';
import { UploadPhotoModal, UploadPhotoTarget } from './components/UploadPhotoModal';
import { ACCENT_THEMES, PROJECTS, Project, AccentTheme } from './data/portfolioData';
import { ContentProvider, useContent } from './context/ContentContext';

const EditModeFloat: React.FC<{
  onOpenPhotos: () => void;
  onSyncBaseCode: () => void;
  syncStatus: string | null;
}> = ({ onOpenPhotos, onSyncBaseCode, syncStatus }) => {
  const { isEditMode, toggleEditMode, resetAllContent } = useContent();

  return (
    <aside
      aria-label="Content edit controls"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg border border-gray-200 text-xs text-gray-800 animate-fade-in"
    >
      <button
        onClick={toggleEditMode}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition cursor-pointer ${
          isEditMode
            ? 'bg-blue-600 text-white shadow-xs'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        title="Toggle inline text editing for About, Leve, Rowbot and portfolio text"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>{isEditMode ? 'Edit Mode: ON' : 'Edit Text'}</span>
      </button>

      <button
        onClick={onOpenPhotos}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
        title="Upload or change photos for Rowbot, Leve, Certificates, and Art"
      >
        <Camera className="w-3.5 h-3.5" />
        <span>Photos</span>
      </button>

      <button
        onClick={onSyncBaseCode}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-xs"
        title="Save all changes permanently into the base code files"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save to Base Code</span>
      </button>

      {syncStatus && (
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold animate-fade-in">
          {syncStatus}
        </span>
      )}

      {isEditMode && (
        <button
          onClick={resetAllContent}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
          title="Reset edited text back to defaults"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      )}
    </aside>
  );
};

function PortfolioAppContent() {
  const [theme, setTheme] = useState<AccentTheme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('anb_theme_id');
      if (stored) {
        const found = ACCENT_THEMES.find((t) => t.id === stored);
        if (found) return found;
      }
    }
    return ACCENT_THEMES[0];
  });

  const [accentColor, setAccentColor] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('anb_accent_color') || theme.color;
    }
    return theme.color;
  });

  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('anb_photo_portrait') || '/src/assets/images/aditya_portrait.jpg';
    }
    return '/src/assets/images/aditya_portrait.jpg';
  });

  const [leveSrc, setLeveSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('anb_photo_leve') || '/src/assets/images/leve_community.jpg';
    }
    return '/src/assets/images/leve_community.jpg';
  });

  const [rowbotSrc, setRowbotSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('anb_photo_rowbot') || '/src/assets/images/rowbot_buoy.jpg';
    }
    return '/src/assets/images/rowbot_buoy.jpg';
  });

  const [certUploads, setCertUploads] = useState<Record<string, string>>({});
  const [artUploads, setArtUploads] = useState<Record<string, string>>({});

  // Sync photos and uploads with base code site-content.json on mount
  useEffect(() => {
    fetch('/site-content.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.portraitSrc && !localStorage.getItem('anb_photo_portrait')) {
            setPortraitSrc(data.portraitSrc);
          }
          if (data.leveSrc && !localStorage.getItem('anb_photo_leve')) {
            setLeveSrc(data.leveSrc);
          }
          if (data.rowbotSrc && !localStorage.getItem('anb_photo_rowbot')) {
            setRowbotSrc(data.rowbotSrc);
          }
          if (data.certUploads && typeof data.certUploads === 'object') {
            setCertUploads((prev) => ({ ...data.certUploads, ...prev }));
          }
          if (data.artUploads && typeof data.artUploads === 'object') {
            setArtUploads((prev) => ({ ...data.artUploads, ...prev }));
          }
        }
      })
      .catch(() => {});
  }, []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Photo Upload Modal state
  const [uploadTarget, setUploadTarget] = useState<UploadPhotoTarget | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isQuickPhotoPickerOpen, setIsQuickPhotoPickerOpen] = useState(false);

  // Sync accent color CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--bold', accentColor);
    localStorage.setItem('anb_accent_color', accentColor);
  }, [accentColor]);

  // Keyboard shortcut listener for Cmd+K search and Escape modal close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCvOpen(false);
        setSelectedProject(null);
        setIsUploadModalOpen(false);
        setIsQuickPhotoPickerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTheme = (t: AccentTheme) => {
    setTheme(t);
    setAccentColor(t.color);
    localStorage.setItem('anb_theme_id', t.id);
    localStorage.setItem('anb_accent_color', t.color);
  };

  const handleOpenUploadPhoto = (target: UploadPhotoTarget) => {
    setUploadTarget(target);
    setIsUploadModalOpen(true);
  };

  const { content, syncToBaseCode } = useContent();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSyncBaseCode = async () => {
    setSyncStatus('Saving to base code...');

    const savedArtMeta: Record<string, any> = {};
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('anb_art_meta_')) {
          try {
            savedArtMeta[key.replace('anb_art_meta_', '')] = JSON.parse(
              localStorage.getItem(key) || '{}'
            );
          } catch {}
        }
      }
    }

    const ok = await syncToBaseCode({
      artworks: savedArtMeta,
      certUploads,
      artUploads,
      leveSrc,
      rowbotSrc,
      portraitSrc,
    });

    if (ok) {
      setSyncStatus('✓ Saved to base code!');
      setTimeout(() => setSyncStatus(null), 3500);
    } else {
      setSyncStatus('Saved locally');
      setTimeout(() => setSyncStatus(null), 3000);
    }
  };

  const handleSavePhoto = (targetId: string, type: string, dataUrl: string) => {
    if (type === 'project') {
      if (targetId === 'leve') {
        setLeveSrc(dataUrl);
        localStorage.setItem('anb_photo_leve', dataUrl);
      } else if (targetId === 'rowbot') {
        setRowbotSrc(dataUrl);
        localStorage.setItem('anb_photo_rowbot', dataUrl);
      }
    } else if (type === 'hero' || targetId === 'portrait') {
      setPortraitSrc(dataUrl);
      localStorage.setItem('anb_photo_portrait', dataUrl);
    } else if (type === 'certificate') {
      localStorage.setItem(`anb_cert_${targetId}`, dataUrl);
      setCertUploads((prev) => ({ ...prev, [targetId]: dataUrl }));
    } else if (type === 'artwork') {
      localStorage.setItem(`anb_art_${targetId}`, dataUrl);
      setArtUploads((prev) => ({ ...prev, [targetId]: dataUrl }));
    }

    // Auto-sync photo to base code in background
    syncToBaseCode({
      leveSrc: targetId === 'leve' ? dataUrl : leveSrc,
      rowbotSrc: targetId === 'rowbot' ? dataUrl : rowbotSrc,
      portraitSrc: targetId === 'portrait' ? dataUrl : portraitSrc,
      certUploads:
        type === 'certificate' ? { ...certUploads, [targetId]: dataUrl } : certUploads,
      artUploads:
        type === 'artwork' ? { ...artUploads, [targetId]: dataUrl } : artUploads,
    }).catch(() => {});
  };

  const handleResetPhoto = (targetId: string, type: string) => {
    if (type === 'project') {
      if (targetId === 'leve') {
        localStorage.removeItem('anb_photo_leve');
        setLeveSrc('/src/assets/images/leve_community.jpg');
      } else if (targetId === 'rowbot') {
        localStorage.removeItem('anb_photo_rowbot');
        setRowbotSrc('/src/assets/images/rowbot_buoy.jpg');
      }
    } else if (type === 'hero' || targetId === 'portrait') {
      localStorage.removeItem('anb_photo_portrait');
      setPortraitSrc('/src/assets/images/aditya_portrait.jpg');
    } else if (type === 'certificate') {
      localStorage.removeItem(`anb_cert_${targetId}`);
      setCertUploads((prev) => {
        const copy = { ...prev };
        delete copy[targetId];
        return copy;
      });
    } else if (type === 'artwork') {
      localStorage.removeItem(`anb_art_${targetId}`);
      setArtUploads((prev) => {
        const copy = { ...prev };
        delete copy[targetId];
        return copy;
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#141414] font-['DM_Sans',system-ui,sans-serif]">
      {/* Navbar with smooth scroll & active section tracking */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCv={() => setIsCvOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        accentColor={accentColor}
        portraitSrc={portraitSrc}
      />

      {/* Main Sections */}
      <main>
        <About accentColor={accentColor} />

        <Work
          accentColor={accentColor}
          onOpenProjectDetail={(p) => setSelectedProject(p)}
          onOpenUploadPhoto={(t) => handleOpenUploadPhoto(t)}
          leveSrc={leveSrc}
          rowbotSrc={rowbotSrc}
        />

        <Writing accentColor={accentColor} />

        <Experience accentColor={accentColor} />

        <Recognition accentColor={accentColor} />

        <Education accentColor={accentColor} />

        <Certificates
          accentColor={accentColor}
          onOpenUploadPhoto={(t) => handleOpenUploadPhoto(t)}
          uploadedImages={certUploads}
        />

        <Art
          accentColor={accentColor}
          onOpenUploadPhoto={(t) => handleOpenUploadPhoto(t)}
          uploadedImages={artUploads}
        />
      </main>

      {/* Contact & Footer Section with Palette Swatches */}
      <Contact
        accentColor={accentColor}
        onSelectTheme={handleSelectTheme}
        onOpenCv={() => setIsCvOpen(true)}
      />

      {/* Floating Edit Controls */}
      <EditModeFloat
        onOpenPhotos={() => setIsQuickPhotoPickerOpen(true)}
        onSyncBaseCode={handleSyncBaseCode}
        syncStatus={syncStatus}
      />

      {/* Quick Photo Picker Modal for Rowbot, Leve, Certificates, Art, Portrait */}
      {isQuickPhotoPickerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-[#141414]"
          onClick={() => setIsQuickPhotoPickerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-gray-900">Upload &amp; Manage Photos</h3>
              </div>
              <button
                onClick={() => setIsQuickPhotoPickerOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Select which item you want to upload a new picture or scan to:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsQuickPhotoPickerOpen(false);
                  handleOpenUploadPhoto({
                    id: 'leve',
                    type: 'project',
                    title: 'Leve Community Project',
                    currentSrc: leveSrc,
                    defaultSrc: '/src/assets/images/leve_community.jpg',
                    aspectRatioHint: '16:9 recommended',
                  });
                }}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    Leve Project Photo
                  </h4>
                  <p className="text-xs text-gray-500">Featured community project image in Work</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 group-hover:bg-blue-600 group-hover:text-white transition">
                  Upload
                </span>
              </button>

              <button
                onClick={() => {
                  setIsQuickPhotoPickerOpen(false);
                  handleOpenUploadPhoto({
                    id: 'rowbot',
                    type: 'project',
                    title: 'Rowbot Buoy Project',
                    currentSrc: rowbotSrc,
                    defaultSrc: '/src/assets/images/rowbot_buoy.jpg',
                    aspectRatioHint: '16:9 recommended',
                  });
                }}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    Rowbot Buoy Photo
                  </h4>
                  <p className="text-xs text-gray-500">Featured buoy telemetry image in Work</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 group-hover:bg-blue-600 group-hover:text-white transition">
                  Upload
                </span>
              </button>

              <button
                onClick={() => {
                  setIsQuickPhotoPickerOpen(false);
                  const el = document.getElementById('certificates');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    Certificates Scans
                  </h4>
                  <p className="text-xs text-gray-500">
                    Upload official awards and credential scans in the Certificates section
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 group-hover:bg-blue-600 group-hover:text-white transition">
                  Go to Section
                </span>
              </button>

              <button
                onClick={() => {
                  setIsQuickPhotoPickerOpen(false);
                  const el = document.getElementById('art');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    Artwork Photos &amp; Studies
                  </h4>
                  <p className="text-xs text-gray-500">
                    Upload high-res artwork photos in the Art section
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 group-hover:bg-blue-600 group-hover:text-white transition">
                  Go to Section
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      <UploadPhotoModal
        isOpen={isUploadModalOpen}
        target={uploadTarget}
        onClose={() => setIsUploadModalOpen(false)}
        onSavePhoto={handleSavePhoto}
        onResetPhoto={handleResetPhoto}
        accentColor={accentColor}
      />

      {/* Quick Search Spotlight Modal (Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        accentColor={accentColor}
        onSelectProject={(projectId) => {
          const p = PROJECTS.find((item) => item.id === projectId);
          if (p) setSelectedProject(p);
        }}
      />

      {/* Printable Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        accentColor={accentColor}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentColor={accentColor}
      />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <PortfolioAppContent />
    </ContentProvider>
  );
}
