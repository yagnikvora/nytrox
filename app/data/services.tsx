/**
 * Single source of truth for the service catalogue.
 *
 * The home page shows `title` + `desc` in the card grid; the /services page
 * additionally renders `detail` and the deliverable titles, laid out by
 * `category` (see SERVICE_GROUPS at the bottom of this file). Each service also
 * has its own page at /services/<slug>, which is where `fit`, the deliverable
 * descriptions, `process`, and `faqs` appear.
 *
 * Array order is the running order everywhere: the home grid takes the first
 * HOME_SERVICE_COUNT, the footer the first few, and each category section on
 * /services keeps its members in this sequence.
 *
 * The same rule as data/projects.ts applies to the copy here: no timelines,
 * prices, or results figures. Those are commitments, and they belong in a
 * proposal rather than on a page that can't know the project.
 */

export type ServiceCategory = "design" | "build" | "growth";

export type Deliverable = {
  /** Shown as a chip on /services and as the card heading on the detail page. */
  title: string;
  desc: string;
};

export type ServiceStep = {
  title: string;
  desc: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  title: string;
  /** Short line used on the home page tiles. */
  desc: string;
  /** Longer paragraph shown on the Services page. */
  detail: string;
  /** "Right for you if…" — the situations a client typically arrives in. */
  fit: string[];
  deliverables: Deliverable[];
  /** How an engagement runs, in order. Numbered on the detail page. */
  process: ServiceStep[];
  faqs: ServiceFaq[];
  category: ServiceCategory;
  icon: React.ReactNode;
};

export const SERVICES: Service[] = [
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    desc: "Research-driven interfaces and design systems that feel effortless and convert visitors into fans.",
    detail:
      "We start with your users, not a template. Research and flows come first, then wireframes, high-fidelity UI, and a component library your engineers can build against without guesswork.",
    fit: [
      "You have a product idea and want to see how it works before engineering starts.",
      "Your product works, but users keep getting lost or giving up part-way through.",
      "Your engineers are building screens one at a time, with no shared components to build from.",
    ],
    deliverables: [
      {
        title: "User research",
        desc: "Interviews, an analytics review, and a look at what competitors have already taught your users to expect — boiled down to the handful of findings that should shape the design.",
      },
      {
        title: "Wireframes & prototypes",
        desc: "Flows mapped end to end, then clickable prototypes you can put in front of real users before a line of production code is written.",
      },
      {
        title: "Design systems",
        desc: "Tokens, components, and states documented in Figma and named the way your codebase names them, so design and engineering stay on the same version.",
      },
      {
        title: "Motion & interaction",
        desc: "Transitions, loading states, and micro-interactions specified down to timing and easing, so what ships moves the way the prototype did.",
      },
    ],
    process: [
      { title: "Discover", desc: "Stakeholder sessions, user interviews, and an audit of whatever exists today." },
      { title: "Map", desc: "User flows and low-fidelity wireframes, agreed before anything gets polished." },
      { title: "Design", desc: "High-fidelity UI and prototypes, tested with users and refined in short rounds." },
      { title: "Hand off", desc: "A documented component library and a walkthrough with your engineers." },
    ],
    faqs: [
      {
        q: "Do you only design, or can you build it too?",
        a: "Both. Plenty of clients hire us for design alone and build in-house — but because engineering sits in the same studio, the designs are made with the build in mind either way.",
      },
      {
        q: "We already have a product. Can you redesign just part of it?",
        a: "Yes. We start with an audit of the current experience and focus on the flows costing you the most, rather than redesigning everything at once.",
      },
      {
        q: "What do we actually receive at the end?",
        a: "The Figma files, the component library, clickable prototypes, and the research findings behind each decision. All of it is yours to keep and build on.",
      },
    ],
    category: "design",
    icon: (
      <>
        {/* artboard crop marks + cursor */}
        <path
          d="M4 9.5v-4a1.5 1.5 0 011.5-1.5h4M20 14.5v4a1.5 1.5 0 01-1.5 1.5h-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9 8.6l7.2 3-2.9 1.3-1.3 2.9-3-7.2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "website",
    title: "Website",
    desc: "Fast, responsive sites — marketing pages, storefronts, and CMS builds your team can edit without a developer.",
    detail:
      "Landing pages, multi-page marketing sites, and storefronts built to load fast and rank well. Content lives in a CMS your team actually controls, and every page is responsive, accessible, and tuned for Core Web Vitals before it goes live.",
    fit: [
      "Your current site is slow, dated, or impossible to update without a developer.",
      "You're launching a business or product and need a site that earns trust straight away.",
      "You sell online and need a storefront that holds up on a phone.",
    ],
    deliverables: [
      {
        title: "Marketing sites",
        desc: "Landing pages and multi-page sites built around what visitors arrive looking for, with clear calls to action and content structured for search.",
      },
      {
        title: "E-commerce storefronts",
        desc: "Catalogues, carts, and checkout flows designed for mobile first, connected to the payment and inventory tools you already use.",
      },
      {
        title: "Headless CMS",
        desc: "Content modelled around how your team actually publishes, so pages, posts, and products can be edited without touching the code.",
      },
      {
        title: "Core Web Vitals tuning",
        desc: "Image handling, font loading, and script weight checked before launch, so the site is quick on real phones and not just on the office connection.",
      },
    ],
    process: [
      { title: "Scope", desc: "Pages, content, integrations, and what the site needs to achieve, agreed up front." },
      { title: "Design", desc: "Page layouts and a component set, reviewed on desktop and mobile." },
      { title: "Build", desc: "Development on a staging site you can click through as it takes shape." },
      { title: "Launch", desc: "Speed, accessibility, and SEO checks, then go-live and CMS training for your team." },
    ],
    faqs: [
      {
        q: "Will we be able to update the site ourselves?",
        a: "Yes. Content lives in a CMS set up around your pages, and we walk your team through it before launch. Text, images, and new pages don't need a developer.",
      },
      {
        q: "Can you redesign our existing website?",
        a: "Yes. We review the current site first — what's working, what's ranking, and which content is worth keeping — so a redesign doesn't cost you the search visibility you already have.",
      },
      {
        q: "Do you handle hosting and domains?",
        a: "We can set up hosting, deployment, and your domain, or deploy to infrastructure you already run. Either way, the accounts sit in your name.",
      },
    ],
    category: "build",
    icon: (
      <>
        <rect x="2.5" y="4" width="19" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M2.5 8.5h19M5.7 6.2h.01M8.3 6.2h.01"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    slug: "development",
    title: "Development",
    desc: "Custom software, SaaS platforms, and the APIs behind them — engineered on architecture that holds up.",
    detail:
      "SaaS products, internal dashboards, and the services that feed them — typed end to end, server-rendered for speed, and structured so your team can keep shipping after we hand over the keys.",
    fit: [
      "You're building a SaaS product or internal platform and need a team to engineer it.",
      "Your business runs on spreadsheets and disconnected tools that ought to talk to each other.",
      "You've inherited a codebase that has become risky to change.",
    ],
    deliverables: [
      {
        title: "Next.js & React",
        desc: "Web applications written in TypeScript, server-rendered where it helps speed and search, and structured so new features don't mean rewriting old ones.",
      },
      {
        title: "APIs & integrations",
        desc: "Documented APIs, plus the connections to the payment providers, CRMs, and third-party services your product depends on.",
      },
      {
        title: "Database design",
        desc: "Data models shaped around how the product will grow, with migrations, indexing, and backups handled from day one rather than retrofitted.",
      },
      {
        title: "Cloud deployment",
        desc: "Automated pipelines, staging environments, and monitoring, so a release is routine rather than an event.",
      },
    ],
    process: [
      { title: "Architect", desc: "Requirements, data model, and technical approach written down and agreed." },
      { title: "Build", desc: "Short sprints, with working software to review at the end of each one." },
      { title: "Test", desc: "Automated tests and QA on every release, not saved up for the end." },
      { title: "Ship & support", desc: "Production launch, documentation, and handover — or ongoing support if you want it." },
    ],
    faqs: [
      {
        q: "Which technologies do you build with?",
        a: "Mostly TypeScript, React, and Next.js on the front end, with Node.js, PostgreSQL, and GraphQL behind it, deployed on AWS. If your team already works in a different stack, we'll talk through whether staying on it makes more sense.",
      },
      {
        q: "Can you build an MVP first?",
        a: "Yes. We scope the smallest version that proves the idea with real users, on foundations that don't need throwing away once it works.",
      },
      {
        q: "What happens after launch?",
        a: "You get the code, the documentation, and a handover session with your team. If you'd rather we keep running it, we take on ongoing support and feature work as a retainer.",
      },
    ],
    category: "build",
    icon: (
      <>
        <path
          d="M8.6 8.2L4.8 12l3.8 3.8M15.4 8.2L19.2 12l-3.8 3.8M13.4 5.5l-2.8 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Application Development",
    desc: "Native and cross-platform apps built for speed, scale, and delight — from concept to the App Store.",
    detail:
      "iOS, Android, and cross-platform builds engineered for smooth 60fps interaction and offline-first reliability. We handle the whole route: architecture, integrations, store submission, and post-launch releases.",
    fit: [
      "You need an app on both iOS and Android without running two separate teams.",
      "Your users work where the signal drops, and the app still has to do its job.",
      "You have a web product and your customers keep asking for an app.",
    ],
    deliverables: [
      {
        title: "iOS & Android",
        desc: "Native builds in Swift and Kotlin where the product leans on the camera, sensors, background work, or other platform-specific features.",
      },
      {
        title: "React Native / Flutter",
        desc: "One shared codebase for both platforms when that's the better trade — quicker to ship and cheaper to maintain, without an app that feels like a website.",
      },
      {
        title: "App Store release",
        desc: "Listings, screenshots, signing, and submissions for the App Store and Google Play — including the back-and-forth when a reviewer has questions.",
      },
      {
        title: "Offline-first sync",
        desc: "Local storage and background sync, so the app keeps working without a connection and reconciles cleanly once it's back.",
      },
    ],
    process: [
      { title: "Plan", desc: "Core journeys, the platform choice, and the backend the app will rely on." },
      { title: "Design", desc: "Screens designed to each platform's conventions and prototyped on real devices." },
      { title: "Build", desc: "Sprint builds sent straight to your phone through TestFlight and Play test tracks." },
      { title: "Release", desc: "Store submission, launch monitoring, and the updates that follow." },
    ],
    faqs: [
      {
        q: "Native or cross-platform — which should we choose?",
        a: "It depends on the product. Cross-platform suits most apps and keeps a single codebase; native earns its cost when you lean heavily on device hardware or platform-specific features. We'll recommend one during planning and explain why.",
      },
      {
        q: "Do you handle App Store and Google Play submissions?",
        a: "Yes — listings, builds, signing, and replies to reviewer feedback. The developer accounts stay in your name, so you own the apps outright.",
      },
      {
        q: "Can you also build the backend the app needs?",
        a: "Yes. APIs, databases, authentication, and push notifications are built by the same team, so the app and its server are designed together rather than negotiated between vendors.",
      },
    ],
    category: "build",
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    desc: "Campaigns, content, and social that put your product in front of the people who will actually use it.",
    detail:
      "Strategy first, then execution: audience research, a content calendar you can sustain, and campaigns across social, email, and organic channels — all reporting into one dashboard, so you can see what is working instead of guessing.",
    fit: [
      "You post regularly, but can't tell which channels actually bring in customers.",
      "You're launching something and need an audience before launch day, not after it.",
      "Your team has the ideas but not the hours to keep a content calendar running.",
    ],
    deliverables: [
      {
        title: "Channel strategy",
        desc: "A clear view of where your audience spends its time, which channels to prioritise, and what each one is expected to do for the business.",
      },
      {
        title: "Content & social",
        desc: "A content calendar you can keep up, with posts, captions, and creative produced in your brand's voice.",
      },
      {
        title: "Email campaigns",
        desc: "Welcome sequences, newsletters, and campaign sends, segmented so people receive what's relevant to them instead of everything.",
      },
      {
        title: "Analytics dashboards",
        desc: "Reporting that pulls every channel into one view and tracks leads and sales, not likes.",
      },
    ],
    process: [
      { title: "Research", desc: "Your audience, your competitors, and how your current channels perform." },
      { title: "Plan", desc: "Channel mix, messaging, and a content calendar agreed with your team." },
      { title: "Run", desc: "Content published and campaigns sent on schedule, with regular check-ins." },
      { title: "Report", desc: "What worked, what didn't, and what changes in the next cycle." },
    ],
    faqs: [
      {
        q: "Which platforms do you work on?",
        a: "Whichever ones your customers actually use — usually some mix of Instagram, LinkedIn, Facebook, and email. We'd rather run two channels well than spread thin across six.",
      },
      {
        q: "How soon will we see results?",
        a: "Organic channels build over months rather than weeks, and we'll say so up front. Early signals — engagement, list growth, first enquiries — show up in the reporting well before the bigger results do.",
      },
      {
        q: "Can you work alongside our in-house team?",
        a: "Yes. We can run everything, or plan and produce the content while your team handles day-to-day posting and replies.",
      },
    ],
    category: "growth",
    icon: (
      <>
        {/* megaphone */}
        <path
          d="M4.5 10.5v3a1 1 0 001 1H8l9.5 4.5V5L8 9.5H5.5a1 1 0 00-1 1z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M20 9.8a3.4 3.4 0 010 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    desc: "Paid acquisition run on numbers, not hunches — tracked, tested, and optimised for return on ad spend.",
    detail:
      "Google, Meta, and LinkedIn campaigns built on a clean conversion-tracking setup. We test creative and audiences in structured cycles, cut what does not earn its keep, and report on cost per acquisition rather than impressions.",
    fit: [
      "You're spending on ads and aren't sure what you're getting back.",
      "You've tried boosting posts and want campaigns run properly.",
      "Your tracking is broken or missing, so nobody trusts the numbers.",
    ],
    deliverables: [
      {
        title: "Google & Meta Ads",
        desc: "Search, shopping, and social campaigns structured around your goals, with budget following whatever is actually converting.",
      },
      {
        title: "Conversion tracking",
        desc: "Pixels, tags, and server-side events set up and verified, so every campaign is judged on real leads and sales.",
      },
      {
        title: "A/B testing",
        desc: "Creative, audiences, and landing pages tested in structured rounds, with a clear call on what to keep and what to cut.",
      },
      {
        title: "ROAS reporting",
        desc: "Cost per acquisition and return on ad spend, reported in plain language rather than a wall of platform metrics.",
      },
    ],
    process: [
      { title: "Audit", desc: "Your existing ad accounts, tracking, and landing pages, reviewed." },
      { title: "Set up", desc: "Tracking fixed first, then campaigns built and launched." },
      { title: "Test", desc: "Creative and audience tests in cycles, with budget moved to the winners." },
      { title: "Scale", desc: "Spend raised on what's proven, with reporting all the way." },
    ],
    faqs: [
      {
        q: "How much should we spend on ads?",
        a: "It depends on your market and your goals. We'll suggest a test budget large enough to learn from, then scale on the cost per acquisition you're actually seeing — not on a figure picked in advance.",
      },
      {
        q: "Who owns the ad accounts?",
        a: "You do. Campaigns run in accounts owned by your business, with access granted to us — so the history, audiences, and data stay with you whatever happens.",
      },
      {
        q: "What if our website isn't converting?",
        a: "Then more traffic won't fix it. We flag landing-page problems during the audit, and our design and web teams can fix them before any spend is scaled.",
      },
    ],
    category: "growth",
    icon: (
      <>
        <circle cx="11" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="11" cy="13" r="3.3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M11 13l6.6-6.6M15.7 4.6h3.7v3.7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    desc: "Print and digital collateral — decks, social kits, and campaign artwork that hold the line on your brand.",
    detail:
      "Pitch decks, ad creative, social kits, brochures, and everything in between, drawn from one set of templates — so the tenth asset still looks like it came from the same studio as the first.",
    fit: [
      "Your marketing looks different every time someone new makes it.",
      "You have a pitch, launch, or campaign coming up and need materials to match.",
      "Your team makes its own posts and needs templates that keep them on-brand.",
    ],
    deliverables: [
      {
        title: "Social & ad creative",
        desc: "Posts, stories, and ad sets sized for each platform and designed as a series, not a pile of one-off images.",
      },
      {
        title: "Pitch decks",
        desc: "Investor and sales decks where the structure does as much work as the visuals, built in the tool your team presents from.",
      },
      {
        title: "Print collateral",
        desc: "Brochures, flyers, inserts, and signage, prepared to your printer's specification.",
      },
      {
        title: "Template kits",
        desc: "Editable templates your team can reuse without breaking the layout or drifting off-brand.",
      },
    ],
    process: [
      { title: "Brief", desc: "What it's for, who will see it, and where it will be used." },
      { title: "Concept", desc: "A few directions presented, so you choose before the details are worked out." },
      { title: "Refine", desc: "The chosen direction developed and adapted across every size and format." },
      { title: "Deliver", desc: "Final files, print-ready artwork, and editable templates." },
    ],
    faqs: [
      {
        q: "Do we need brand guidelines before you start?",
        a: "No, though they help. If you have guidelines, we work within them. If not, we can set up a light visual system as part of the project — or take on the full identity through Brand Design.",
      },
      {
        q: "Which formats will we receive?",
        a: "Whatever you'll use: print-ready PDFs, web-optimised images, and editable source files and templates in the tools your team already works in.",
      },
      {
        q: "Can you handle ongoing design requests?",
        a: "Yes. Most design needs are continuous rather than one-off, so we can work on a retainer and pick requests up as they come in.",
      },
    ],
    category: "design",
    icon: (
      <>
        <path
          d="M4.6 19.4l1.7-4.9 9.2-9.2a2.3 2.3 0 013.2 3.2l-9.2 9.2-4.9 1.7z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M14.2 6.7l3.1 3.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    slug: "seo",
    title: "SEO",
    desc: "Technical and content SEO that earns rankings which hold — no shortcuts, no rented traffic.",
    detail:
      "A technical audit to clear whatever is holding you back, then keyword and content work aimed at intent rather than raw volume. Schema, internal linking, and page speed get handled alongside it, because rankings follow the whole picture.",
    fit: [
      "Your site gets little organic traffic, or traffic that never turns into enquiries.",
      "You've lost rankings after a redesign, a migration, or an algorithm update.",
      "You're launching or rebuilding a site and want search built in from the start.",
    ],
    deliverables: [
      {
        title: "Technical audits",
        desc: "Crawling, indexing, speed, and site-structure problems found and fixed, in order of how much they're costing you.",
      },
      {
        title: "Keyword strategy",
        desc: "Keywords mapped to search intent and grouped into pages that can realistically rank for them.",
      },
      {
        title: "On-page & schema",
        desc: "Titles, headings, internal links, and structured data set up so search engines understand what each page is about.",
      },
      {
        title: "Rank reporting",
        desc: "Rankings, organic traffic, and the enquiries that traffic produces, tracked and reported in plain terms.",
      },
    ],
    process: [
      { title: "Audit", desc: "A technical and content review of where the site stands today." },
      { title: "Strategy", desc: "Target keywords, priorities, and a content plan agreed." },
      { title: "Implement", desc: "Technical fixes, on-page changes, and new content rolled out." },
      { title: "Measure", desc: "Rankings and traffic tracked, with the plan adjusted as results come in." },
    ],
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Longer than ads. Technical fixes can show up quickly, but rankings for competitive terms build over months — and we'd rather tell you that now than promise page one by next week.",
      },
      {
        q: "Can you guarantee first-page rankings?",
        a: "No, and be wary of anyone who does — nobody outside Google controls how it ranks pages. What we commit to is the work search engines reward, and honest reporting on what it achieves.",
      },
      {
        q: "Will you write the content as well?",
        a: "We can. Or we brief your writers with the keyword, structure, and intent for each page, and review drafts before they go live.",
      },
    ],
    category: "growth",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 15.5L20.5 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M8 12.4v-1.6M10.5 12.4V8.7M13 12.4v-2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Solutions",
    desc: "Custom AI agents and automations that take the repetitive work off your team's desk.",
    detail:
      "Chatbots, document pipelines, and internal agents wired into the tools you already run. We scope the workflow first, prove the value on a single process, then extend — with a human kept in the loop wherever the stakes call for one.",
    fit: [
      "Your team loses hours to repetitive work — copying data, answering the same questions, sorting documents.",
      "You want to use AI in the business but aren't sure where it would genuinely help.",
      "Your support inbox is growing faster than your team.",
    ],
    deliverables: [
      {
        title: "AI agents & chatbots",
        desc: "Assistants that answer from your own documentation and data, and hand over to a person when a question is beyond them.",
      },
      {
        title: "Workflow automation",
        desc: "The repetitive steps between your tools automated end to end — form to CRM, invoice to accounts, email to ticket.",
      },
      {
        title: "LLM integrations",
        desc: "Language models built into your product or internal tools to summarise, extract, classify, and draft.",
      },
      {
        title: "Internal tooling",
        desc: "Simple dashboards and admin screens where your team can review, approve, and correct what the automation does.",
      },
    ],
    process: [
      { title: "Map", desc: "The workflow documented step by step, with what it costs in time today." },
      { title: "Prove", desc: "A working pilot on a single process, measured against how it ran before." },
      { title: "Extend", desc: "What works rolled out to more processes and wired into your tools." },
      { title: "Monitor", desc: "Accuracy and usage tracked, with a person reviewing the decisions that matter." },
    ],
    faqs: [
      {
        q: "Is our data safe if we use AI?",
        a: "We design for that from the start: providers and settings that don't train on your data, models that can only reach what the task needs, and sensitive steps kept under human review.",
      },
      {
        q: "Will AI replace our team?",
        a: "That isn't the aim. What we automate is the repetitive part of people's jobs, so your team spends its time on the decisions and conversations that need a person.",
      },
      {
        q: "What happens when the AI gets something wrong?",
        a: "It will, sometimes — which is why the checks are built in: human approval for consequential actions, and logs you can review. We start where a mistake is cheap and extend as accuracy is proven.",
      },
    ],
    category: "build",
    icon: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 3.4v2.2M14 3.4v2.2M10 18.4v2.2M14 18.4v2.2M3.4 10h2.2M3.4 14h2.2M18.4 10h2.2M18.4 14h2.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M12 9.8l.75 1.45L14.2 12l-1.45.75L12 14.2l-.75-1.45L9.8 12l1.45-.75L12 9.8z" fill="currentColor" />
      </>
    ),
  },
  {
    slug: "package-design",
    title: "Package Design",
    desc: "Retail-ready packaging — structure, artwork, and dielines that survive contact with the printer.",
    detail:
      "Concepts through to print-ready artwork: structural options, shelf-impact studies, and dielines prepared to your printer's spec — with mockups, so you can see the box before you commit to a run of ten thousand.",
    fit: [
      "You're launching a product and need packaging that holds its own on the shelf.",
      "Your current packaging looks dated next to your competitors'.",
      "You're extending a range and need variants that clearly belong together.",
    ],
    deliverables: [
      {
        title: "Structural concepts",
        desc: "Box, pouch, bottle, or carton options weighed for protection, cost, and how the pack opens in the customer's hands.",
      },
      {
        title: "Print-ready dielines",
        desc: "Artwork laid out on accurate dielines, with bleeds, folds, and finishes marked to your printer's requirements.",
      },
      {
        title: "Label & carton artwork",
        desc: "Front-of-pack design plus the detail that has to be there — ingredients, barcodes, and regulatory marks — set out legibly.",
      },
      {
        title: "3D mockups",
        desc: "Realistic renders of the finished pack for sign-off, retail listings, and pre-launch marketing.",
      },
    ],
    process: [
      { title: "Research", desc: "The shelf, your competitors, and the limits your product and printer set." },
      { title: "Concept", desc: "Directions presented as mockups, so you judge them as a finished pack." },
      { title: "Develop", desc: "The chosen design refined and extended across sizes and variants." },
      { title: "Prepare for print", desc: "Final dielines and artwork checked against the printer's specification." },
    ],
    faqs: [
      {
        q: "Do you work with our printer or manufacturer?",
        a: "Yes. We work from their dieline and specifications where they exist, and can deal with them directly on proofs, finishes, and colour.",
      },
      {
        q: "Can you design packaging for a whole product range?",
        a: "Yes. We design a system rather than a single box, so variants, flavours, or sizes are easy to tell apart while still reading as one brand.",
      },
      {
        q: "Can we see the packaging before it goes to print?",
        a: "You'll see 3D mockups throughout the design stage, and we recommend a physical proof from your printer before the full run, so colour and fit hold no surprises.",
      },
    ],
    category: "design",
    icon: (
      <>
        <path
          d="M12 3.2l8 4v9.6l-8 4-8-4V7.2l8-4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 7.2l8 4 8-4M12 11.2v9.6M8 5.2l8 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "brand-design",
    title: "Brand Design",
    desc: "Logos, identity systems, and guidelines that make you recognisable everywhere you show up.",
    detail:
      "Positioning and naming through to a full identity — logo suite, palette, type scale, and the usage rules written down. The guidelines matter: the brand has to survive being handed to a printer, an agency, or a new hire.",
    fit: [
      "You're starting a business and need an identity that looks established from day one.",
      "Your brand has grown inconsistent as different people have designed for it.",
      "You've outgrown the logo you started with.",
    ],
    deliverables: [
      {
        title: "Logo & identity suite",
        desc: "A primary logo with alternate lockups and marks, prepared for everything from a favicon to a shopfront sign.",
      },
      {
        title: "Brand guidelines",
        desc: "Logo use, colour, type, imagery, and tone of voice, written so a printer, an agency, or a new hire can apply them correctly.",
      },
      {
        title: "Typography & palette",
        desc: "Typefaces and colours chosen for legibility and licensing, with accessible colour pairings for screens.",
      },
      {
        title: "Collateral system",
        desc: "Business cards, stationery, social templates, and presentation layouts that put the identity to work.",
      },
    ],
    process: [
      { title: "Discover", desc: "Positioning, audience, competitors, and what the brand needs to say." },
      { title: "Explore", desc: "Distinct creative routes presented, each with its reasoning." },
      { title: "Refine", desc: "One route developed into a complete identity system." },
      { title: "Codify", desc: "Guidelines written and final assets delivered in every format you need." },
    ],
    faqs: [
      {
        q: "Can you help with naming and positioning too?",
        a: "Yes. If the name or positioning isn't settled, we start there — an identity is far stronger when it's built on a clear idea of what the brand stands for.",
      },
      {
        q: "We already have a logo. Can you refresh it rather than start over?",
        a: "Yes. If your logo has recognition worth keeping, we refine it and build a fuller system around it instead of replacing it.",
      },
      {
        q: "What files do we receive?",
        a: "Logo files in vector and web formats, colour and type specifications, the brand guidelines, and editable templates — with full rights to all of it.",
      },
    ],
    category: "design",
    icon: (
      <>
        <path
          d="M7.6 3.6h8.8l4 5.6-8.4 11.2L3.6 9.2l4-5.6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M3.6 9.2h16.8M9.6 9.2L12 20.4l2.4-11.2L12 3.6 9.6 9.2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    desc: "Product demos, ads, and social cuts edited to hold attention past the first three seconds.",
    detail:
      "Raw footage, screen recordings, or a blank page — we edit, grade, and score product demos, launch films, and short-form social cuts, delivered in every aspect ratio the platforms ask for.",
    fit: [
      "You have footage, but no time or team to turn it into something polished.",
      "You need a steady flow of short-form video for social.",
      "You're launching a product and need a demo that explains it quickly.",
    ],
    deliverables: [
      {
        title: "Product demos & ads",
        desc: "Demos and ad cuts structured to explain the product fast, with the hook up front where it belongs.",
      },
      {
        title: "Short-form social cuts",
        desc: "Reels, Shorts, and TikToks cut for vertical viewing, with captions for everyone watching on mute.",
      },
      {
        title: "Motion graphics",
        desc: "Animated titles, callouts, and UI walkthroughs that explain what the footage alone can't.",
      },
      {
        title: "Colour & sound",
        desc: "Grading, audio clean-up, music, and the final mix, so the video looks and sounds finished.",
      },
    ],
    process: [
      { title: "Brief", desc: "Purpose, audience, platforms, and the footage or assets available." },
      { title: "Rough cut", desc: "Structure and pacing assembled for your feedback before any polish." },
      { title: "Refine", desc: "Motion graphics, colour, sound, and captions added." },
      { title: "Deliver", desc: "Final exports in every aspect ratio and format the platforms need." },
    ],
    faqs: [
      {
        q: "What do we need to provide?",
        a: "Raw footage, screen recordings, or just a script and your brand assets. With no footage at all, we can build the video from motion graphics, product screens, and licensed stock.",
      },
      {
        q: "Can you edit for our social channels on an ongoing basis?",
        a: "Yes. Short-form video works best on a steady schedule, so we can set up an ongoing arrangement and deliver cuts in regular batches.",
      },
      {
        q: "Which formats will we receive?",
        a: "Every version you need — vertical for Reels, Shorts, and TikTok, square and landscape for feeds and YouTube — each exported to that platform's recommended settings.",
      },
    ],
    category: "design",
    icon: (
      <>
        <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10.2 9.4l4.6 2.6-4.6 2.6V9.4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

/** How many service tiles the home page shows before the "View more" button. */
export const HOME_SERVICE_COUNT = 6;

/** The page for a single service. */
export const serviceHref = (slug: string) => `/services/${slug}`;

/**
 * The cursor-follow spotlight on service cards, tuned to each category's
 * accent (the matching --accent values live in globals.css).
 */
export const CATEGORY_SPOTLIGHT: Record<
  ServiceCategory,
  `rgba(${number}, ${number}, ${number}, ${number})`
> = {
  design: "rgba(139, 92, 246, 0.22)",
  build: "rgba(34, 211, 238, 0.2)",
  growth: "rgba(236, 72, 153, 0.2)",
};

/**
 * Category sections for the /services page. Twelve detail cards in one
 * undifferentiated grid reads as a wall, so they are split three ways — and the
 * `id` doubles as the anchor target for the jump links above the grid.
 */
const GROUP_META = [
  {
    id: "design",
    title: "Design & Brand",
    blurb:
      "Identity, interface, and everything else people actually see — drawn from one system, so the tenth touchpoint looks like it belongs with the first.",
  },
  {
    id: "build",
    title: "Build & Engineering",
    blurb:
      "The software itself: sites, apps, platforms, and the automations behind them — built so your team can keep shipping long after launch week.",
  },
  {
    id: "growth",
    title: "Growth & Marketing",
    blurb:
      "Getting it in front of the right people and proving it worked — organic and paid, measured against revenue rather than impressions.",
  },
] as const satisfies readonly { id: ServiceCategory; title: string; blurb: string }[];

export const SERVICE_GROUPS = GROUP_META.map((group) => ({
  ...group,
  services: SERVICES.filter((s) => s.category === group.id),
}));

/** The category section a service is listed under on /services. */
export function groupOf(service: Service) {
  return SERVICE_GROUPS.find((group) => group.id === service.category)!;
}

/**
 * Services to suggest at the foot of a detail page: the rest of its own
 * category first, then the wider catalogue. Both run in catalogue order
 * starting just after this service and wrapping round, so neighbouring pages
 * don't all suggest the same first few.
 */
export function relatedServices(service: Service, count = 3): Service[] {
  const i = SERVICES.indexOf(service);
  const rest = [...SERVICES.slice(i + 1), ...SERVICES.slice(0, i)];
  return [
    ...rest.filter((s) => s.category === service.category),
    ...rest.filter((s) => s.category !== service.category),
  ].slice(0, count);
}
