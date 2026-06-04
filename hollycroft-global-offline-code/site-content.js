/*
  HOLLYCROFT GLOBAL WEBSITE COPY
  ------------------------------
  Edit wording in this file when using GoDaddy.
  Keep the quotation marks and commas that surround each value.
  Leave an Insights field as "" when you want that field to stay blank.
*/

window.HOLLYCROFT_CONTENT = Object.freeze({
  brandName: "Hollycroft Global",
  legalName: "Hollycroft Global LLC",
  pageTitle: "Hollycroft Global",
  pageDescription: "Hollycroft Global is a marketing agency partnering with brands shaping the future.",
  // Paste your deployed webhook URL here, for example a Google Apps Script Web App URL.
  contactWebhookUrl: "",
  allowedWebhookHosts: [
    "script.google.com",
    "script.googleusercontent.com",
    "hooks.zapier.com",
    "hook.eu1.make.com",
    "hook.us1.make.com"
  ],

  nav: {
    about: "ABOUT",
    work: "WORK",
    insights: "INSIGHTS",
    contact: "CONTACT"
  },

  buttons: {
    getInTouch: "Get in touch",
    forMore: "For more",
    viewExperience: "VIEW EXPERIENCE",
    hideExperience: "HIDE EXPERIENCE",
    viewAllInsights: "VIEW ALL INSIGHTS",
    hideExtraInsights: "HIDE EXTRA INSIGHTS",
    readMore: "READ MORE",
    readLess: "READ LESS",
    submit: "Say Hello"
  },

  hero: {
    lead: "We're a marketing agency partnering with brands shaping the future.",
    detailOne: "We develop and execute integrated strategies across PR, marketing, paid media, SEO, AEO, GEO, generative AI, and digital communications that help brands build influence, accelerate growth, and stay ahead of change. Our team is focused on the industries driving tomorrow, including financial services, banking, digital assets, technology, travel, events, and consumer brands.",
    detailTwo: "Hollycroft Global brings together decades of experience across media, communications, marketing, and data science. Combining strategic thinking with data-driven intelligence and emerging technologies, we help organisations turn ambition into measurable impact."
  },

  reviews: [
    {
      attribution: "COO, Fox Sports",
      quote: "A trusted and valued partner."
    },
    {
      attribution: "CEO, Bites Baking School",
      quote: "Hollycroft Global elevated our brand exponentially through smart strategy and flawless execution."
    },
    {
      attribution: "Global Sales Director, Maritim Hotels",
      quote: "The gold standard in strategic communication."
    },
    {
      attribution: "CMO, Uhuru Design",
      quote: "They opened doors we couldn't have opened on our own."
    },
    {
      attribution: "Founder, Celebration Creation",
      quote: "We've worked with several agencies. Hollycroft Global is the best by far."
    }
  ],

  cards: [
    {
      title: "Who We Are",
      copy: "At Hollycroft Global, we believe meaningful growth begins with understanding. Our clients know us for our strategic thinking, straightforward advice, and unwavering commitment to delivering exceptional results. We combine expertise across marketing, public relations, paid media, SEO, AEO, GEO, generative AI, and communications with data-driven decision-making..."
    },
    {
      title: "Who We Work With",
      copy: "We partner with ambitious organisations across a broad range of industries, from corporate and consumer brands to banking and financial services, technology, digital assets, travel and tourism, events, exhibitions, and lifestyle. Combining deep sector expertise with data-driven intelligence, generative AI, advanced analytics, and emerging technologies, we help clients navigate complexity, anticipate change, and uncover new opportunities for growth. Operating at the forefront of marketing, communications, and digital discovery, we ensure our clients remain visible, influential, and positioned..."
    },
    {
      title: "What We Do",
      copy: "We design and deliver integrated marketing, communications, and reputation strategies that drive measurable business outcomes. Combining public relations, paid media, content, search, AEO, GEO, generative AI, and data-driven insights, we help organisations build visibility, shape perception, engage audiences, and accelerate growth across both B2B and consumer markets."
    }
  ],

  /*
    WORK LOGOS
    ----------
    1. Upload each brand icon into the same website folder.
    2. Add one object per logo with image, alt, and url fields.
    3. The first 12 logos are always visible. Logo 13 onward appears after clicking VIEW EXPERIENCE.
    4. Leave url as "" when the logo should not be clickable.
  */
  work: {
    heading: "Work",
    visibleLogoLimit: 12,
    logos: [
      { image: "logos/beaufort-logo.jpg", alt: "Beaufort", url: "" },
      { image: "logos/calm-emblem.png", alt: "Calm", url: "" },
      { image: "logos/fox-sports.png", alt: "Fox Sports", url: "" },
      { image: "logos/vedra-asset-management.png", alt: "Vedra Asset Management", url: "" },
      { image: "logos/imo.png", alt: "International Maritime Organization", url: "" },
      { image: "logos/ambrosetti.png", alt: "The European House Ambrosetti", url: "" },
      { image: "logos/imex.png", alt: "IMEX", url: "" },
      { image: "logos/maritim-hotels.png", alt: "Maritim Hotels", url: "" },
      { image: "logos/payexpo.png", alt: "PayExpo", url: "" },
      { image: "logos/simplyhealth.png", alt: "Simplyhealth", url: "" },
      { image: "logos/zeiss.png", alt: "ZEISS", url: "" },
      { image: "logos/prepay-solutions.webp", alt: "Prepay Solutions", url: "" },
      { image: "logos/setco.png", alt: "SETCO", url: "" },
      { image: "logos/everything-environmental.jpeg", alt: "Everything Environmental", url: "" },
      { image: "logos/ad-finem.png", alt: "Ad Finem", url: "" },
      { image: "logos/bites.png", alt: "Bites", url: "" },
      { image: "logos/central-working.png", alt: "Central Working", url: "" },
      { image: "logos/financial-skills-partnership.jpg", alt: "Financial Skills Partnership", url: "" },
      { image: "logos/adopt-a-grandparent.jpeg", alt: "Adopt a Grandparent", url: "" },
      { image: "logos/saudi-exhibition-convention-bureau.png", alt: "Saudi Exhibition and Convention Bureau", url: "" },
      { image: "logos/signavio.png", alt: "Signavio", url: "" },
      { image: "logos/teleperformance.png", alt: "Teleperformance", url: "" },
      { image: "logos/uhuru-design.png", alt: "Uhuru Design", url: "" },
      { image: "logos/world-of-learning.png", alt: "World of Learning", url: "" }
    ]
  },

  /*
    CASE STUDY THUMBNAILS
    ---------------------
    1. Upload each thumbnail and case-study HTML page into the same website folder.
    2. Add one object per project with image, alt, title, and page fields.
    3. Use a simple local .html filename for page. External links are intentionally blocked.
  */
  caseStudies: {
    heading: "Case studies",
    intro: "Selected work and measurable outcomes.",
    items: [
      // Add case-study entries here.
    ]
  },

  insights: {
    heading: "Latest Insights, Wins & Opinions",
    // Leave every field blank to hide an article slot until it is ready to publish.
    articles: [
      {
        title: "The New Frontier of Marketing Is Perception Infrastructure",
        preview: "For much of the past two decades, marketing has been defined by visibility. Organisations invested heavily in search rankings, social media reach, media coverage, advertising impressions, and website traffic, all with the same objective: to be seen by more people.",
        expanded: `Visibility remains important, but it is no longer the primary competitive advantage many businesses believe it to be.

Today, organisations operate in an environment where customers, investors, employees, journalists, and increasingly artificial intelligence systems are constantly evaluating credibility. In this new landscape, success is determined not simply by whether people can find you, but by what they discover when they do.

This shift is creating a new strategic imperative for business leaders. The companies gaining a meaningful advantage are no longer focused solely on marketing performance. They are investing in what might be described as perception infrastructure: the collection of signals, narratives, relationships, and trust markers that shape how an organisation is understood by the market.

The distinction is subtle but significant.

Historically, marketing, public relations, search, investor relations, and corporate communications have been treated as separate disciplines. Different teams managed different channels, often working towards different objectives and measured against different metrics. While this approach reflected the realities of an earlier media landscape, it is becoming increasingly disconnected from how modern audiences actually form opinions.

Consider the journey of a prospective client. They may first encounter a company through a media article, search for it online, visit its website, review its leadership team's LinkedIn profiles, read customer feedback, and perhaps even ask an AI assistant for information. To the organisation, these interactions may sit across multiple departments and communication functions. To the individual, however, they form a single impression.

That impression increasingly determines commercial outcomes.

Artificial intelligence is accelerating this trend. Search engines are placing greater emphasis on authority and trust. AI-powered discovery tools are prioritising credible sources. Journalists continue to rely on recognised experts, while investors and prospective employees often evaluate reputation long before engaging directly with a business.

In this environment, reputation is no longer simply a communications concern. It is becoming a strategic asset that influences discoverability, credibility, recruitment, partnership opportunities, and ultimately growth.

This helps explain why many organisations struggle despite investing heavily in content production. Producing more content does not necessarily create more influence. Publishing more frequently does not automatically build authority. Visibility without credibility can generate attention, but it rarely creates lasting trust.

The organisations outperforming their competitors are taking a more integrated approach. Rather than viewing communications as a collection of individual activities, they are aligning marketing, public relations, thought leadership, executive visibility, search strategy, stakeholder engagement, and reputation management around a coherent narrative.

They understand that every interview, article, presentation, customer interaction, and search result contributes to a broader perception of who they are and what they represent.

Ultimately, the future of marketing will belong to organisations that recognise this change. The challenge is no longer simply to attract attention. It is to build authority, credibility, and trust across an increasingly complex information ecosystem.

In the years ahead, the most successful organisations will not necessarily be the loudest voices in the market. They will be the ones that invest deliberately in how they are understood.

Because in an age defined by information abundance, perception is no longer merely an outcome of communication. It has become an essential form of business infrastructure.`,
        meta: ""
      },
      { title: "", preview: "", expanded: "", meta: "" },
      { title: "", preview: "", expanded: "", meta: "" },
      { title: "", preview: "", expanded: "", meta: "" },
      { title: "", preview: "", expanded: "", meta: "" }
    ]
  },

  contact: {
    headingLineOne: "Where insight",
    headingLineTwo: "becomes impact",
    firstNameLabel: "First name*",
    firstNamePlaceholder: "Your first name",
    lastNameLabel: "Last name*",
    lastNamePlaceholder: "Your last name",
    emailLabel: "Email*",
    emailPlaceholder: "example@gmail.com",
    phoneLabel: "Phone number*",
    phonePlaceholder: "+1 310 555 1212",
    phoneCountryLabel: "Country",
    phoneUsaOption: "USA",
    phoneUkOption: "UK",
    phoneUsaPlaceholder: "+1 310 555 1212",
    phoneUkPlaceholder: "+44 20 7946 0958",
    messageLabel: "How can we help?*",
    messagePlaceholder: "Tell us about your idea or project.",
    captchaLabel: "Security check*",
    captchaPlaceholder: "00",
    captchaError: "Please answer the security check correctly.",
    sendingMessage: "Sending...",
    successMessage: "Thank you. Your message has been sent.",
    errorMessage: "Something went wrong. Please email hello@hollycroftglobal.com.",
    webhookNotConfiguredMessage: "The contact webhook has not been connected yet. Please add your webhook URL in site-content.js.",
    endpointErrorMessage: "The contact webhook is not responding. Please confirm the webhook URL is correct and published.",
    localPreviewMessage: "Local preview cannot prove webhook delivery. Upload the site to Netlify and test the published page.",
    preferredMethodLabel: "Your preferred contact method",
    emailOption: "Email",
    callOption: "Call"
  }
});
