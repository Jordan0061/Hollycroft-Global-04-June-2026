# Hollycroft Global GoDaddy Editing Guide

Upload every file in this folder together.

## Edit website copy

Open `site-content.js`. It contains the editable wording for:

- Header navigation
- Page title and description
- Hero section
- Reviews
- Three information cards
- Work logo grid
- Button labels and form wording
- Contact form phone country labels and placeholders
- Five Insights article slots
- Footer heading

For Insights articles, enter text between the quotation marks for `title`, `preview`, `expanded`, and `meta`.

Do not edit `index.html`, `site.css`, or `app.js` for ordinary copy changes. Those files control structure, styling, and behavior.

## Contact form

The contact form is set up to send submissions to this Make webhook:

```text
https://hook.us2.make.com/95wordi3g85rnaose2mt7cjt1ahwa58s
```

The webhook URL is stored in `site-content.js`:

```js
contactWebhookUrl: "https://hook.us2.make.com/95wordi3g85rnaose2mt7cjt1ahwa58s",
```

The HTML form still keeps a Netlify-compatible structure as a fallback:

- Form name: `contact`
- Spam trap field: `website`
- Required fields: first name, last name, email, phone, message, and security check

The form cannot fully submit from a local `file://` preview. Test the form on the published domain.

The form code validates required fields, checks the numerical security question, and uses a hidden spam trap before sending the submission to Make. After a successful send, visitors are sent to `thank-you.html`.

No public website can be made impossible to attack. Do not place private keys, passwords, or Google account credentials in the website files.

## Add brand icons

Upload each logo image into the same folder as `index.html`. Then open `site-content.js` and add entries inside `work.logos`:

```js
{ image: "brand-logo.png", alt: "Brand name", url: "" }
```

Use a secure `https://` address in `url` when the logo should be clickable. Leave `url` empty otherwise.

The first 12 logo entries are always visible. Any logo after the first 12 is hidden until visitors click `VIEW EXPERIENCE`.

## Add case-study thumbnails

Upload each thumbnail image and its case-study HTML page into the same folder as `index.html`. Then add entries inside `caseStudies.items` in `site-content.js`:

```js
{
  image: "project-thumbnail.jpg",
  alt: "Project image description",
  title: "Project title",
  page: "case-study-project.html"
}
```

Each thumbnail opens its matching local case-study page. External redirect addresses are intentionally blocked by the renderer.

## Future sitemap setup

The site is structured with stable section anchors:

```text
#top
#work
#insights
#contact
```

Use `sitemap-template.xml` when the final domain is live:

1. Replace `https://www.hollycroftglobal.com/` with the final domain.
2. Rename `sitemap-template.xml` to `sitemap.xml`.
3. Replace the domain in `robots-template.txt`.
4. Rename `robots-template.txt` to `robots.txt`.
5. Add future standalone case-study or insight pages as new `<url>` entries in `sitemap.xml`.

## Files

- `index.html`: page structure
- `site.css`: visual styling
- `site-content.js`: editable website wording
- `app.js`: interactions and safe text rendering
- `_headers`: recommended Netlify security headers
- `sitemap-template.xml`: future sitemap starter
- `robots-template.txt`: future robots file starter
- `.htaccess`: optional Apache security headers for non-Netlify hosting

## Security

Keep HTTPS enabled. On Netlify, upload `_headers` with the site files. On Apache hosting, upload `.htaccess` if the hosting plan supports it.
