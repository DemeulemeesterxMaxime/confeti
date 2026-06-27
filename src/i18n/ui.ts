// Internationalisation : FR (par defaut, sans prefixe) et EN (sous /en/).
// Le contenu de chaque page vitrine est centralise ici, indexe par langue.

export const defaultLang = 'fr';
export const languages = { fr: 'FR', en: 'EN' } as const;
export type Lang = keyof typeof languages;

/** Langue deduite de l'URL : 'en' si le chemin commence par /en, sinon 'fr'. */
export function getLangFromUrl(url: URL): Lang {
  return url.pathname.split('/')[1] === 'en' ? 'en' : 'fr';
}

/** Retire le prefixe de langue : renvoie le chemin canonique FR (commence par '/'). */
function stripLang(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

/**
 * Chemin localise pour une langue donnee.
 * Accepte un chemin canonique FR (liens de nav) ou le chemin courant (bascule).
 */
export function localizePath(path: string, lang: Lang): string {
  const base = stripLang(path);
  if (lang === 'fr') return base;
  return base === '/' ? '/en/' : '/en' + base;
}

type Faq = { q: string; a: string };

export const t = {
  fr: {
    nav: { gallery: 'Galerie', create: 'Créer', deploy: 'Déployer', start: 'Commencer' },
    footer: { tagline: 'Confeti - open source, fait avec amour 💖', host: 'Héberger' },
    langLabel: 'English',
    card: {
      customize: 'Personnaliser',
      preview: 'Aperçu',
      by: 'par',
      musicIncluded: 'Musique incluse',
    },
    home: {
      title: "Confeti - Crée un site d'anniversaire à offrir, sans coder",
      description:
        'Choisis un modèle, personnalise les textes et les photos, ajoute une musique : tu repars avec un seul fichier HTML à partager. Gratuit, sans inscription.',
      heroPill: '🎉 Sans coder · 100% gratuit',
      heroTitle: 'Un site pour chaque occasion,<br />prêt à <span class="hl">offrir</span>.',
      heroLead:
        'Anniversaire, fête des mères ou des pères, une bonne nouvelle... Tes photos, tes mots, une musique : on assemble un site qui défile comme une histoire, et tu repars avec un seul fichier à partager.',
      ctaGallery: 'Parcourir la galerie',
      ctaAi: '✨ Créer par IA',
      proof: 'Un site unique, monté en quelques minutes 💝',
      featTitle: 'Choisis ton ambiance 🎈',
      featMore: 'Voir tous les modèles →',
      faqTitle: 'Questions fréquentes 💬',
      faqs: [
        {
          q: 'Confeti est-il vraiment gratuit ?',
          a: 'Oui, 100 % gratuit et sans inscription. Tu choisis un modèle, tu personnalises et tu télécharges ton site, sans créer de compte ni payer.',
        },
        {
          q: 'Faut-il savoir coder ?',
          a: 'Non. Tout se fait dans le navigateur : tu changes les textes, ajoutes tes photos et une musique, puis tu télécharges un fichier prêt à offrir.',
        },
        {
          q: 'Comment offrir le site une fois créé ?',
          a: "Tu obtiens un seul fichier HTML. Tu peux l'envoyer tel quel, ou le mettre en ligne gratuitement (Vercel, Netlify Drop) pour partager un lien par SMS ou email.",
        },
        {
          q: 'Mes photos et ma musique sont-elles privées ?',
          a: "Oui. La personnalisation se fait dans ton navigateur et les médias sont intégrés au fichier téléchargé : rien n'est stocké sur un serveur.",
        },
        {
          q: 'Sur quels appareils le site fonctionne-t-il ?',
          a: 'Sur iPhone (Safari iOS) et sur ordinateur. Le fichier fonctionne même hors-ligne une fois téléchargé.',
        },
      ] as Faq[],
    },
    gallery: {
      title: "Galerie de modèles d'anniversaire - Confeti",
      description:
        "Parcours nos modèles de sites d'anniversaire : romantique, festif, enfant... Choisis ton ambiance, personnalise en quelques clics et télécharge un site prêt à offrir.",
      h1: 'La galerie 🎈',
      intro: 'Des modèles partagés par la communauté. Choisis-en un, personnalise, télécharge.',
      all: 'Tous',
      searchPlaceholder: '🔍  Rechercher…',
      makeTitle: 'Crée le tien ✨',
      makeDesc: "Pars d'un modèle ou laisse l'IA écrire l'histoire.",
      makeAi: '✨ Créer par IA',
      makeFromTpl: "Partir d'un modèle",
      collectionName: 'Galerie de modèles de sites d’anniversaire',
      collectionDesc: 'Catalogue de modèles de sites d’anniversaire à personnaliser et à offrir.',
    },
    create: {
      title: "Créer un site d'anniversaire par IA - Confeti",
      description:
        "Décris la personne et l'occasion : l'IA écrit les textes, compose les scènes et génère un site d'anniversaire prêt à offrir en quelques secondes.",
      pill: '✨ Génération par IA',
      h1: 'Raconte-moi votre histoire.',
      lead: "Décris la personne, l'occasion, vos souvenirs et le ton voulu. L'IA écrira les scènes, choisira l'ambiance et assemblera un site complet.",
      placeholder:
        "Ex. : C'est pour la fête des mères. Maman adore son jardin et les vieux films. Ton tendre, un brin drôle.",
      miniPhotos: '📷 Photos',
      miniMusic: '♪ Musique',
      gen: 'Générer le site →',
      generating: 'Génération…',
      errorGeneric: 'Erreur lors de la génération. Réessaie.',
      toneLabel: 'Ton',
      tones: ['Tendre', 'Drôle', 'Poétique', 'Festif'],
      occasionLabel: 'Occasion',
      occasions: [
        'Anniversaire',
        'Fête des mères',
        'Fête des pères',
        'Fête / Saint',
        'Félicitations',
        'Juste pour le dire',
      ],
      languageLabel: 'Langue',
      asideTitle: 'Comment ça marche',
      asideSteps: [
        '📝 Décris la personne en quelques phrases',
        "🎨 L'IA écrit les 8 scènes et choisit le ton",
        '✏️ Tu affines les textes, ajoutes tes photos',
        '⬇️ Tu télécharges un seul fichier à partager',
      ],
      asideBtn: "Partir d'un modèle",
      asideNote: 'Tu peux aussi personnaliser directement sans IA.',
    },
    deploy: {
      title: "Héberger ton site d'anniversaire - Confeti",
      description:
        "Mets ton site d'anniversaire en ligne en 2 minutes : via Vercel (gratuit), GitHub Pages, ou un simple partage de fichier. Obtiens un lien à envoyer par SMS ou email.",
      pill: '🚀 Dernière étape',
      h1: 'Mets ton site en ligne en 2 minutes',
      intro:
        'Tu as téléchargé ton fichier <code>.html</code>. Choisis comment le mettre en ligne et obtiens un lien à partager.',
      netlifyPill: 'Le plus simple',
      netlifyDesc: 'Glisse ton fichier, reçois une URL immédiate. Aucun compte requis.',
      netlifyBtn: '⬆ Ouvrir Netlify Drop',
      netlifyBtnSub: 'puis glisse ton fichier .html',
      netlifySteps: [
        'Va sur <b>app.netlify.com/drop</b>',
        'Dépose ton fichier',
        "Copie l'URL et partage 🎉",
      ],
      vercelPill: 'URL stable',
      vercelDesc: 'Une adresse permanente qui se met à jour à chaque modification.',
      vercelSteps: [
        'Mets le fichier dans un dépôt GitHub',
        'Importe sur <b>vercel.com/new</b>',
        'Framework « Other » → Deploy 🚀',
      ],
      tip: "💡 Le fichier fonctionne aussi hors-ligne - tu peux simplement l'envoyer par message.",
      addTitle: 'Ajouter un modèle au projet',
      addBody:
        'Dépose un dossier dans <code>public/templates/&lt;slug&gt;/</code> (avec <code>index.html</code>, et au choix <code>meta.json</code> / <code>music.mp3</code>), marque les photos <code>data-slot</code> et les textes <code>data-edit</code>. Détails :',
      addBodyAfter: 'Les contributions se font dans des branches (<code>main</code> reste figée).',
    },
  },
  en: {
    nav: { gallery: 'Gallery', create: 'Create', deploy: 'Deploy', start: 'Get started' },
    footer: { tagline: 'Confeti - open source, made with love 💖', host: 'Host it' },
    langLabel: 'Français',
    card: { customize: 'Customise', preview: 'Preview', by: 'by', musicIncluded: 'Music included' },
    home: {
      title: 'Confeti - Build a birthday website to gift, no coding',
      description:
        'Pick a template, customise the text and photos, add music: you walk away with a single HTML file to share. Free, no sign-up.',
      heroPill: '🎉 No code · 100% free',
      heroTitle: 'A website for every occasion,<br />ready to <span class="hl">give</span>.',
      heroLead:
        'Birthday, Mother’s or Father’s Day, good news... Your photos, your words, some music: we assemble a website that unfolds like a story, and you walk away with a single file to share.',
      ctaGallery: 'Browse the gallery',
      ctaAi: '✨ Create with AI',
      proof: 'A unique website, built in minutes 💝',
      featTitle: 'Pick your vibe 🎈',
      featMore: 'See all templates →',
      faqTitle: 'Frequently asked questions 💬',
      faqs: [
        {
          q: 'Is Confeti really free?',
          a: 'Yes, 100% free and no sign-up. You pick a template, customise it and download your site, without creating an account or paying.',
        },
        {
          q: 'Do I need to know how to code?',
          a: 'No. Everything happens in your browser: change the text, add your photos and music, then download a file ready to gift.',
        },
        {
          q: 'How do I gift the site once it’s ready?',
          a: 'You get a single HTML file. Send it as is, or put it online for free (Vercel, Netlify Drop) to share a link by text or email.',
        },
        {
          q: 'Are my photos and music private?',
          a: 'Yes. Customisation happens in your browser and the media is embedded in the downloaded file: nothing is stored on a server.',
        },
        {
          q: 'Which devices does the site work on?',
          a: 'On iPhone (Safari iOS) and desktop. The file even works offline once downloaded.',
        },
      ] as Faq[],
    },
    gallery: {
      title: 'Birthday website template gallery - Confeti',
      description:
        'Browse our birthday website templates: romantic, festive, kids... Pick your vibe, customise in a few clicks and download a site ready to gift.',
      h1: 'The gallery 🎈',
      intro: 'Templates shared by the community. Pick one, customise it, download.',
      all: 'All',
      searchPlaceholder: '🔍  Search…',
      makeTitle: 'Make your own ✨',
      makeDesc: 'Start from a template or let AI write the story.',
      makeAi: '✨ Create with AI',
      makeFromTpl: 'Start from a template',
      collectionName: 'Birthday website template gallery',
      collectionDesc: 'A catalogue of birthday website templates to customise and gift.',
    },
    create: {
      title: 'Create a birthday website with AI - Confeti',
      description:
        'Describe the person and the occasion: AI writes the text, composes the scenes and generates a birthday website ready to gift in seconds.',
      pill: '✨ AI generation',
      h1: 'Tell me your story.',
      lead: 'Describe the person, the occasion, your memories and the tone you want. AI will write the scenes, pick the mood and assemble a complete site.',
      placeholder:
        'E.g.: It’s for Mother’s Day. Mum loves her garden and old movies. Tender tone, a little funny.',
      miniPhotos: '📷 Photos',
      miniMusic: '♪ Music',
      gen: 'Generate the site →',
      generating: 'Generating…',
      errorGeneric: 'Something went wrong while generating. Try again.',
      toneLabel: 'Tone',
      tones: ['Tender', 'Funny', 'Poetic', 'Festive'],
      occasionLabel: 'Occasion',
      occasions: [
        'Birthday',
        'Mother’s Day',
        'Father’s Day',
        'Celebration',
        'Congratulations',
        'Just because',
      ],
      languageLabel: 'Language',
      asideTitle: 'How it works',
      asideSteps: [
        '📝 Describe the person in a few sentences',
        '🎨 AI writes the 8 scenes and picks the tone',
        '✏️ You refine the text, add your photos',
        '⬇️ You download a single file to share',
      ],
      asideBtn: 'Start from a template',
      asideNote: 'You can also customise directly without AI.',
    },
    deploy: {
      title: 'Host your birthday website - Confeti',
      description:
        'Put your birthday website online in 2 minutes: via Vercel (free), GitHub Pages, or a simple file share. Get a link to send by text or email.',
      pill: '🚀 Last step',
      h1: 'Put your site online in 2 minutes',
      intro:
        'You downloaded your <code>.html</code> file. Pick how to put it online and get a link to share.',
      netlifyPill: 'Easiest',
      netlifyDesc: 'Drop your file, get an instant URL. No account required.',
      netlifyBtn: '⬆ Open Netlify Drop',
      netlifyBtnSub: 'then drop your .html file',
      netlifySteps: [
        'Go to <b>app.netlify.com/drop</b>',
        'Drop your file',
        'Copy the URL and share 🎉',
      ],
      vercelPill: 'Stable URL',
      vercelDesc: 'A permanent address that updates on every change.',
      vercelSteps: [
        'Put the file in a GitHub repository',
        'Import it on <b>vercel.com/new</b>',
        'Framework “Other” → Deploy 🚀',
      ],
      tip: '💡 The file also works offline - you can simply send it by message.',
      addTitle: 'Add a template to the project',
      addBody:
        'Drop a folder into <code>public/templates/&lt;slug&gt;/</code> (with <code>index.html</code>, and optionally <code>meta.json</code> / <code>music.mp3</code>), mark photos with <code>data-slot</code> and text with <code>data-edit</code>. Details:',
      addBodyAfter: 'Contributions happen in branches (<code>main</code> stays frozen).',
    },
  },
} as const;
