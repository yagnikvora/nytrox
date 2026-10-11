/**
 * Puts the starting set of blog posts into Sanity, covers included, so /blog
 * has something on it the day it goes live.
 *
 *     npm run seed:blog
 *
 * Reads SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_API_TOKEN from .env (see
 * .env.example); the token needs write permission.
 *
 * Safe to run again: each post has a fixed id and is only created if that id
 * is not already there, so a post that has since been edited - or deleted and
 * rewritten - in the Studio is never overwritten. After the first run the
 * Studio is where these live; this file is not their source of truth.
 *
 * The shape of each document matches studio/schemaTypes/post.ts.
 */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("[seed-blog] SANITY_PROJECT_ID / SANITY_API_TOKEN is not set - see .env.example");
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   A few helpers for writing Portable Text by hand. Inline text takes
   **bold** and [label](href); everything else is one helper per block.
--------------------------------------------------------------------------- */
let keyCount = 0;
const key = () => `k${(keyCount++).toString(36).padStart(4, "0")}`;

function inline(text) {
  const children = [];
  const markDefs = [];
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  const push = (value, marks = []) =>
    value && children.push({ _type: "span", _key: key(), text: value, marks });

  for (const match of text.matchAll(pattern)) {
    push(text.slice(last, match.index));
    if (match[1]) push(match[1], ["strong"]);
    else {
      const def = { _type: "link", _key: key(), href: match[3] };
      markDefs.push(def);
      push(match[2], [def._key]);
    }
    last = match.index + match[0].length;
  }
  push(text.slice(last));
  return { children, markDefs };
}

const block = (style, text, extra = {}) => ({
  _type: "block",
  _key: key(),
  style,
  ...inline(text),
  ...extra,
});

const p = (text) => block("normal", text);
const h2 = (text) => block("h2", text);
const h3 = (text) => block("h3", text);
const quote = (text) => block("blockquote", text);
const list = (listItem) => (...items) =>
  items.map((text) => block("normal", text, { listItem, level: 1 }));
const ul = list("bullet");
const ol = list("number");

/* ---------------------------------------------------------------------------
   The posts. Same rule as the service pages: no prices, timelines, or results
   figures - those belong in a proposal, not on a page that can't know the
   project.
--------------------------------------------------------------------------- */
const POSTS = [
  {
    slug: "website-web-app-or-mobile-app",
    title: "Website, Web App, or Mobile App: Which Does Your Business Need?",
    excerpt:
      "Three different things that often get asked for by the wrong name. A plain guide to what each one is, what each is good at, and how to tell which your business needs first.",
    category: "engineering",
    publishedAt: "2026-10-11T03:30:00.000Z",
    relatedServices: ["website-development", "mobile-app-development", "ui-ux-design"],
    seoTitle: "Website vs Web App vs Mobile App: Which Do You Need?",
    body: [
      p(
        "Most first conversations with a new client start with a request for a particular thing: \"we need an app\" or \"we need a new website\". Quite often the thing named is not the thing the business needs. That is not a failing on anyone's part - the three terms overlap, and people use them loosely. But they differ in what they are for, what they take to build, and what they ask of you afterwards, so it is worth getting straight before a brief is written."
      ),
      h2("What each one actually is"),
      h3("A website"),
      p(
        "A website is something people **read**. Its job is to explain who you are, show what you offer, and get a visitor to take one step - call, enquire, book, or buy. Visitors arrive from a search or a link, they do not sign in, and every one of them sees much the same pages. A company site, a portfolio, a restaurant's menu and booking page, and most online shops are all websites."
      ),
      h3("A web app"),
      p(
        "A web app is something people **use**. It runs in the browser like a website, but each person signs in and sees their own data: a customer portal, a booking system, a dashboard for your staff, an inventory tool. The value is in what it lets someone do, not in what it says."
      ),
      h3("A mobile app"),
      p(
        "A mobile app is installed from the App Store or Google Play and lives on the phone. That earns it things the browser cannot do as well: push notifications, working without a connection, the camera and location, and a place on the home screen. It also has to be approved by the stores, and kept up to date as phones change."
      ),
      h2("Start from the problem, not the product"),
      p("The quickest way to pick is to ignore the three names and answer a few questions about the people you are building for:"),
      ...ul(
        "**How do they find you?** If the answer is \"by searching\", you need a website whatever else you build. Search engines index pages, not apps.",
        "**How often will they come back?** Something used once or twice a year does not earn a place on a phone. Something used every day might.",
        "**Do they need to sign in?** If people have accounts, orders, or records of their own, you are describing an app of some kind.",
        "**Does it need the phone itself?** Notifications, offline use, the camera, or location are the honest reasons to go native.",
        "**Who is it for?** A tool for your own staff has very different needs from something the public will judge in ten seconds."
      ),
      h2("When a website is the right answer"),
      p(
        "For most businesses, most of the time, this is the one. If the goal is to be found, be trusted, and turn visitors into enquiries, a fast and well-structured website does that better than anything else - and it is the only one of the three that search engines can send people to. It is also where every other channel ends up: an advert, a social post, and a business card all point at it."
      ),
      p(
        "A website stops being enough when visitors need to do real work on it. If you find yourself asking for accounts, saved data, and screens that differ from person to person, you have outgrown a website. More on what goes into a good one on our [website development](/services/website-development) page."
      ),
      h2("When you need a web app"),
      p(
        "Choose a web app when the product is a tool and the people using it are mostly at a desk, or when you want one build that works on every device without anything to install. Internal systems are the classic case: order management, client portals, reporting dashboards, booking and scheduling. There is no store approval to wait on, and an update reaches every user the moment it is released."
      ),
      p(
        "A web app also makes a sensible first version of something that may become a mobile app later. It lets you find out what people really use before committing to two more platforms."
      ),
      h2("When a mobile app earns its place"),
      p(
        "A mobile app is the right call when the phone is where the product lives: something used daily or on the move, something that has to work with no signal, or something that depends on notifications to be useful at all. Delivery and field-service tools, fitness and habit products, and loyalty schemes for regular customers all fit."
      ),
      p(
        "It is the wrong call when it is being asked to do a website's job. An app nobody has a reason to open a second time does not get kept, and it cannot be found by someone who has not already heard of you. If you are weighing it up, our [mobile app development](/services/mobile-app-development) page covers how native and cross-platform builds compare."
      ),
      h2("You may need more than one - just not all at once"),
      p(
        "These are not rivals. Plenty of businesses end up with a website that brings people in and an app that serves them once they are customers. What matters is the order. Build the piece that removes the biggest obstacle first, put it in front of real users, and let what you learn decide the next one."
      ),
      quote("The expensive mistake is rarely choosing the wrong technology. It is building all three before finding out which one people wanted."),
      h2("Still not sure?"),
      p(
        "Describe the problem rather than the solution - who the users are, what they are trying to get done, and what gets in their way today. From there the right shape is usually clear within one conversation. If you would like a second opinion on yours, [tell us about the project](/contact) and we will say which of these it actually calls for, including when the answer is the smaller one."
      ),
    ],
  },
  {
    slug: "seo-before-launch-new-website",
    title: "SEO Before Launch: What to Get Right on a New Website",
    excerpt:
      "Most SEO problems are built in before a site goes live. Here is what to settle while the site is still being made - structure, speed, titles, and the technical basics - so it can be found from day one.",
    category: "growth",
    publishedAt: "2026-10-11T04:30:00.000Z",
    relatedServices: ["seo", "website-development", "digital-marketing"],
    seoTitle: "SEO Checklist for a New Website: What to Do Before Launch",
    body: [
      p(
        "Search engine optimisation is often treated as something you add once a website is finished. In practice, most of what decides whether a site can rank is settled while it is being built: how the pages are organised, how quickly they load, and whether a search engine can read them at all. Fixing those afterwards means rebuilding. Getting them right the first time costs very little."
      ),
      p("This is the list we work through on a new site before it goes live. None of it is a trick, and none of it needs a specialist tool to check."),
      h2("One page for each thing people search for"),
      p(
        "A search engine ranks pages, not websites. If you offer five services and describe all of them on one page, that page is trying to answer five different searches at once and will do none of them well. Give each service, each product category, and each location its own page, written about that one thing."
      ),
      p(
        "Before any design starts, write down what your customers would type to find you, and check that each of those searches has one obvious page to land on. Where two pages would compete for the same search, merge them."
      ),
      h2("Clear addresses that never need to change"),
      p(
        "A page address should say what the page is: **/services/seo** rather than **/page?id=47**. Keep addresses short, lower-case, and hyphenated, and decide them once. Every address you change later has to be redirected, and every redirect you forget is a broken link somewhere on the internet."
      ),
      p(
        "If the new site replaces an old one, list every old address and point each to its new home with a permanent redirect before launch. Skipping this is the most common way a redesign loses the traffic the old site had earned."
      ),
      h2("A title and description written for every page"),
      p("The title is the blue link in a search result, and the description is the two lines under it. Together they are your advert on the results page, so write them by hand:"),
      ...ul(
        "**Title** - what the page is about in the words a searcher would use, with your name at the end. Aim for around sixty characters; the rest gets cut off.",
        "**Description** - one or two sentences on what the visitor will find. Around a hundred and fifty-five characters is what fits.",
        "**Unique on every page** - two pages with the same title look like the same page to a search engine."
      ),
      h2("Headings that follow the content"),
      p(
        "Each page gets one main heading saying what the page is, then sub-headings that break it into sections in order. That structure is how a search engine works out what a page covers - and how a visitor in a hurry decides whether to stay. Choose headings for what they say, never for the size they happen to be styled at."
      ),
      h2("Speed is part of SEO"),
      p(
        "Google measures how quickly a page becomes usable and counts it in ranking. Visitors measure it too, and leave. Most slow sites are slow for the same few reasons:"
      ),
      ...ul(
        "**Images far larger than the space they fill.** Resize them and serve a modern format.",
        "**Too many third-party scripts.** Every chat widget, tracker, and embed adds to the wait. Keep the ones you use.",
        "**Layout that jumps as it loads.** Reserve the space for images and adverts so text does not move under the reader's thumb.",
        "**Everything loaded up front.** What sits below the first screen can wait until it is needed."
      ),
      p("Test on a mid-range phone on mobile data, not on the office connection. That is how most of your visitors will meet the site."),
      h2("Make sure it can be crawled"),
      p("A handful of technical basics decide whether a search engine can read the site at all. Check each one before launch:"),
      ...ol(
        "**The site is not blocking search engines.** Development sites are often set to \"noindex\" on purpose - and it is easy to launch with that still switched on.",
        "**There is a sitemap** listing every page, and it is submitted in Google Search Console.",
        "**There is a robots.txt** that allows crawling and points to the sitemap.",
        "**Every page names its canonical address,** so the same page reached two ways is not counted as two.",
        "**The whole site is on HTTPS,** with the plain-HTTP version redirecting to it.",
        "**Missing pages return a real 404,** not a normal page that says \"not found\"."
      ),
      h2("Structured data where it fits"),
      p(
        "Structured data is a short block of code that states plainly what a page contains - a business with an address and opening hours, an article with a date and an author, a product with a price. It does not raise a ranking by itself. What it does is let a search engine show a fuller result, and remove any doubt about what it is looking at. A local business, in particular, should have it."
      ),
      h2("Link your own pages together"),
      p(
        "Links inside your site tell a search engine which pages matter and how they relate. Every important page should be reachable in a click or two from the home page, and related pages should point to each other with link text that describes where it goes - \"our SEO service\", not \"click here\". A page nothing links to is a page that is rarely found."
      ),
      h2("Set up measurement on the first day"),
      p(
        "Connect Google Search Console and an analytics tool before launch, not a month after. Search Console shows which searches the site appears for and flags pages it could not read; you want that history from the start. Without it, every later decision about the site is a guess."
      ),
      h2("After launch, it is about content"),
      p(
        "Everything above gets a site to the starting line: it makes sure nothing is holding it back. What moves it up from there is being useful - pages that answer the question properly, kept up to date, and added to over time. That part is steady work rather than a checklist, and it is where the foundations start to pay off."
      ),
      p(
        "We build these foundations into every site as part of [website development](/services/website-development), and pick up the ongoing work under [SEO](/services/seo). If you have a launch coming and would like it checked first, [get in touch](/contact)."
      ),
    ],
  },
  {
    slug: "ai-automation-where-to-start",
    title: "AI Automation for Small Businesses: Where to Start",
    excerpt:
      "AI automation pays off when it is pointed at the right task. How to find a good first process in your business, what makes one a poor fit, and how to roll it out without losing control of the result.",
    category: "ai",
    publishedAt: "2026-10-11T05:30:00.000Z",
    relatedServices: ["ai-automation", "website-development"],
    seoTitle: "AI Automation for Small Business: Where to Start",
    body: [
      p(
        "Nearly every business owner we speak to has the same two thoughts about AI: that it ought to be saving them time, and that they are not sure where it fits. Both are fair. The tools are capable, but the gap between a clever demonstration and something your team relies on every day is wide - and most of the disappointment comes from starting in the wrong place."
      ),
      p("This is how we would go about finding the right place, written for someone running a business rather than building software."),
      h2("What AI automation actually means"),
      p(
        "Strip away the vocabulary and it comes down to this: handing a piece of repetitive, language-heavy work to software. Reading an email and working out what it is asking. Pulling the figures out of an invoice. Answering a question your team has answered a hundred times. Drafting a reply for a person to check."
      ),
      p(
        "What is new is that software can now cope with messy input. Older automation needed everything in a fixed format; the current tools can read a rambling email or a photographed form and still extract what matters. That opens up a lot of everyday office work that could not be automated before."
      ),
      h2("Where it tends to work well"),
      ...ul(
        "**Answering routine questions** - opening hours, order status, how to book, what a service includes. A chatbot trained on your own information handles these at any hour and passes on what it cannot answer.",
        "**Sorting what comes in** - reading enquiries and emails, tagging them, and sending each to the right person with the key details already picked out.",
        "**Getting data out of documents** - invoices, forms, CVs, and receipts turned into rows in the system you already use, instead of being retyped.",
        "**First drafts** - replies, summaries, quotes, and reports prepared for a person to review and send.",
        "**Finding things in your own records** - asking a question in plain language and getting the answer from your documents, with the source shown."
      ),
      h2("Finding a good first process"),
      p("The best candidate is rarely the most impressive one. Look for a task with these qualities:"),
      ...ol(
        "**It happens often.** Something done many times a week repays the effort of automating it. Something done twice a year does not.",
        "**It follows a pattern.** If you could explain it to a new member of staff in a page, software can probably learn it.",
        "**The input already exists digitally** - emails, forms, files. If the work starts on paper or in someone's head, fix that first.",
        "**A mistake is cheap to catch.** Start where an error means a slightly odd draft, not a wrong payment.",
        "**Someone owns it.** One person who knows the task well and wants it off their desk is worth more than any tool."
      ),
      p(
        "A useful exercise: ask each member of the team which task they would hand over tomorrow if they could. The same two or three answers tend to come up, and they are usually the right place to begin."
      ),
      h2("Where to hold back"),
      p("Some work is a poor fit, at least for a first project:"),
      ...ul(
        "**Decisions with serious consequences** - anything legal, medical, or financial where a confident wrong answer does real harm. AI can prepare the material; a person should make the call.",
        "**Conversations that need judgement or care** - a complaint, a negotiation, bad news. Customers can tell, and they mind.",
        "**A process that is already broken.** Automating a muddle gives you a faster muddle. Straighten the steps out first.",
        "**Tasks with no way to check the result.** If nobody can tell whether the output is right, you cannot trust it and should not ship it."
      ),
      h2("Prove it on one process, then extend"),
      p(
        "The rollout that works is unglamorous. Pick one process. Write down exactly how it is done today, including the exceptions. Build the automation for that alone, and run it alongside the existing way of working until the people who know the task agree the output is good. Only then let it take over - and only then look at the next one."
      ),
      p(
        "This is slower than switching on a tool across the whole business, and far more likely to still be in use a year later. Each process you prove also teaches you something about your own data that makes the next one easier."
      ),
      h2("Keep a person in the loop"),
      p(
        "Automation does not have to mean unattended. The most dependable setups have the software do the reading, sorting, and drafting, and a person approve anything that leaves the building or changes a record. As confidence grows, the checks can be relaxed where the stakes are low and kept where they are not."
      ),
      quote("The aim is not to remove people from the work. It is to remove the part of the work that never needed a person."),
      h2("What to have ready before you ask anyone to build it"),
      ...ul(
        "A description of the process as it runs today, step by step.",
        "A set of real examples - the emails, documents, or questions the system will face, including the awkward ones.",
        "A clear statement of what a good result looks like, so it can be tested.",
        "The list of tools it has to connect to: your inbox, CRM, spreadsheet, accounting package.",
        "A decision on who reviews the output, and what happens when the system is unsure."
      ),
      p(
        "With those in hand, a good partner can tell you quickly whether the idea is sound, and what it would involve. Without them, any estimate is a guess."
      ),
      h2("Start small, and start with the work"),
      p(
        "The businesses that get lasting value from AI are seldom the ones that began with the technology. They began with a task that was eating their week, and worked backwards from there. If you have one in mind, our [AI automation](/services/ai-automation) page explains how we scope and build these - or [tell us about the process](/contact) and we will say honestly whether it is a good candidate."
      ),
    ],
  },
  {
    slug: "packaging-design-brief",
    title: "Packaging Design: What to Decide Before You Brief a Designer",
    excerpt:
      "Good packaging starts before any artwork. The decisions to make first - format, printer, mandatory information, and where it will be sold - and why each one shapes the design.",
    category: "design",
    publishedAt: "2026-10-11T06:00:00.000Z",
    relatedServices: ["package-design", "brand-design", "graphic-design"],
    seoTitle: "Packaging Design Brief: What to Decide Before You Start",
    body: [
      p(
        "Packaging is the one piece of design your customer holds in their hands. It is also the one with the most ways to go wrong after the design is approved: artwork that does not fit the carton, colours that print differently from the screen, a barcode that will not scan. Almost all of those problems come from decisions that were left open at the start."
      ),
      p("If you are about to commission packaging, these are the things worth settling first. A designer can help with every one of them - but the answers are yours."),
      h2("Know where it will be sold"),
      p(
        "A pack that sits on a crowded shop shelf has a different job from one that arrives in a courier bag. On a shelf it has a second or two to be noticed among competitors, usually from a distance and often only from the front. Sold online, it is first seen as a small thumbnail, and the moment that matters is the unboxing."
      ),
      p("Tell your designer which it is - and if it is both, which comes first. It changes how large the name is, how much the front panel carries, and where the effort goes."),
      h2("Fix the format before the artwork"),
      p(
        "Artwork is drawn onto a **dieline**: the flat template of the pack, showing every fold, cut, and glue flap. Until the dieline exists, any design is a guess. So the structure comes first - box, pouch, bottle label, sleeve, tin - along with its exact dimensions."
      ),
      ...ul(
        "**If you already have a printer or supplier,** ask them for the dieline. They will have one for each standard size.",
        "**If the pack is custom,** the structure needs designing and sampling before the graphics start.",
        "**If you have several sizes or variants,** list them all now. A design that works on the large pack can fall apart on the small one."
      ),
      h2("Gather everything that must legally appear"),
      p(
        "Most products have to carry certain information, and the rules depend on what the product is and where it is sold: ingredients or materials, net quantity, manufacturer details, dates and batch codes, country of origin, warnings, and a barcode. Food, cosmetics, and anything for export tend to have the longest lists."
      ),
      p(
        "Collect this text before design begins and have it checked by whoever is responsible for compliance in your business. Mandatory content takes up real space - often most of the back panel - and squeezing it in afterwards is what ruins otherwise good layouts. A designer arranges this information clearly; confirming that it is correct and complete is the brand owner's job."
      ),
      h2("Decide how the range fits together"),
      p(
        "Even if you are launching one product, decide what happens when there are five. A range needs a system: what stays the same on every pack so the brand is recognised, and what changes so a customer can tell the flavours, sizes, or strengths apart at a glance. Colour is the usual answer, but it has to be planned - there are only so many colours that stay distinct from each other on a shelf."
      ),
      h2("Understand how it will be printed"),
      p(
        "Print method decides what the design can do. The number of colours, special inks, foils, embossing, and the material itself all come with limits and costs that vary from printer to printer. A design that depends on a fine metallic detail is no use if your printer cannot hold it at that size."
      ),
      p("The safe route is to put your designer in touch with the printer early. A short conversation about what the press can do saves a redesign later."),
      quote("Colour on a screen is light. Colour on a carton is ink on board. They will never match exactly, which is why a printed proof matters more than any mock-up."),
      h2("Always see a physical proof"),
      p(
        "Before a full print run, ask for a proof on the real material and, where possible, a made-up sample. Check the colours in daylight, read the smallest text, scan the barcode, and fold the pack to see that nothing important lands on a crease or a glue flap. This is the last point at which a mistake is cheap."
      ),
      h2("What to hand your designer"),
      ...ul(
        "The dieline, or the supplier who can provide it.",
        "Your logo and brand guidelines, if they exist.",
        "All mandatory text, checked and final.",
        "The list of variants and sizes, now and planned.",
        "Where the product will be sold, and who buys it.",
        "Two or three competitor packs you will be sitting beside."
      ),
      p(
        "With those in hand, design time goes on the design. Our [package design](/services/package-design) service covers structure, artwork, and print-ready dielines, and where the brand itself is still unsettled we usually start with [brand design](/services/brand-design) first. If you have a product on the way, [tell us about it](/contact)."
      ),
    ],
  },
  {
    slug: "video-editing-for-business",
    title: "Video Editing for Business: Getting More From What You Shoot",
    excerpt:
      "Most business video is won or lost before the edit begins. How to plan a shoot around the edit, what an editor actually does, and how to turn one recording into several useful videos.",
    category: "design",
    publishedAt: "2026-10-11T06:30:00.000Z",
    relatedServices: ["video-editing", "digital-marketing", "graphic-design"],
    seoTitle: "Video Editing for Business: Plan, Edit, and Repurpose",
    body: [
      p(
        "Businesses often arrive at an editor with a folder of footage and a hope that it can be turned into something good. Sometimes it can. More often the footage is missing the one shot the story needed, or the sound is unusable, and no amount of editing puts back what was never recorded."
      ),
      p("Editing is where a video is made, but it works with what it is given. A little planning before the camera comes out makes the difference between an edit that rescues and an edit that polishes."),
      h2("Decide what the video is for"),
      p("One video cannot do everything. Before anything is filmed, choose a single job for it:"),
      ...ul(
        "**Explain** - show how a product or service works to someone already interested.",
        "**Introduce** - tell a stranger who you are in a few seconds, usually as an advert.",
        "**Reassure** - let a customer or a member of the team speak, so a buyer can trust you.",
        "**Teach** - answer a question your customers keep asking."
      ),
      p("The job decides the length, the pace, where it will be shown, and what the viewer should do at the end. Write that last part down. A video without a next step is entertainment."),
      h2("Shoot with the edit in mind"),
      p("A few habits on the day give an editor far more to work with:"),
      ...ul(
        "**Record clean sound.** Viewers forgive an average picture long before they forgive bad audio. Use a proper microphone and a quiet room.",
        "**Film more than the person talking.** Hands at work, the product in use, the place itself. These cutaway shots are what let an editor shorten a sentence without a visible jump.",
        "**Hold each shot for a few seconds longer than feels natural,** before and after the action.",
        "**Shoot for the shape it will be shown in.** Upright for phone feeds, wide for a website or a presentation. If you need both, frame loosely enough to crop.",
        "**Keep the lighting consistent** across a session, so clips cut together without the colour jumping."
      ),
      h2("What an editor actually does"),
      p("Editing is more than trimming. In rough order, the work is:"),
      ...ol(
        "**Selecting** - going through everything and keeping only what earns its place.",
        "**Structuring** - arranging it so the point lands early and the rest supports it.",
        "**Pacing** - tightening pauses, cutting on movement, deciding where the viewer gets a breath.",
        "**Sound** - cleaning the voice, balancing music under speech, adding the small sounds that make a cut feel finished.",
        "**Colour** - matching shots to each other and giving the piece a consistent look.",
        "**Graphics and captions** - titles, labels, your logo, and subtitles."
      ),
      p("Most of the improvement comes from the first three. A well-chosen, well-ordered rough cut with no effects beats a badly structured one with every effect applied."),
      h2("The first seconds decide everything"),
      p(
        "In a feed, a viewer decides almost at once whether to keep watching. That means the opening cannot be a logo animation or a slow introduction. Lead with the most interesting thing you have - the result, the problem, the surprising line - and explain afterwards."
      ),
      p("Assume, too, that many people will watch with the sound off. Captions are not an extra; for social video they are how the message gets through at all."),
      h2("One shoot, several videos"),
      p("The most efficient thing a business can do with video is plan to reuse it. A single well-recorded conversation or demonstration can become:"),
      ...ul(
        "A full-length version for the website or YouTube.",
        "Several short upright clips, each making one point, for social feeds.",
        "A brief cut with a clear call to action, for use as an advert.",
        "Silent looping clips for a website header or a stand at an event."
      ),
      p("This only works if it is planned before the shoot, so each section can stand alone. Tell your editor at the start which versions you want."),
      h2("Briefing an editor"),
      ...ul(
        "The single job of the video and what the viewer should do next.",
        "Where it will be shown, and so which shapes and lengths are needed.",
        "Your logo, fonts, and colours, so graphics match the brand.",
        "Examples of videos you like the feel of.",
        "Any music you have the right to use - or a request for the editor to source it properly.",
        "Who signs off, and how many rounds of changes to expect."
      ),
      p(
        "Our [video editing](/services/video-editing) service covers product demos, adverts, and social cuts, and it works best alongside a plan for where the videos will go - which is where [digital marketing](/services/digital-marketing) comes in. If you have footage waiting, or a shoot coming up, [get in touch](/contact) before you film rather than after."
      ),
    ],
  },
  {
    slug: "native-vs-cross-platform-apps",
    title: "Native vs Cross-Platform Apps: How to Choose",
    excerpt:
      "Two ways to build a mobile app, each with real trade-offs. What native and cross-platform mean in plain terms, where each one fits, and the questions that decide it for your product.",
    category: "engineering",
    publishedAt: "2026-10-11T07:00:00.000Z",
    relatedServices: ["mobile-app-development", "ui-ux-design"],
    seoTitle: "Native vs Cross-Platform App Development: How to Choose",
    body: [
      p(
        "Once you have decided to build a mobile app, the next question arrives quickly: native or cross-platform? It is usually asked as though one were simply better. Neither is. They are two reasonable ways of building the same thing, and the right one depends on what your app has to do and how you plan to run it afterwards."
      ),
      h2("What the two terms mean"),
      p(
        "A **native** app is written separately for each platform, in the language that platform's maker provides - Swift for iPhone, Kotlin for Android. If you want both, you build the app twice."
      ),
      p(
        "A **cross-platform** app is written once, using a framework such as Flutter or React Native, and that single codebase produces both the iPhone and the Android app. Most of the code is shared; small parts are still written per platform where they need to be."
      ),
      p("Both end up as real apps, installed from the App Store and Google Play. Your users will not see which approach was taken. The difference is in how the app is built and maintained."),
      h2("What cross-platform is good at"),
      ...ul(
        "**One codebase.** A feature is built once and appears on both platforms, and a bug is fixed once.",
        "**Both platforms from the first release.** You do not have to choose which half of your customers gets the app first.",
        "**One team.** The same developers work on everything, which keeps the two apps from drifting apart.",
        "**Consistency.** The app looks and behaves the same on both, which suits a product with a strong design of its own."
      ),
      p("For the kind of app most businesses need - accounts, lists, forms, bookings, payments, notifications, content from a server - cross-platform handles everything comfortably."),
      h2("What native is good at"),
      ...ul(
        "**Access to everything the device can do,** as soon as the platform releases it. New system features reach native apps first.",
        "**Demanding performance.** Heavy graphics, real-time video or audio processing, and complex animation have the most headroom in native code.",
        "**Deep hardware work.** Apps built around Bluetooth devices, sensors, background location, or augmented reality often lean on platform-specific code anyway.",
        "**Feeling at home.** A native app follows each platform's own conventions by default, with no extra effort."
      ),
      h2("The questions that decide it"),
      p("Rather than comparing frameworks, answer these about your own product:"),
      ...ol(
        "**Do you need both platforms at launch?** If yes, cross-platform starts with a clear advantage. If your users are overwhelmingly on one, a single native app is a real option.",
        "**What is the hardest thing the app does?** If the answer is 'shows data and takes input', either approach works. If it is 'processes live video' or 'talks to a medical device', look hard at native.",
        "**Who will maintain it?** One shared codebase is easier for a small team to look after than two separate ones.",
        "**How distinctive is the design?** A custom look is equally achievable in both. Strict adherence to each platform's own style is a little easier natively.",
        "**How long will it live?** Any app needs updating as phones and operating systems change. Plan for that whichever route you take."
      ),
      h2("Some common worries, answered"),
      h3("Are cross-platform apps slower?"),
      p("For ordinary business apps, not in any way a user would notice. Modern frameworks perform well. The gap only shows in unusually demanding work, and most apps never go near it."),
      h3("Will I be stuck if the app outgrows it?"),
      p("Not usually. Cross-platform apps can include native code for the parts that need it, so a single demanding feature does not force a rewrite of the whole thing."),
      h3("Does it look cheap?"),
      p("How an app looks is a matter of design and care, not of the framework. A well-designed cross-platform app is indistinguishable from a native one; a careless native app still looks careless."),
      h2("Our usual advice"),
      p(
        "For a new product that needs to be on both platforms, cross-platform is the sensible default: one build, one team, both stores. We go native when the app's core depends on something only native code does well, or when it is firmly a one-platform product."
      ),
      quote("Choose the approach for the hardest thing your app has to do - not for the easiest."),
      p(
        "Whichever you choose, the decision matters less than the work around it: clear flows, a tested design, and a plan for releases after launch. We cover both routes on our [mobile app development](/services/mobile-app-development) page, and the design that comes before either under [UI/UX design](/services/ui-ux-design). If you would like a recommendation for your own app, [describe it to us](/contact) and we will give you a straight answer."
      ),
    ],
  },
  {
    slug: "before-you-run-paid-ads",
    title: "Before You Run Paid Ads: Six Things to Have in Place",
    excerpt:
      "Paid advertising magnifies whatever it points at - including the gaps. The groundwork to finish before spending on Google or Meta ads: tracking, a proper landing page, a clear offer, and more.",
    category: "growth",
    publishedAt: "2026-10-11T07:30:00.000Z",
    relatedServices: ["performance-marketing", "website-development", "digital-marketing"],
    seoTitle: "Before You Run Paid Ads: A Readiness Checklist",
    body: [
      p(
        "Paid advertising is the fastest way to put a business in front of new people. It is also the fastest way to spend money finding out that something further along was not ready. An advert can only deliver a visitor; what happens next is down to the page they land on and the offer they find there."
      ),
      p("These are the six things we check before any campaign goes live. Each is cheaper to fix before the budget is switched on than after."),
      h2("1. Know what counts as a result"),
      p(
        "Decide exactly what you want a visitor to do: submit an enquiry, book a call, make a purchase, phone the shop. That action is your **conversion**, and everything else is measured against it. Clicks and impressions are not results - they are the cost of getting them."
      ),
      p("It also helps to know roughly what a new customer is worth to you. Without that, there is no way to judge whether what you are paying to win one is sensible."),
      h2("2. Set up tracking, and test it"),
      p(
        "The advertising platforms improve by learning which clicks turned into conversions. If they cannot see conversions, they optimise for clicks, and you get plenty of visitors who do nothing."
      ),
      ...ul(
        "Install the platform's tracking on your site and define the conversion action.",
        "Make a test enquiry or purchase yourself and confirm it is recorded.",
        "Track phone calls and form submissions separately if both matter.",
        "Check that it still works after any change to the website."
      ),
      p("This is the step most often skipped, and the one that makes every later decision possible."),
      h2("3. Send people to a page built for the advert"),
      p(
        "The home page is rarely the right destination. Someone who clicked an advert about one service should land on a page about that service, saying the same thing the advert said, in the same words. A good landing page has:"
      ),
      ...ul(
        "A headline that matches the advert, so the visitor knows they are in the right place.",
        "One clear action, repeated - not five competing ones.",
        "The reasons to trust you: who you are, real work, real reviews.",
        "Answers to the obvious objections.",
        "A short form. Every extra field loses people."
      ),
      p("If the page is not ready, that is the first job. See [website development](/services/website-development) for how we build pages for this."),
      h2("4. Make it fast, and make it work on a phone"),
      p(
        "Most advert clicks come from phones, often on mobile data. A page that takes several seconds to appear loses a share of the visitors you have already paid for, before they have seen anything. Open your landing page on an ordinary phone, away from the office Wi-Fi, and complete the whole journey yourself - including the form."
      ),
      h2("5. Have an offer worth clicking for"),
      p(
        "An advert works when it gives a specific person a reason to act now. 'Quality service at great prices' gives nobody a reason. Before writing any advert, be able to finish this sentence plainly: **this is for** a particular kind of customer, **who wants** a particular outcome, **and here is why to choose us.**"
      ),
      p("If you cannot say it in a sentence, an advert will not say it in a headline."),
      h2("6. Be ready to answer"),
      p(
        "Enquiries from adverts go cold quickly. The person who filled in your form has probably contacted two other businesses as well, and the first helpful reply tends to win. Decide who responds, how fast, and with what - before the first lead arrives."
      ),
      h2("Start small and learn"),
      p(
        "Once the groundwork is done, begin with a modest budget and a narrow target: one service, one audience, one area. The first weeks are for learning which message and which audience respond, not for scale. Change one thing at a time so you know what made the difference, and give each test long enough to gather meaningful numbers before judging it."
      ),
      quote("Advertising does not fix a weak page or a vague offer. It shows them to more people."),
      p(
        "This is the order we work in under [performance marketing](/services/performance-marketing): tracking and landing pages first, campaigns second, and steady testing after that. If you are planning to advertise and want the foundations checked first, [get in touch](/contact)."
      ),
    ],
  },
  {
    slug: "logo-vs-brand-identity",
    title: "Logo vs Brand Identity: What Your Business Actually Needs",
    excerpt:
      "A logo is one part of a brand identity, not the whole of it. What the difference is, what an identity system contains, and how to tell how much of one your business needs right now.",
    category: "design",
    publishedAt: "2026-10-11T08:00:00.000Z",
    relatedServices: ["brand-design", "graphic-design", "package-design"],
    seoTitle: "Logo vs Brand Identity: What's the Difference?",
    body: [
      p(
        "'We need a logo' is one of the most common requests a design studio hears, and it is nearly always the start of a longer conversation. A logo matters. But a business that has only a logo soon finds that every new thing it makes - a website, a brochure, a social post, a sign - has to be invented from nothing, and none of it quite matches."
      ),
      p("What fixes that is a brand identity. The two are often confused, so it is worth being clear about each."),
      h2("What a logo is"),
      p(
        "A logo is a mark that identifies you: a symbol, your name set in a particular way, or both. Its job is recognition. It does not have to explain what you do, and the best ones rarely try. It has to be distinct, simple enough to work at the size of a fingernail, and still be itself in a single colour."
      ),
      h2("What a brand identity is"),
      p("A brand identity is the whole visual system the logo belongs to - the set of decisions that makes everything you produce look like it came from the same place. It normally includes:"),
      ...ul(
        "**The logo and its versions** - full, compact, and icon-only, in colour, in one colour, and reversed out of a dark background.",
        "**A colour palette** - a few main colours and some supporting ones, with exact values for screen and for print.",
        "**Typography** - the typefaces you use for headings and for text, and how they are sized and spaced.",
        "**Imagery** - the style of photography, illustration, or iconography that goes with the brand.",
        "**Layout** - how the pieces are arranged: spacing, shapes, patterns, the way a page is built.",
        "**Tone of voice** - how the brand sounds when it writes."
      ),
      p("The logo is the signature. The identity is the handwriting."),
      h2("Why a logo is not enough"),
      p(
        "Recognition comes from repetition. People come to know a business by seeing the same colours, the same type, and the same style again and again until they connect. A logo placed on top of materials that otherwise have nothing in common cannot do that work alone."
      ),
      p(
        "There is a practical side too. Without a system, every designer, printer, and member of staff who makes something for you has to guess. With one, they have the answers - and the tenth thing you produce costs less effort than the first."
      ),
      h2("Brand guidelines: the part that makes it last"),
      p(
        "The identity is recorded in a **brand guidelines** document. It shows the logo and how much clear space to leave around it, lists the colours and typefaces, gives examples of correct use, and shows the common mistakes to avoid. It need not be long. It needs to be clear enough that someone who has never met you can produce something that looks right."
      ),
      p("Alongside it you should receive the logo files themselves in every format you will need - vector files for print and signage, and image files for screens."),
      h2("How much do you need?"),
      p("It depends on where the business is:"),
      ...ul(
        "**Just starting, testing an idea.** A well-made logo, a small colour palette, and one or two typefaces is a sound beginning. Keep it simple and consistent.",
        "**Launching properly, or selling a physical product.** A full identity is worth having before you print packaging, build a website, or put up a sign - all of which are costly to redo.",
        "**Established, but inconsistent.** If your materials no longer look related, you may not need a new logo at all. Often the existing mark is fine and what is missing is the system around it.",
        "**Changed direction.** If the business now serves different customers or offers something different, a rebrand makes sense. Change for its own sake does not."
      ),
      h2("What to look for in the result"),
      ...ol(
        "**It works small and in one colour.** If it only works large and in full colour, it will fail on a stamp, a favicon, or an invoice.",
        "**It is distinct from your competitors.** Put it beside theirs and check.",
        "**It suits the business,** not the designer's portfolio or this year's fashion.",
        "**You own it.** Make sure the agreement gives you full rights to the finished work and the original files.",
        "**It comes with rules.** A logo delivered without guidelines is half a job."
      ),
      quote("A brand is not what you say it is in a guidelines document. It is what people recognise after they have seen you ten times."),
      p(
        "Our [brand design](/services/brand-design) service covers the logo, the identity system, and the guidelines that hold it together, and [graphic design](/services/graphic-design) carries it through to everything you produce afterwards. If you are unsure whether you need a new logo or simply a system for the one you have, [ask us](/contact) - we will tell you which."
      ),
    ],
  },
  {
    slug: "website-chatbot-guide",
    title: "Adding an AI Chatbot to Your Website: A Practical Guide",
    excerpt:
      "A website chatbot can answer routine questions at any hour - or frustrate customers into leaving. What a good one does, what it should hand to a person, and how to set one up properly.",
    category: "ai",
    publishedAt: "2026-10-11T08:30:00.000Z",
    relatedServices: ["ai-automation", "website-development", "ui-ux-design"],
    seoTitle: "AI Chatbot for Your Website: A Practical Guide",
    body: [
      p(
        "Almost everyone has met a bad chatbot: the one that answers a different question from the one you asked, loops through the same three options, and hides the way to reach a human. That experience has made many business owners wary - reasonably."
      ),
      p("The technology has changed, though. A chatbot built on a modern AI model and grounded in your own information can hold a sensible conversation. Whether it helps or harms still comes down to how it is set up."),
      h2("What a website chatbot is good for"),
      ...ul(
        "**Routine questions, at any hour.** Opening times, delivery areas, what a service includes, how to book. The questions your team answers every day.",
        "**Helping people find things.** Pointing a visitor to the right page, product, or form instead of leaving them to search.",
        "**Collecting enquiries.** Asking a few questions and passing a complete, organised lead to your team - including overnight and at weekends.",
        "**Taking the first step.** Starting a booking, checking an order status, or gathering the details a person will need before they pick up the conversation."
      ),
      p("Notice what these have in common: they are frequent, they have clear answers, and nothing much is lost if the bot occasionally has to say 'let me pass you to someone'."),
      h2("What it should not do alone"),
      ...ul(
        "**Give advice with consequences.** Medical, legal, or financial guidance should come from a qualified person. A chatbot can take the enquiry; it should not answer it.",
        "**Handle complaints.** An upset customer wants to be heard by someone who can act. Route them to a person at once.",
        "**Make promises.** Prices, discounts, deadlines, and exceptions should come from your team unless they are fixed and published.",
        "**Pretend to be human.** Say plainly that it is an automated assistant. People are more forgiving of a bot that admits to being one."
      ),
      h2("It should only know what you tell it"),
      p(
        "The most important design decision is where the answers come from. A general AI model will happily produce a confident answer about your business that is completely invented. The fix is to ground the chatbot in your own material - your service pages, policies, price lists, and frequently asked questions - and instruct it to answer only from that."
      ),
      p("This has two consequences worth planning for:"),
      ...ul(
        "**Your information has to be written down and correct.** If the opening hours on the website are wrong, the chatbot will be wrong too.",
        "**It has to be kept up to date.** When a price or a policy changes, the chatbot's source must change with it. Decide who owns that."
      ),
      quote("A chatbot that says 'I don't know - let me connect you with the team' is working. One that guesses is not."),
      h2("Always leave a way out"),
      p(
        "Every conversation should have an obvious route to a person: a handover to live chat during working hours, or an offer to take contact details and have someone reply. The handover should carry the conversation with it, so the customer does not have to explain everything again. A chatbot is a first line of contact, not a wall."
      ),
      h2("Look after people's information"),
      p(
        "Visitors will type personal details into a chat window. Be clear about what is collected and why, ask only for what you need, and make sure the conversation data is stored and handled in line with the privacy rules that apply where you operate. Mention the chatbot in your privacy policy."
      ),
      h2("How to roll one out"),
      ...ol(
        "**List the real questions.** Go through your emails, calls, and messages and write down what people actually ask. This is the chatbot's syllabus.",
        "**Write the answers properly,** and put them on the website where they are missing. This helps your visitors and your search ranking even without a chatbot.",
        "**Define the boundaries** - what it answers, what it hands over, and what it never discusses.",
        "**Test it hard before launch.** Ask it awkward, vague, and off-topic questions. Try to make it say something wrong.",
        "**Read the conversations afterwards.** They show what customers want to know and where the bot falls short. Improve it from there."
      ),
      h2("Is it worth it for your business?"),
      p(
        "A chatbot earns its place when you receive a steady stream of similar questions, when enquiries arrive outside working hours, or when your team is spending real time on answers that are already written down somewhere. If you get a handful of varied enquiries a week, a clear contact page and a prompt reply will serve you better."
      ),
      p(
        "We build chatbots and other assistants as part of [AI automation](/services/ai-automation), wired into the website and the tools you already use. If you are wondering whether one would help, [tell us what your customers ask](/contact) and we will give you an honest view."
      ),
    ],
  },
  {
    slug: "manufacturer-exporter-website",
    title: "Websites for Manufacturers and Exporters: What Buyers Look For",
    excerpt:
      "An industrial buyer judges a supplier's website differently from a shopper. What procurement teams want to see - products, capability, proof, and an easy way to enquire - and how to present it.",
    category: "engineering",
    publishedAt: "2026-10-11T09:00:00.000Z",
    relatedServices: ["website-development", "seo", "brand-design"],
    seoTitle: "Manufacturer & Exporter Website Design: What Buyers Want",
    body: [
      p(
        "A manufacturer's website has a different audience from most. The visitor is rarely browsing. They are an engineer, a purchasing manager, or an importer with a specific requirement, comparing a shortlist of suppliers they have never met - often from another country. They will decide in a few minutes whether you look capable of the job, and whether it is worth sending an enquiry."
      ),
      p(
        "We have built sites for manufacturing and export businesses - you can see them among [our projects](/projects) - and the same handful of things come up every time. This is what those buyers look for."
      ),
      h2("A product catalogue that answers technical questions"),
      p("The first thing a buyer wants to know is whether you make what they need. A list of product names is not enough. Each product or product family should have its own page with:"),
      ...ul(
        "Clear photographs of the actual product, from more than one angle.",
        "Specifications in a table: materials, grades, dimensions, tolerances, finishes, capacities.",
        "The standards it is made to.",
        "The industries or applications it is used in.",
        "A downloadable data sheet or drawing where you have one.",
        "An enquiry button on the page itself."
      ),
      p("Organise the catalogue the way a buyer thinks - by product type, material, or application - and make it searchable if it is large. Separate pages for each product also help you appear in search, because buyers search for specific things."),
      h2("Proof that you can actually make it"),
      p("A buyer placing an order with a supplier they cannot visit is taking a risk. Your website has to reduce it. Show the capability behind the products:"),
      ...ul(
        "**The facility** - real photographs of the plant, the machines, and the people. Stock images do the opposite of reassuring.",
        "**The process** - how something goes from raw material to dispatch, including where quality is checked.",
        "**Capacity** - the kinds and scales of work you take on, stated honestly.",
        "**Quality control** - what you test, how, and with what equipment."
      ),
      h2("Certifications, shown properly"),
      p(
        "For many buyers, certification is a filter: without the right one, you are not considered. List the certifications you hold, name the issuing body, and keep them current - an expired certificate on a website is worse than none. Only show what you genuinely hold; a buyer will ask for the documents."
      ),
      h2("Make export buyers feel expected"),
      p("If you sell abroad, say so, and answer the questions an overseas buyer has before they need to ask:"),
      ...ul(
        "Which countries or regions you already ship to.",
        "How goods are packed for transit.",
        "Which ports you ship from and the shipping terms you work with.",
        "The documentation you provide.",
        "Whether you supply samples, and how."
      ),
      p("Write in plain, simple English. Many of your readers will be using a second language or a translation tool, and short, direct sentences survive translation far better than marketing copy."),
      h2("An enquiry form that gets you a usable lead"),
      p(
        "The goal of the whole site is a good enquiry. A form that asks only for a name and a message produces enquiries you have to chase for details. One that asks for too much is abandoned. A sensible middle:"
      ),
      ...ul(
        "Name, company, country, email, and phone.",
        "The product they are asking about - filled in automatically if they came from a product page.",
        "Quantity required.",
        "A space for the specification, and the option to attach a drawing.",
        "A clear statement of when they can expect a reply."
      ),
      p("Put your direct contact details on the page as well. Some buyers prefer email, a phone call, or WhatsApp to any form."),
      h2("Fast, and usable on a phone"),
      p(
        "Industrial sites are often heavy with large images and PDF catalogues, and slow as a result. Buyers abroad may be on connections slower than yours, and a good share will first open your site on a phone. Compress the images, keep downloads optional, and check every page on a mobile screen. Speed also affects how well the site ranks in search."
      ),
      h2("Be findable for what you make"),
      p(
        "Buyers search for the product, not for your company name: the item, the material, the standard, sometimes the region. That is why specific product pages, with the real technical terms in their titles and text, matter so much. A single 'Products' page listing everything gives a search engine very little to rank. This is the groundwork we cover under [SEO](/services/seo)."
      ),
      h2("Look like the business you are"),
      p(
        "A buyer reads the quality of a website as a sign of the quality of the company. An outdated site with broken links and blurred photos suggests the same about the factory, however unfair that is. A clean, current, well-organised site says that the business is run with care."
      ),
      quote("An overseas buyer cannot walk around your factory. Your website is the visit."),
      p(
        "We design and build these sites under [website development](/services/website-development), with catalogues your team can update without a developer. If your current site is not bringing in the enquiries your products deserve, [tell us about the business](/contact)."
      ),
    ],
  },
  {
    slug: "choosing-digital-marketing-channels",
    title: "Digital Marketing Channels: How to Choose Where to Start",
    excerpt:
      "Search, social, email, paid ads, content - a small business cannot do them all well at once. A plain way to choose the one or two channels that fit your customers, and what each is good for.",
    category: "growth",
    publishedAt: "2026-10-11T09:30:00.000Z",
    relatedServices: ["digital-marketing", "seo", "performance-marketing"],
    seoTitle: "Digital Marketing Channels: Which Should You Start With?",
    body: [
      p(
        "Ask what a business should be doing for its digital marketing and the list comes back long: search, social media, email, paid adverts, video, a blog. All of them work for someone. The trouble is that a small team trying to do all six does each of them badly, and concludes that none of it works."
      ),
      p("The better approach is to pick one or two channels that suit how your customers actually buy, do those properly, and add more only once they are running. This is how to choose."),
      h2("Start with the customer, not the channel"),
      p("Three questions do most of the work:"),
      ...ul(
        "**Are people already looking for what you sell?** If customers search for it by name - a plumber, an accountant, a particular part - you need to be where they search.",
        "**Or do they not yet know they want it?** A new product or an unfamiliar idea has to be put in front of people; nobody searches for something they have not heard of.",
        "**How long do they take to decide?** A quick, low-cost purchase needs a different approach from one that is weighed up over weeks and involves several people."
      ),
      h2("What each channel is good for"),
      h3("Search (SEO)"),
      p(
        "Reaches people at the moment they are looking for what you offer. It builds slowly and keeps working once it does, without a cost per click. Best when there is existing demand and you can afford to be patient. See our [SEO](/services/seo) page for what it involves."
      ),
      h3("Paid search and paid social"),
      p(
        "Buys attention immediately. Search adverts catch existing demand; social adverts create it by showing your offer to people who match a profile. Results start quickly and stop when the spending does. Best when you have a clear offer, a good landing page, and working measurement."
      ),
      h3("Social media"),
      p(
        "Builds familiarity and trust over time, and suits businesses with something to show - food, design, fitness, property, anything visual or personal. It is a slow way to win customers directly, and a good way to stay in the mind of people who will buy later."
      ),
      h3("Email"),
      p(
        "The channel you own. Nobody else's algorithm decides whether your message is seen. It is the best tool for bringing existing customers back, and for staying in touch with people who showed interest but were not ready. It only works with a list of people who chose to hear from you."
      ),
      h3("Content"),
      p(
        "Articles, guides, and videos that answer your customers' questions. Content feeds every other channel: it gives search something to rank, social something to share, and email something to send. It takes steady effort and pays back over a long period."
      ),
      h2("A simple way to choose"),
      ...ul(
        "**Local service with existing demand** - start with search: a strong website, a complete Google Business Profile, and reviews.",
        "**Online shop** - paid adverts to bring buyers in, and email to bring them back.",
        "**Business selling to other businesses** - search and useful content, backed by email to follow up over a longer decision.",
        "**New or unfamiliar product** - paid social and video to create awareness, with a clear landing page to explain it.",
        "**Visual or lifestyle brand** - social media first, with adverts to extend what already performs well."
      ),
      p("These are starting points, not rules. The honest test is to try a channel properly for long enough to judge it, and look at what it brought in."),
      h2("Whatever you choose, fix the destination first"),
      p(
        "Every channel sends people somewhere - nearly always your website. If the site is slow, confusing, or gives no clear next step, improving the marketing only delivers more people to the same dead end. A site that turns visitors into enquiries makes every channel more effective at once."
      ),
      h2("Measure what matters"),
      p(
        "Followers, likes, and impressions are easy to count and say little. What matters is the action that leads to revenue: enquiries, bookings, orders. Set up tracking for those from the start, and judge each channel on what it produces rather than on how busy it looks."
      ),
      h2("Do less, consistently"),
      p(
        "A channel run well every week beats four run in bursts. Posting daily for a fortnight and then falling silent for two months does more harm than not starting. Choose a pace you can actually sustain, and hold to it."
      ),
      quote("The right channel is the one your customers already use to make this decision. Marketing works by joining that journey, not by inventing a new one."),
      p(
        "Our [digital marketing](/services/digital-marketing) service starts with exactly this choice - where your customers are, and what it would take to reach them - before any campaign is planned. If you would like help deciding where to begin, [get in touch](/contact)."
      ),
    ],
  },
  {
    slug: "hospital-clinic-website-essentials",
    title: "What a Hospital or Clinic Website Needs to Get Right",
    excerpt:
      "Patients arrive at a healthcare website worried and in a hurry. The essentials that matter most: finding the right doctor, booking easily, clear practical details, trust, and accessibility.",
    category: "engineering",
    publishedAt: "2026-10-11T10:00:00.000Z",
    relatedServices: ["website-development", "ui-ux-design", "seo"],
    seoTitle: "Hospital & Clinic Website Design: What Patients Need",
    body: [
      p(
        "Nobody visits a hospital's website for pleasure. The person on the other side of the screen is usually unwell, or worried about someone who is, and almost always on a phone. They want one of a few things - and they want it quickly. A healthcare website succeeds by getting out of their way."
      ),
      p(
        "We have built websites for hospitals and rehabilitation clinics, which you can see among [our projects](/projects). These are the things that matter most, in roughly the order a patient needs them."
      ),
      h2("Answer the urgent questions first"),
      p("Some information should be visible without scrolling or searching, on every page:"),
      ...ul(
        "**A phone number that can be tapped to call.** For many patients, particularly older ones, calling is still the first choice.",
        "**Emergency contact details,** clearly marked, if you provide emergency care.",
        "**The address,** linked to a map for directions.",
        "**Opening and consultation hours.**",
        "**A button to book an appointment.**"
      ),
      p("If a patient has to hunt for any of these, the site has failed at its first job."),
      h2("Help patients find the right doctor or department"),
      p(
        "Patients rarely know the name of the speciality they need. They know what is wrong. Organise services so they can be found either way - by department, and by condition or treatment in everyday language."
      ),
      p("Each doctor should have a profile with a real photograph, qualifications, speciality, the languages they speak, and the days and times they consult. A proper profile does more to build confidence than any amount of general copy about excellence."),
      h2("Make booking easy"),
      p(
        "Booking is the main thing the website exists to do. Keep the form short: who the patient is, how to reach them, which department or doctor, and a preferred time. Then tell them exactly what happens next - whether the appointment is confirmed immediately or the clinic will call to confirm."
      ),
      p("Always offer an alternative to the form. A phone number or a WhatsApp link beside it catches the people who will not fill in a form on a small screen."),
      h2("Describe services in plain language"),
      p(
        "Medical vocabulary is second nature to the people writing the site and a barrier to the people reading it. Describe each service the way you would explain it to a patient in person: what it is, who it is for, what happens during a visit, and how to prepare."
      ),
      p("Healthcare content has to be accurate, so it should be written or reviewed by a clinician, and it should avoid promising outcomes. Clear, honest information is what earns trust - and it is what search engines look for on health topics too."),
      h2("Show why you can be trusted"),
      ...ul(
        "**Accreditations and registrations,** named and current.",
        "**Real photographs** of the building, the facilities, and the staff. Patients want to know what they are walking into.",
        "**Equipment and facilities** relevant to their treatment.",
        "**Patient feedback,** published with consent and within the rules that govern healthcare advertising where you practise."
      ),
      h2("Cover the practical details"),
      p("A good deal of patient anxiety is practical. Answer it in advance:"),
      ...ul(
        "Which insurance providers and payment methods are accepted.",
        "What to bring to a first appointment.",
        "Parking, public transport, and wheelchair access.",
        "Visiting hours and rules for in-patients.",
        "How to obtain reports and records."
      ),
      p("A clear page for each of these reduces calls to the front desk as well as helping patients."),
      h2("Accessibility is not optional here"),
      p("A healthcare site serves more elderly, unwell, and disabled users than almost any other kind. That makes accessibility a core requirement:"),
      ...ul(
        "Text large enough to read comfortably, with strong contrast against its background.",
        "Buttons and links big enough to tap accurately.",
        "Pages that work with a screen reader and with the keyboard alone.",
        "Simple layouts, with nothing that moves or flashes unexpectedly.",
        "Content in the languages your patients speak."
      ),
      h2("Protect patient information"),
      p(
        "Any form on a healthcare site may carry sensitive details. The site must run on HTTPS throughout, collect only what is needed, store and transmit it securely, and state plainly how it is used in a privacy policy. Health data is covered by specific rules in most countries; make sure the site is built to the ones that apply to you."
      ),
      h2("Be found locally"),
      p(
        "Most people look for healthcare near them: a kind of doctor or treatment, plus a place name. To appear in those searches, keep your Google Business Profile complete and accurate, give each department and doctor a page of their own, and make sure your name, address, and phone number are identical everywhere they appear. More on this under [SEO](/services/seo)."
      ),
      quote("On a healthcare website, good design is not what impresses a patient. It is what lets a worried person find a phone number in five seconds."),
      p(
        "We design and build healthcare sites under [website development](/services/website-development), starting from what patients need to do rather than what looks impressive. If your clinic or hospital is due a better website, [talk to us](/contact)."
      ),
    ],
  },
  {
    slug: "ui-ux-design-process-explained",
    title: "The UI/UX Design Process, Step by Step",
    excerpt:
      "What actually happens between an idea and a finished interface. The stages of a UI/UX project - research, flows, wireframes, visual design, testing, and handoff - and why each one is there.",
    category: "design",
    publishedAt: "2026-10-11T10:30:00.000Z",
    relatedServices: ["ui-ux-design", "website-development", "mobile-app-development"],
    seoTitle: "UI/UX Design Process Explained: The 6 Stages",
    body: [
      p(
        "From the outside, design can look like a single act: someone opens a design tool and produces screens. Clients who expect that are sometimes surprised when the first few sessions involve no visuals at all - only questions, diagrams, and grey boxes."
      ),
      p(
        "Those early stages are where most of the value is. Each one exists to settle a particular kind of question while it is still cheap to change the answer. This is what happens at each step, and why."
      ),
      h2("First, UI and UX are not the same thing"),
      p(
        "**UX** - user experience - is how the product works: what a person can do, in what order, and how easily. **UI** - user interface - is how it looks and feels: the colours, type, spacing, and components on the screen."
      ),
      p("A product can be beautiful and impossible to use, or plain and effortless. Good design needs both, and the process deals with UX first because there is no point polishing a screen that should not exist."),
      h2("1. Discovery: understand the problem"),
      p("Before designing anything, a designer needs to know who the product is for and what those people are trying to do. Discovery usually involves:"),
      ...ul(
        "Conversations with you about the business, its goals, and its limits.",
        "Interviews or surveys with real or likely users.",
        "A review of what exists already - your current product, its analytics, support requests.",
        "A look at what competitors have taught your users to expect."
      ),
      p("The output is a short, clear statement of who the users are, what they need, and what success looks like. Everything afterwards is judged against it."),
      h2("2. Structure and flows: map the journey"),
      p(
        "Next comes the skeleton: what screens exist, how they are organised, and the path a person takes through them to get something done. This is drawn as simple diagrams - a sitemap, and a flow for each main task."
      ),
      p("It is the stage where awkward questions surface early. What happens if the payment fails? What does a first-time user see with no data yet? Answering them on a diagram takes minutes."),
      h2("3. Wireframes: lay out the screens"),
      p(
        "A wireframe is a deliberately plain sketch of a screen: boxes, labels, and placeholder text, in grey. It shows what is on the page and what matters most, without colour or styling."
      ),
      p("The plainness is the point. With nothing to react to visually, the discussion stays on whether the layout works. Wireframes are quick to make and quick to throw away, which is exactly what you want while the big decisions are still moving."),
      h2("4. Visual design: give it a character"),
      p("Once the structure is agreed, the interface is designed properly. Colour, typography, spacing, icons, and imagery are applied, consistent with your brand. Good visual design is not decoration - it directs attention, shows what can be pressed, and makes the product feel trustworthy."),
      p(
        "Rather than designing each screen separately, a designer builds a **design system**: a set of reusable components - buttons, fields, cards, menus - with rules for using them. The system is what keeps the hundredth screen consistent with the first, and it is what developers build from."
      ),
      h2("5. Prototype and test: find out before you build"),
      p(
        "The designs are linked into a clickable prototype that behaves like the real product. It is then put in front of a handful of real users, who are asked to complete tasks while the designer watches."
      ),
      p("This is the most valuable hour in the whole project. People get stuck in places nobody predicted, and miss things that seemed obvious. Each problem found here is fixed by moving a few elements on a canvas, rather than by rewriting working software."),
      quote("Five people trying to use a prototype will teach you more than fifty opinions about how it looks."),
      h2("6. Handoff: make it buildable"),
      p("Finally the design is prepared for the developers. A proper handoff includes:"),
      ...ul(
        "Every screen, at each size it needs to work at.",
        "Every state - empty, loading, error, success - not only the ideal one.",
        "The design system, with measurements, colours, and type styles specified.",
        "Notes on behaviour and animation.",
        "A walkthrough with the engineers, and availability to answer questions during the build."
      ),
      p("Design does not end at handoff. The designer should review what is built against what was designed, because small differences add up."),
      h2("What you will be asked for"),
      p("The process needs your input most at the start and at each review:"),
      ...ul(
        "**Access** - to the people who know the business, and where possible to real users.",
        "**Honest content** - real text and real data, not placeholders, as early as possible.",
        "**Decisions** - one person with the authority to approve each stage.",
        "**Feedback on the right thing** - structure during wireframes, appearance during visual design."
      ),
      h2("Why not skip straight to the visuals?"),
      p(
        "Because the order is what keeps changes cheap. Rearranging a flow on a diagram costs almost nothing. Rearranging it after the screens are designed costs days. After it has been built, it costs far more. Each stage exists to catch a class of mistake at the point where fixing it is easiest."
      ),
      p(
        "This is the process behind our [UI/UX design](/services/ui-ux-design) work, whether the build that follows is ours - a [website](/services/website-development) or a [mobile app](/services/mobile-app-development) - or your own team's. If you have a product to design or one that needs rethinking, [tell us about it](/contact)."
      ),
    ],
  },
];

/* ---------------------------------------------------------------------------
   Covers. Each post's cover is scripts/blog-covers/<slug>.jpg, a 1600x900
   illustration; this is its alternative text.
--------------------------------------------------------------------------- */
const COVER_ALT = {
  "website-web-app-or-mobile-app":
    "Illustration of a website in a browser window, a web app dashboard, and a mobile app on a phone, side by side",
  "seo-before-launch-new-website":
    "Illustration of a search bar above a ranked list of results, with a chart rising beside it",
  "ai-automation-where-to-start":
    "Illustration of an email, a document, and a chat message flowing through an AI node into three completed tasks",
  "packaging-design-brief":
    "Illustration of a carton, a bottle, and a can carrying the same label design, beside a dieline template",
  "video-editing-for-business":
    "Illustration of a video preview with a play button above an editing timeline of clips and an audio waveform",
  "native-vs-cross-platform-apps":
    "Illustration of one block of code connected to an iPhone and an Android phone showing the same app",
  "before-you-run-paid-ads":
    "Illustration of an advert leading into a conversion funnel and on to a chart of rising results",
  "logo-vs-brand-identity":
    "Illustration of a logo mark surrounded by a colour palette, a typeface sample, and a business card",
  "website-chatbot-guide":
    "Illustration of a chat assistant window open over a website, with questions and answers in speech bubbles",
  "manufacturer-exporter-website":
    "Illustration of a product catalogue website beside a globe with shipping routes drawn across it",
  "choosing-digital-marketing-channels":
    "Illustration of a customer at the centre of six marketing channels: email, search, social, video, adverts, and chat",
  "hospital-clinic-website-essentials":
    "Illustration of a clinic website with a medical cross and an appointment calendar for booking",
  "ui-ux-design-process-explained":
    "Illustration of a grey wireframe turning into a finished, coloured interface design",
};

const api = `https://${projectId}.api.sanity.io/v2024-01-01`;
const auth = { Authorization: `Bearer ${token}` };

/**
 * Uploads a post's cover and returns the `coverImage` field for it. Sanity
 * identifies an image by its contents, so uploading the same file again hands
 * back the asset that is already there instead of storing a second copy.
 */
async function coverFor(slug) {
  const file = new URL(`./blog-covers/${slug}.jpg`, import.meta.url);
  if (!existsSync(file)) {
    console.warn(`[seed-blog] no cover at scripts/blog-covers/${slug}.jpg - seeding without one`);
    return {};
  }
  const res = await fetch(`${api}/assets/images/${dataset}?filename=${slug}.jpg`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "image/jpeg" },
    body: await readFile(file),
  });
  if (!res.ok) throw new Error(`cover upload for ${slug} failed: ${res.status} ${await res.text()}`);
  const { document } = await res.json();
  return {
    coverImage: {
      _type: "image",
      alt: COVER_ALT[slug],
      asset: { _type: "reference", _ref: document._id },
    },
  };
}

/* ---------------------------------------------------------------------------
   Send them
--------------------------------------------------------------------------- */
const mutations = [];
for (const { slug, ...post } of POSTS) {
  mutations.push({
    createIfNotExists: {
      _id: `post-${slug}`,
      _type: "post",
      slug: { _type: "slug", current: slug },
      author: "Nytrox Team",
      ...post,
      ...(await coverFor(slug)),
    },
  });
}

const res = await fetch(`${api}/data/mutate/${dataset}?returnIds=true`, {
  method: "POST",
  headers: { ...auth, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations }),
});

if (!res.ok) {
  console.error(`[seed-blog] Sanity responded ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const { results } = await res.json();
for (const [i, result] of results.entries()) {
  // an existing document comes back as an "update" that changed nothing
  const created = result.operation === "create";
  console.log(`[seed-blog] ${created ? "created" : "already there"}: ${POSTS[i].title}`);
}
