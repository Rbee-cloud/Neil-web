import React, { useState, useEffect } from 'react';
import { Award, FileText, ExternalLink, X, Eye, Upload, Printer, RotateCcw } from 'lucide-react';
import { CERTIFICATES, CertificateItem } from '../data/portfolioData';

interface CertificatesProps {
  accentColor: string;
  onOpenUploadPhoto?: (target: {
    id: string;
    type: 'certificate';
    title: string;
    currentSrc?: string;
  }) => void;
  uploadedImages?: Record<string, string>;
}

export const Certificates: React.FC<CertificatesProps> = ({
  accentColor,
  onOpenUploadPhoto,
  uploadedImages = {},
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [localImages, setLocalImages] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      CERTIFICATES.forEach((c) => {
        const saved = localStorage.getItem(`anb_cert_${c.id}`);
        if (saved) map[c.id] = saved;
      });
    }
    return map;
  });

  // Sync when parent provides updated images
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
        if (data && data.certUploads && typeof data.certUploads === 'object') {
          setLocalImages((prev) => ({ ...prev, ...data.certUploads }));
        }
      })
      .catch(() => {});
  }, []);

  const handleResetCertImage = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Reset this certificate back to default placeholder?')) {
      localStorage.removeItem(`anb_cert_${certId}`);
      setLocalImages((prev) => {
        const updated = { ...prev };
        delete updated[certId];
        return updated;
      });
    }
  };

  return (
    <section id="certificates" className="border-t border-[#e8e8e8]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8 py-20 sm:py-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        {/* Sticky Sidebar */}
        <div className="md:sticky md:top-28 self-start space-y-2">
          <h2
            className="text-xs uppercase tracking-[0.14em] font-bold transition-colors"
            style={{ color: accentColor }}
          >
            Certificates
          </h2>
          <p className="text-xs text-gray-500 hidden md:block">
            Verified credentials &amp; awards
          </p>
        </div>

        {/* Content Column */}
        <div>
          {/* Section Header without description under heading */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141414]">
              Certificates &amp; Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CERTIFICATES.map((cert, idx) => {
              const customImage = localImages[cert.id] || uploadedImages[cert.id];

              return (
                <div
                  key={cert.id}
                  className="group relative bg-white border border-[#e8e8e8] hover:border-gray-300 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition duration-300 flex flex-col"
                >
                  {/* Certificate Visual Banner / Credential Stamp */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative aspect-4/3 bg-gradient-to-br from-gray-50 to-gray-100/80 border-b border-[#e8e8e8] overflow-hidden flex flex-col justify-between p-6 cursor-pointer border-2 border-dashed border-gray-200 hover:border-gray-400 transition bg-white/70 hover:bg-white"
                  >
                    {customImage ? (
                      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <img
                          src={customImage}
                          alt={cert.title}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[1px]">
                          <Eye className="w-4 h-4" />
                          <span>Enlarge scan</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Certificate #{idx + 1}
                          </span>
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs"
                            style={{ backgroundColor: accentColor }}
                          >
                            <Award className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        <div className="my-auto text-center py-2">
                          <FileText className="w-8 h-8 mx-auto text-gray-300 group-hover:text-gray-500 transition mb-2" />
                          <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                            {cert.title}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{cert.issuer}</p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                          <span>{cert.year}</span>
                          <span className="inline-flex items-center gap-1 font-medium text-blue-600 group-hover:underline">
                            <Eye className="w-3 h-3" />
                            <span>View Credential</span>
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Details Card (Descriptions removed as requested) */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition">
                          {cert.title}
                        </h4>
                        <span className="text-xs text-gray-400 shrink-0 font-medium">
                          {cert.year}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-0.5">{cert.issuer}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      {cert.link ? (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium hover:underline text-gray-700 hover:text-black"
                        >
                          <span>Official Registry</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-gray-400">Verified Award</span>
                      )}

                      <div className="flex items-center gap-1.5">
                        {customImage && (
                          <button
                            type="button"
                            onClick={(e) => handleResetCertImage(cert.id, e)}
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
                                id: cert.id,
                                type: 'certificate',
                                title: `${cert.title} Scan`,
                                currentSrc: customImage,
                              })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                          >
                            <Upload className="w-3 h-3" />
                            <span>{customImage ? 'Change Scan' : 'Upload Scan'}</span>
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

      {/* Certificate Detail & Full Enlargement Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative text-[#141414]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-gray-900">{selectedCert.title}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedCert.issuer} · {selectedCert.year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
                  title="Print certificate"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View or Frame */}
            <div className="p-4 sm:p-6 bg-gray-900 overflow-auto flex items-center justify-center min-h-[300px]">
              {localImages[selectedCert.id] || uploadedImages[selectedCert.id] ? (
                <img
                  src={localImages[selectedCert.id] || uploadedImages[selectedCert.id]}
                  alt={selectedCert.title}
                  className="max-h-[60vh] w-auto object-contain rounded shadow-lg"
                />
              ) : (
                <div className="text-center p-8 text-gray-300">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                  <p className="text-sm font-semibold">{selectedCert.title}</p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    {selectedCert.issuer} ({selectedCert.year})
                  </p>
                  {onOpenUploadPhoto && (
                    <button
                      type="button"
                      onClick={() => {
                        const cert = selectedCert;
                        setSelectedCert(null);
                        onOpenUploadPhoto({
                          id: cert.id,
                          type: 'certificate',
                          title: `${cert.title} Scan`,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Certificate Scan</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
              <span className="font-mono">Verified Credential Record</span>
              <div className="flex items-center gap-3">
                {selectedCert.link && (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg shadow-xs hover:opacity-95"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>Open Official Registry</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
