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

## Contact form webhook

The live site is on Netlify, so the contact form should send through a webhook rather than PHP. Paste your deployed webhook URL into `site-content.js`:

```js
contactWebhookUrl: "https://script.google.com/macros/s/your_web_app_id/exec",
```

The included `google-sheets-webhook.gs` file is the recommended webhook receiver. It can:

- validate the required fields
- ignore spam-trap submissions
- add each enquiry to Google Sheets
- email the enquiry to `hello@hollycroftglobal.com`

The form will not fully prove delivery from a local `file://` preview. Test the webhook after the site is uploaded to Netlify.

If the live site says the contact webhook has not been connected, paste the deployed webhook URL into `site-content.js` and upload the updated file.

## Connect the contact form to Google Sheets and email

The contact form can send submissions to Google Sheets through a Google Apps Script Web App.

1. Create a Google Sheet.
2. Copy the Sheet ID from its URL.
3. Open Google Apps Script and paste in `google-sheets-webhook.gs`.
4. In Apps Script, open Project Settings and add a Script Property:

```text
SHEET_ID = your_google_sheet_id_here
```

5. Deploy the script as a Web App.
6. Set "Execute as" to yourself.
7. Set access to the narrowest option that works for your setup. For a public website, Google usually requires "Anyone".
8. Copy the Web App URL.
9. Open `site-content.js` and paste that URL into:

```js
contactWebhookUrl: "https://script.google.com/macros/s/your_web_app_id/exec",
```

The form code validates required fields, checks the numerical security question, uses a hidden spam trap, and only allows approved HTTPS webhook hosts. The Apps Script also limits field lengths, writes approved fields to the sheet, and emails the enquiry to `hello@hollycroftglobal.com`.

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
- `google-sheets-webhook.gs`: Google Sheets and email webhook receiver
- `_headers`: recommended Netlify security headers
- `sitemap-template.xml`: future sitemap starter
- `robots-template.txt`: future robots file starter
- `.htaccess`: optional Apache security headers for non-Netlify hosting

## Security

Keep HTTPS enabled. On Netlify, upload `_headers` with the site files. On Apache hosting, upload `.htaccess` if the hosting plan supports it.
