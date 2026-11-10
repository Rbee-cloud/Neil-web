import React, { useState, useEffect } from 'react';
import { Palette, X, Eye, Upload, Printer, RotateCcw, Edit3, Check } from 'lucide-react';
import { ARTWORKS, ArtworkItem } from '../data/portfolioData';
import { useContent } from '../context/ContentContext';

interface ArtProps {
  accentColor: string;
  onOpenUploadPhoto?: (target: {
    id: string;
    type: 'artwork';
    title: string;
    currentSrc?: string;
  }) => void;
  uploadedImages?: Record<string, string>;
}

export const Art: React.FC<ArtProps> = ({
  accentColor,
  onOpenUploadPhoto,
  uploadedImages = {},
}) => {
  const { isEditMode, toggleEditMode, setEditMode } = useContent();
  const [selectedArtId, setSelectedArtId] = useState<string | null>(null);

  // Editable artworks list initialized from defaults + localStorage saved metadata
  const [artworks, setArtworks] = useState<ArtworkItem[]>(() => {
    if (typeof window !== 'undefined') {
      return ARTWORKS.map((a) => {
        const saved = localStorage.getItem(`anb_art_meta_${a.id}`);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            return { ...a, ...parsed };
          } catch (e) {
            console.error('Failed to parse saved artwork meta', e);
          }
        }
        return a;
      });
    }
    return ARTWORKS;
  });

  // Track uploaded artwork images
  const [localImages, setLocalImages] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      ARTWORKS.forEach((a) => {
        const saved = localStorage.getItem(`anb_art_${a.id}`);
        if (saved) map[a.id] = saved;
      });
    }
    return map;
  });

  useEffect(() => {
    if (Object.keys(uploadedImages).length > 0) {
      setLocalImages((prev) => ({ ...prev, ...uploadedImages }));
    }
  }, [uploadedImages]);

  // Sync with base code site-content.json on mount
  useEffect(() => {
    fetch('/site-content.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.artworks && typeof data.artworks === 'object') {
            setArtworks((prev) =>
              prev.map((item) => {
                const synced = data.artworks[item.id];
                return synced ? { ...item, ...synced } : item;
              })
            );
          }
          if (data.artUploads && typeof data.artUploads === 'object') {
            setLocalImages((prev) => ({ ...prev, ...data.artUploads }));
          }
        }
      })
      .catch(() => {});
  }, []);

  // Update a specific field for an artwork and persist
  const updateArtworkField = (artId: string, field: keyof ArtworkItem, value: string) => {
    setArtworks((prev) => {
      const updated = prev.map((item) => {
        if (item.id === artId) {
          const newItem = { ...item, [field]: value };
          try {
            localStorage.setItem(
              `anb_art_meta_${artId}`,
              JSON.stringify({
                title: newItem.title,
                medium: newItem.medium,
                dimensions: newItem.dimensions,
                year: newItem.year,
                description: newItem.description,
              })
            );
          } catch (e) {
            console.error('Failed to save artwork metadata to localStorage', e);
          }
          return newItem;
        }
        return item;
      });
      return updated;
    });
  };

  const handleResetArtImage = (artId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Reset this artwork photo back to default placeholder?')) {
      localStorage.removeItem(`anb_art_${artId}`);
      setLocalImages((prev) => {
        const updated = { ...prev };
        delete updated[artId];
        return updated;
      });
    }
  };

  const handleResetAllArtMeta = () => {
    if (window.confirm('Reset all edited art titles, mediums, and dimensions back to defaults?')) {
      artworks.forEach((a) => localStorage.removeItem(`anb_art_meta_${a.id}`));
      setArtworks(ARTWORKS);
    }
  };

  const selectedArt = selectedArtId
    ? artworks.find((a) => a.id === selectedArtId) || null
    : null;

  return (
    <section id="art" className="border-t border-[#e8e8e8]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8 py-20 sm:py-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        {/* Sticky Sidebar */}
        <div className="md:sticky md:top-28 self-start space-y-3">
          <div>
            <h2
              className="text-xs uppercase tracking-[0.14em] font-bold transition-colors"
              style={{ color: accentColor }}
            >
              Art
            </h2>
            <p className="text-xs text-gray-500 hidden md:block leading-relaxed mt-0.5">
              Visual works, studies &amp; materials
            </p>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <button
              type="button"
              onClick={toggleEditMode}
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded transition w-fit cursor-pointer ${
                isEditMode
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
              title="Toggle text editing for all art cards"
            >
              {isEditMode ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Done Editing</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Art Cards</span>
                </>
              )}
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={handleResetAllArtMeta}
                className="text-[10px] text-gray-400 hover:text-red-600 transition text-left cursor-pointer flex items-center gap-1"
                title="Reset art card text back to original"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset Art Text</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Column */}
        <div>
          {/* Header without description under art */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" style={{ color: accentColor }} />
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141414]">
                Art
              </h3>
            </div>

            {isEditMode && (
              <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-medium animate-fade-in">
                ✎ Click any title, medium, dimensions, or year to edit
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {artworks.map((art, idx) => {
              const customImage = localImages[art.id] || uploadedImages[art.id];

              return (
                <div
                  key={art.id}
                  className="group relative bg-white border border-[#e8e8e8] hover:border-gray-300 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition duration-300 flex flex-col"
                >
                  {/* Artwork Canvas Frame or Custom Uploaded Photo */}
                  <div
                    onClick={() => setSelectedArtId(art.id)}
                    className="relative aspect-4/3 bg-gradient-to-br from-stone-50 via-gray-100 to-stone-200 border-b border-[#e8e8e8] overflow-hidden flex flex-col justify-between p-6 group/frame cursor-pointer"
                  >
                    {customImage ? (
                      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <img
                          src={customImage}
                          alt={art.title}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[1px]">
                          <Eye className="w-4 h-4" />
                          <span>Inspect Artwork</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/80 px-2 py-0.5 rounded shadow-2xs backdrop-blur-xs">
                            Study #{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-gray-500 bg-white/80 px-1.5 py-0.5 rounded shadow-2xs backdrop-blur-xs">
                            {art.year}
                          </span>
                        </div>

                        <div className="my-auto text-center py-4">
                          <div className="w-12 h-12 mx-auto rounded-full bg-white/90 shadow-xs flex items-center justify-center text-stone-600 mb-2 group-hover/frame:scale-110 transition-transform">
                            <Palette className="w-6 h-6" style={{ color: accentColor }} />
                          </div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">
                            {art.title}
                          </p>
                          <p className="text-xs text-gray-500 italic mt-0.5">{art.medium}</p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                          <span>{art.dimensions}</span>
                          <span className="inline-flex items-center gap-1 font-medium text-blue-600 group-hover:underline">
                            <Eye className="w-3 h-3" />
                            <span>View Study</span>
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Details Footer with fully editable text fields */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Editable Artwork Title */}
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition leading-snug">
                        {isEditMode ? (
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              updateArtworkField(art.id, 'title', e.currentTarget.innerText.trim())
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                e.currentTarget.blur();
                              }
                            }}
                            className="outline-dashed outline-1 outline-blue-400 hover:outline-blue-600 px-1 py-0.5 rounded cursor-text bg-blue-50/20 inline-block w-full"
                            title="Click to edit artwork title"
                          >
                            {art.title}
                          </span>
                        ) : (
                          <span
                            onDoubleClick={() => setEditMode(true)}
                            title="Double-click to edit artwork title"
                            className="cursor-pointer"
                          >
                            {art.title}
                          </span>
                        )}
                      </h4>

                      {/* Editable Medium and Dimensions */}
                      <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-1">
                        {isEditMode ? (
                          <div className="flex flex-wrap items-center gap-1.5 w-full">
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                updateArtworkField(
                                  art.id,
                                  'medium',
                                  e.currentTarget.innerText.trim()
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.currentTarget.blur();
                                }
                              }}
                              className="outline-dashed outline-1 outline-blue-400 hover:outline-blue-600 px-1 py-0.5 rounded cursor-text bg-blue-50/20 text-gray-700"
                              title="Click to edit medium (e.g. Watercolor & Ink)"
                            >
                              {art.medium}
                            </span>
                            <span className="text-gray-400">·</span>
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                updateArtworkField(
                                  art.id,
                                  'dimensions',
                                  e.currentTarget.innerText.trim()
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.currentTarget.blur();
                                }
                              }}
                              className="outline-dashed outline-1 outline-blue-400 hover:outline-blue-600 px-1 py-0.5 rounded cursor-text bg-blue-50/20 text-gray-600 font-mono text-[11px]"
                              title="Click to edit dimensions (e.g. 42 × 59 cm)"
                            >
                              {art.dimensions}
                            </span>
                          </div>
                        ) : (
                          <p
                            onDoubleClick={() => setEditMode(true)}
                            title="Double-click to edit medium and dimensions"
                            className="cursor-pointer"
                          >
                            <span>{art.medium}</span>
                            <span className="mx-1">·</span>
                            <span>{art.dimensions}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      {/* Editable Year */}
                      {isEditMode ? (
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            updateArtworkField(art.id, 'year', e.currentTarget.innerText.trim())
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              e.currentTarget.blur();
                            }
                          }}
                          className="outline-dashed outline-1 outline-blue-400 hover:outline-blue-600 px-1 py-0.5 rounded cursor-text font-mono text-gray-700 bg-blue-50/20"
                          title="Click to edit year"
                        >
                          {art.year}
                        </span>
                      ) : (
                        <span
                          onDoubleClick={() => setEditMode(true)}
                          className="text-xs text-gray-400 font-mono cursor-pointer"
                          title="Double-click to edit year"
                        >
                          {art.year}
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        {customImage && (
                          <button
                            type="button"
                            onClick={(e) => handleResetArtImage(art.id, e)}
                            className="text-[11px] text-gray-400 hover:text-red-600 transition px-1 py-0.5 cursor-pointer"
                            title="Reset to default placeholder"
                          >
                            <RotateCcw className="w-3 h-3 inline mr-0.5" />
                            <span>Reset</span>
                          </button>
                        )}

                        {onOpenUploadPhoto && (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenUploadPhoto({
                                id: art.id,
                                type: 'artwork',
                                title: `${art.title} Artwork Photo`,
                                currentSrc: customImage,
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{customImage ? 'Change Photo' : 'Upload Photo'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Artwork Enlargement & Inspection Modal */}
      {selectedArt && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#141414]"
          onClick={() => setSelectedArtId(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  <Palette className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-gray-900">{selectedArt.title}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedArt.medium} · {selectedArt.dimensions} · {selectedArt.year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
                  title="Print artwork specimen"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedArtId(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View or Placeholder Frame */}
            <div className="p-4 sm:p-6 bg-gray-900 overflow-auto flex items-center justify-center min-h-[320px]">
              {localImages[selectedArt.id] || uploadedImages[selectedArt.id] ? (
                <img
                  src={localImages[selectedArt.id] || uploadedImages[selectedArt.id]}
                  alt={selectedArt.title}
                  className="max-h-[62vh] w-auto object-contain rounded shadow-lg"
                />
              ) : (
                <div className="text-center p-8 text-gray-300">
                  <Palette className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                  <p className="text-sm font-semibold">{selectedArt.title}</p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    {selectedArt.medium} ({selectedArt.year})
                  </p>
                  {onOpenUploadPhoto && (
                    <button
                      type="button"
                      onClick={() => {
                        const artId = selectedArt.id;
                        const artTitle = selectedArt.title;
                        setSelectedArtId(null);
                        onOpenUploadPhoto({
                          id: artId,
                          type: 'artwork',
                          title: `${artTitle} Artwork Photo`,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload High-Res Artwork Photo</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
              <span className="font-mono">Original Work by Aditya Neil Banerjee</span>
              <button
                type="button"
                onClick={() => setSelectedArtId(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white rounded-lg shadow-xs cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
