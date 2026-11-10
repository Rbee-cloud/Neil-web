import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, User, MapPin, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { BIO_DATA } from '../data/bio';

export const AboutSection: React.FC = () => {
  const { milestones, aboutLong, location, school, email } = BIO_DATA;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;
    setFormSubmitted(true);
    // Reset form after short delay
    setTimeout(() => {
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="about" className="py-20 md:py-24 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            <User className="w-3.5 h-3.5" />
            <span>Biography &amp; Record</span>
            <span aria-hidden="true">/</span>
            <span>Trajectory</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            About Aditya Neil Banerjee
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {location}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-stone-400" />
              {school}
            </span>
          </div>
        </div>

        {/* Biography & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Long Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-stone-700 dark:text-stone-300 font-light text-sm sm:text-base leading-relaxed">
            {aboutLong.split('\n\n').map((para, i) => (
              <p key={i}>
                {para}
              </p>
            ))}

            {/* Quote callout */}
            <blockquote className="my-6 p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-serif italic text-base text-stone-800 dark:text-stone-200">
              "The aim of writing is not to close down debate with a polished answer, but to clarify the exact shape of our disagreements."
            </blockquote>
          </div>

          {/* Timeline Milestones (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-6 sm:p-7">
            <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mb-6 flex items-center justify-between">
              <span>Chronology &amp; Roles</span>
              <span className="text-xs font-mono text-stone-400">2023–2026</span>
            </h3>

            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative pl-6 border-l border-stone-200 dark:border-stone-800 space-y-1">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border-2 border-white dark:border-stone-900" />
                  <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-medium">
                    {m.period}
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {m.role}
                  </h4>
                  <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                    {m.institution}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed pt-1">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Contact Form & Dispatch Section */}
        <div id="contact" className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Editorial &amp; Academic Correspondence
              </span>
              <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                Initiate a Conversation
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                Whether you are an editor, researcher in political philosophy, fellow student journalist, 
                or interested in capabilities theory and prediction markets, I welcome thoughtful notes.
              </p>
              
              <div className="pt-4 space-y-2 text-xs font-mono text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>aditya.banerjee@ohsobserver.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  <span>ohsobserver.com/staff_name/aditya-banerjee/</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                    Message Dispatched
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto font-light">
                    Thank you for your note. Aditya typically replies to inquiries within 48 to 72 hours across Atlantic and Pacific timezones.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Professor Sarah Lin"
                        className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="you@institution.edu"
                        className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Capabilities theory, Observer query, or article commentary"
                      className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your note here..."
                      className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Aditya</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
