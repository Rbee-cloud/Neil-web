/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

  const { syncToBaseCode } = useContent();

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
