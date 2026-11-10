import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function saveBase64Image(dataUrl: string | undefined | null, filenamePrefix: string, uploadsDir: string): string | null {
  if (!dataUrl) return null;
  if (!dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }
  try {
    const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!match) return dataUrl;

    let ext = match[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    if (ext === 'svg+xml') ext = 'svg';

    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const safeFilename = `${filenamePrefix}.${ext}`;
    const filePath = path.resolve(uploadsDir, safeFilename);

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${safeFilename}`;
  } catch (err) {
    console.error(`Failed to save base64 image for ${filenamePrefix}:`, err);
    return dataUrl;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // JSON body parser with generous limit for compressed images/scans
  app.use(express.json({ limit: '50mb' }));

  // Ensure public and uploads directories exist
  const publicDir = path.resolve(__dirname, 'public');
  const uploadsDir = path.resolve(publicDir, 'uploads');
  const imagesDir = path.resolve(publicDir, 'images');
  [publicDir, uploadsDir, imagesDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Serve static folders
  app.use('/uploads', express.static(uploadsDir));
  app.use('/images', express.static(imagesDir));
  app.use(express.static(publicDir));

  // API endpoint to sync client edits directly into base code files
  app.post('/api/sync-to-base', (req, res) => {
    try {
      const { content, artworks, certUploads, artUploads, leveSrc, rowbotSrc, portraitSrc } = req.body;

      // 1. Process and save base64 image uploads to disk as actual static image files
      const savedLeveSrc = saveBase64Image(leveSrc, 'leve', uploadsDir) || leveSrc || '/src/assets/images/leve_community.jpg';
      const savedRowbotSrc = saveBase64Image(rowbotSrc, 'rowbot', uploadsDir) || rowbotSrc || '/src/assets/images/rowbot_buoy.jpg';
      const savedPortraitSrc = saveBase64Image(portraitSrc, 'portrait', uploadsDir) || portraitSrc || '/src/assets/images/aditya_portrait.jpg';

      const savedCertUploads: Record<string, string> = {};
      if (certUploads && typeof certUploads === 'object') {
        for (const [certId, src] of Object.entries(certUploads)) {
          if (typeof src === 'string') {
            const cleanId = certId.replace(/[^a-zA-Z0-9_-]/g, '');
            savedCertUploads[certId] = saveBase64Image(src, `cert_${cleanId}`, uploadsDir) || src;
          }
        }
      }

      const savedArtUploads: Record<string, string> = {};
      if (artUploads && typeof artUploads === 'object') {
        for (const [artId, src] of Object.entries(artUploads)) {
          if (typeof src === 'string') {
            const cleanId = artId.replace(/[^a-zA-Z0-9_-]/g, '');
            savedArtUploads[artId] = saveBase64Image(src, `art_${cleanId}`, uploadsDir) || src;
          }
        }
      }

      // 2. Save full site-content.json in public folder
      const siteContentFile = path.resolve(publicDir, 'site-content.json');
      const payloadToSave = {
        savedAt: new Date().toISOString(),
        content: content || null,
        artworks: artworks || null,
        leveSrc: savedLeveSrc,
        rowbotSrc: savedRowbotSrc,
        portraitSrc: savedPortraitSrc,
        certUploads: Object.keys(savedCertUploads).length > 0 ? savedCertUploads : certUploads || null,
        artUploads: Object.keys(savedArtUploads).length > 0 ? savedArtUploads : artUploads || null,
      };

      fs.writeFileSync(siteContentFile, JSON.stringify(payloadToSave, null, 2), 'utf8');

      // 3. Update src/data/portfolioData.ts safely
      const portfolioDataPath = path.resolve(__dirname, 'src/data/portfolioData.ts');
      if (fs.existsSync(portfolioDataPath)) {
        try {
          let code = fs.readFileSync(portfolioDataPath, 'utf8');

          // (A) Update PORTFOLIO_CONTENT (Hero, About, Contact)
          if (content?.hero || content?.about || content?.contact) {
            const portfolioRegex = /export const PORTFOLIO_CONTENT = \{[\s\S]*?\n\};/;
            const updatedPortfolioContent = {
              hero: {
                greeting: content?.hero?.greeting || "Hi, I'm Aditya.",
                locationBadge: content?.hero?.locationBadge || 'Caldas da Rainha, Portugal · Stanford OHS',
                description:
                  content?.hero?.description ||
                  "I'm a student in Caldas da Rainha, Portugal. I start community projects, build small things for the environment, study economics, and write.",
                ctaText: content?.hero?.ctaText || 'A bit more about me',
              },
              about: {
                p1:
                  content?.about?.p1 ||
                  'I like figuring out how things work — markets, rivers, sentences — and then trying to make something useful with what I learn.',
                p2:
                  content?.about?.p2 ||
                  'I grew up in São Paulo, Brazil, and now live in Caldas da Rainha, a small town in Portugal, where I study at Stanford Online High School. Most of what I do started close to home: a composting project, a buoy that checks the water in local rivers, tutoring kids in math.',
                p3:
                  content?.about?.p3 ||
                  "At school I'm drawn to economics, math and computer science. Outside of it, I write. I edit our school newspaper and write poetry, sometimes about math.",
                originsTitle: content?.about?.originsTitle || 'Origins',
                originsDesc: content?.about?.originsDesc || 'São Paulo, Brazil → Caldas da Rainha, Portugal',
                educationTitle: content?.about?.educationTitle || 'Education',
                educationDesc: content?.about?.educationDesc || 'Stanford Online High School · Senior',
                interestsTitle: content?.about?.interestsTitle || 'Interests',
                interestsDesc: content?.about?.interestsDesc || 'Causal Inference, Policy & Creative Writing',
              },
              contact: {
                heading: content?.contact?.heading || 'Say hello.',
                subheading:
                  content?.contact?.subheading ||
                  "I'm always glad to hear from people working on similar things, or just curious about them.",
              },
            };

            const replacementContent = `export const PORTFOLIO_CONTENT = ${JSON.stringify(updatedPortfolioContent, null, 2)};`;
            code = code.replace(portfolioRegex, replacementContent);
          }

          // (B) Update PROJECTS (Leve and Rowbot text and image paths)
          if (content?.work?.projects || savedLeveSrc || savedRowbotSrc) {
            const projectsRegex = /export const PROJECTS: Project\[\] = \[[\s\S]*?\n\];/;
            const updatedProjects = [
              {
                id: 'leve',
                title: content?.work?.projects?.[0]?.title || 'Leve',
                meta: content?.work?.projects?.[0]?.meta || 'Founder · 2023 – now',
                link: 'https://www.deleve.eu',
                linkText: 'deleve.eu',
                image: savedLeveSrc || '/src/assets/images/leve_community.jpg',
                imageAlt: 'Leve community composting workshop in Caldas da Rainha',
                badges: ['Diana Award 2026', '8 Schools', '500+ Participants', '1,000+ Meals Saved'],
                role: 'Founder & Initiative Director',
                highlights: [
                  'Operates three dedicated sub-projects: BioRainha (urban composting), Art Caldas (intergenerational arts), and Me Leve (food redistribution).',
                  'Officially adopted by Caldas da Rainha Town Council with an allocated dedicated community land plot.',
                  'Recipient of the prestigious international Diana Award (2026) for youth humanitarian and community action.',
                ],
                desc:
                  Array.isArray(content?.work?.projects?.[0]?.desc) && content.work.projects[0].desc.length > 0
                    ? content.work.projects[0].desc
                    : [
                        'A youth-led initiative in Caldas da Rainha working on food waste and on bringing younger and older people in town together. It runs three projects: BioRainha (composting), Art Caldas and Me Leve.',
                        "So far we've worked with 8 schools and around 500 people, and saved over 1,000 meals. The town council adopted BioRainha and gave us a community plot for it. Leve received the Diana Award in 2026.",
                      ],
              },
              {
                id: 'rowbot',
                title: content?.work?.projects?.[1]?.title || 'Rowbot',
                meta: content?.work?.projects?.[1]?.meta || 'Founder · 2024 – now',
                link: 'https://www.rowbots.eu',
                linkText: 'rowbots.eu',
                image: savedRowbotSrc || '/src/assets/images/rowbot_buoy.jpg',
                imageAlt: 'Rowbot semi-autonomous water quality buoy',
                badges: ['CREST Gold Award', 'Bright Future Global Prize Finalist', 'Real-time IoT'],
                role: 'Founder & Hardware/Firmware Lead',
                highlights: [
                  'Multi-parameter telemetry array: temperature, turbidity, conductivity, pH, and water elevation level.',
                  'Solar-powered autonomous telemetry for continuous real-time water quality monitoring in estuaries and rivers.',
                  'Recognized with the CREST Gold Award from the British Science Association.',
                ],
                desc:
                  Array.isArray(content?.work?.projects?.[1]?.desc) && content.work.projects[1].desc.length > 0
                    ? content.work.projects[1].desc
                    : [
                        'A small semi-autonomous buoy that measures temperature, turbidity, conductivity, pH and water level in rivers and lakes, so local water quality can be tracked in real time.',
                        'It was a finalist for the Bright Future Global Prize and received a CREST Gold Award from the British Science Association.',
                      ],
              },
            ];

            const replacementProjects = `export const PROJECTS: Project[] = ${JSON.stringify(updatedProjects, null, 2)};`;
            code = code.replace(projectsRegex, replacementProjects);
          }

          // (C) Update ARTWORKS (Art card titles, mediums, years, dimensions, descriptions)
          if (artworks && typeof artworks === 'object' && Object.keys(artworks).length > 0) {
            const artworksRegex = /export const ARTWORKS: ArtworkItem\[\] = \[[\s\S]*?\n\];/;
            const defaultArtworks = [
              {
                id: 'art-1',
                title: 'Study of the Tornada River Basin',
                medium: 'Watercolor & India ink on cold-press paper',
                year: '2025',
                dimensions: '42 × 59 cm',
                description:
                  'Topographic contour and sedimentation study mapping wetland river hydrology and organic runoff near Caldas da Rainha.',
              },
              {
                id: 'art-2',
                title: 'Thermal Inversion at Óbidos Lagoon',
                medium: 'Oil and cold wax on linen canvas',
                year: '2025',
                dimensions: '60 × 80 cm',
                description:
                  'Atmospheric light study capturing dusk temperature differentials and brackish water reflections at the coastal inlet.',
              },
              {
                id: 'art-3',
                title: 'Decompositions & Microbial Growth',
                medium: 'Charcoal, iron oxide wash & organic sediment',
                year: '2024',
                dimensions: '30 × 40 cm',
                description:
                  'Organic texture and decay gradient study created during early soil composting trials in Caldas da Rainha.',
              },
              {
                id: 'art-4',
                title: 'Ergodic Flow (Poincaré Recurrence)',
                medium: 'Digital computational visualization & ink print',
                year: '2026',
                dimensions: '50 × 70 cm',
                description:
                  'Mathematical visual inquiry inspired by dynamical systems theory, phase space trajectories, and thermodynamic entropy.',
              },
              {
                id: 'art-5',
                title: 'Caldas Ceramic Kiln Shards & Earth',
                medium: 'Clay slip, natural terracotta pigment & mineral glaze',
                year: '2024',
                dimensions: '35 × 50 cm',
                description:
                  'Homage to the ceramic heritage of Caldas da Rainha (Bordallo Pinheiro tradition) fused with modern geological stratification.',
              },
              {
                id: 'art-6',
                title: 'Atlantic Mist over Foz do Arelho',
                medium: 'Acrylic, soft pastel & pumice paste',
                year: '2025',
                dimensions: '50 × 65 cm',
                description:
                  'Expressive coastal weather study examining sea spray density, cliffs, and twilight atmospheric light.',
              },
              {
                id: 'art-7',
                title: 'Mangrove Roots & Flood Hydrology',
                medium: 'Sumi ink & salt crystallization on washi',
                year: '2024',
                dimensions: '38 × 52 cm',
                description:
                  'Estuarine root architecture study recalling coastal São Paulo tidal ecosystems and wetland flood mitigation.',
              },
              {
                id: 'art-8',
                title: 'Sensory Topography: Sound of Water',
                medium: 'Cyanotype photogram & silver leaf on handmade paper',
                year: '2026',
                dimensions: '40 × 60 cm',
                description:
                  'Sun-exposed chemical print overlaid with acoustic frequency recordings taken during sensor buoy field testing.',
              },
            ];

            const updatedArtworks = defaultArtworks.map((item) => {
              const edit = (artworks as Record<string, any>)[item.id];
              return edit ? { ...item, ...edit } : item;
            });

            const replacementArtworks = `export const ARTWORKS: ArtworkItem[] = ${JSON.stringify(updatedArtworks, null, 2)};`;
            code = code.replace(artworksRegex, replacementArtworks);
          }

          fs.writeFileSync(portfolioDataPath, code, 'utf8');
        } catch (fileErr) {
          console.warn('Could not patch portfolioData.ts directly; site-content.json saved successfully.', fileErr);
        }
      }

      return res.json({
        success: true,
        message: 'All changes permanently synchronized to base code and public/site-content.json',
        data: {
          leveSrc: savedLeveSrc,
          rowbotSrc: savedRowbotSrc,
          portraitSrc: savedPortraitSrc,
          certUploads: savedCertUploads,
          artUploads: savedArtUploads,
        },
      });
    } catch (err: any) {
      console.error('Error in /api/sync-to-base:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET endpoint to retrieve synced content
  app.get('/api/content', (_req, res) => {
    const siteContentFile = path.resolve(__dirname, 'public/site-content.json');
    if (fs.existsSync(siteContentFile)) {
      try {
        const raw = fs.readFileSync(siteContentFile, 'utf8');
        return res.json(JSON.parse(raw));
      } catch (e) {
        return res.status(500).json({ error: 'Failed to read content file' });
      }
    }
    return res.json({});
  });

  // Check environment: dev with Vite middleware or prod with dist static
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
