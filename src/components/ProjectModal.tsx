import React from 'react';
import { X, CheckCircle, ExternalLink } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { useContent, EditableText } from '../context/ContentContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  accentColor: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project: initialProject,
  onClose,
  accentColor,
}) => {
  const { content } = useContent();
  if (!initialProject) return null;

  const projectIdx = content.work?.projects?.findIndex((p) => p.id === initialProject.id) ?? -1;
  const project =
    projectIdx !== -1 && content.work?.projects?.[projectIdx]
      ? { ...content.work.projects[projectIdx], image: initialProject.image || content.work.projects[projectIdx].image }
      : initialProject;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#141414]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image Header */}
        {project.image ? (
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-gray-100">
            <img
              src={project.image}
              alt={project.imageAlt || project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition backdrop-blur-xs"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                {project.meta}
              </span>
              <h2 className="text-3xl font-bold tracking-tight">{project.title}</h2>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start p-6 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                {project.meta}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {project.badges && (
            <div className="flex flex-wrap gap-2">
              {project.badges.map((b, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200"
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-3 text-base text-gray-700 leading-relaxed">
            {project.desc.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {project.highlights && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Key Highlights &amp; Impact
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-500">Caldas da Rainha, Portugal</div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Close
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm transition hover:opacity-95"
                style={{ backgroundColor: accentColor }}
              >
                <span>Visit {project.linkText}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
