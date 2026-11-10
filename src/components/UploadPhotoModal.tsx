import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Link as LinkIcon, Check, RotateCcw, Image as ImageIcon, Loader2 } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

export interface UploadPhotoTarget {
  id: string;
  type: 'project' | 'certificate' | 'artwork' | 'hero';
  title: string;
  subtitle?: string;
  currentSrc?: string;
  defaultSrc?: string;
  aspectRatioHint?: string;
}

interface UploadPhotoModalProps {
  isOpen: boolean;
  target: UploadPhotoTarget | null;
  onClose: () => void;
  onSavePhoto: (targetId: string, type: string, dataUrl: string) => void;
  onResetPhoto?: (targetId: string, type: string) => void;
  accentColor: string;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  target,
  onClose,
  onSavePhoto,
  onResetPhoto,
  accentColor,
}) => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [stats, setStats] = useState<{ orig: number; comp: number } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (target) {
      setSelectedPreview(target.currentSrc || null);
      setUrlInput('');
      setStats(null);
      setFeedback(null);
    }
  }, [target]);

  if (!isOpen || !target) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setFeedback(null);
    try {
      const result = await compressImageFile(file);
      setSelectedPreview(result.dataUrl);
      setStats({ orig: result.originalSizeKb, comp: result.compressedSizeKb });
    } catch (err: any) {
      alert(err.message || 'Failed to process image');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setSelectedPreview(urlInput.trim());
    setStats(null);
    setFeedback('URL image preview applied. Click "Save & Update Photo" below.');
  };

  const handleSave = () => {
    if (!selectedPreview) return;
    onSavePhoto(target.id, target.type, selectedPreview);
    setFeedback('Photo updated and saved!');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleReset = () => {
    if (onResetPhoto) {
      onResetPhoto(target.id, target.type);
      setSelectedPreview(target.defaultSrc || null);
      setFeedback('Reset to default original picture.');
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in text-[#141414]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: accentColor }}
            >
              <Upload className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-gray-900">Upload Photo</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{target.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Preview Box */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-semibold text-gray-700 uppercase tracking-wider text-[11px]">
                Photo Preview
              </span>
              {target.aspectRatioHint && (
                <span className="text-gray-400 text-[11px] font-mono">
                  {target.aspectRatioHint}
                </span>
              )}
            </div>

            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center aspect-16/10 max-h-56">
              {selectedPreview ? (
                <img
                  src={selectedPreview}
                  alt={target.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 text-gray-400">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-xs">No photo selected yet</p>
                </div>
              )}

              {isCompressing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-blue-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-xs font-semibold text-gray-800">
                    Optimizing &amp; compressing image...
                  </span>
                </div>
              )}
            </div>

            {stats && (
              <p className="text-[11px] text-emerald-600 font-medium">
                ✓ Compressed {stats.orig} KB → {stats.comp} KB (ready for instant storage)
              </p>
            )}

            {feedback && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-1.5 animate-fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{feedback}</span>
              </p>
            )}
          </div>

          {/* Upload Input Area */}
          <div
            onClick={() => !isCompressing && fileInputRef.current?.click()}
            className="p-5 border-2 border-dashed border-gray-300 hover:border-gray-500 rounded-xl text-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1.5" />
            <span className="text-xs font-semibold text-blue-600 hover:underline block">
              Choose an image from your computer
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5 block">
              Supports JPG, PNG, WEBP, GIF (auto-compressed for web)
            </span>
          </div>

          {/* URL Input Option */}
          <form onSubmit={handleApplyUrl} className="pt-2 border-t border-gray-100 space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">
              Or paste an image web link:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition shrink-0 cursor-pointer"
              >
                Apply Link
              </button>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div>
            {onResetPhoto && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition cursor-pointer"
                title="Restore default photo"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to original</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!selectedPreview || isCompressing}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition hover:opacity-95 disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save &amp; Update Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
