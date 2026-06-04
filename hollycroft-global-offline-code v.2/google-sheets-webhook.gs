/*
  HOLLYCROFT GLOBAL GOOGLE SHEETS WEBHOOK
  ---------------------------------------
  Paste this into Google Apps Script and deploy it as a Web App.
  Store your Google Sheet ID in Project Settings > Script properties:

  SHEET_ID = your_google_sheet_id_here

  Keep this script private. Only paste the deployed Web App URL into
  `contactWebhookUrl` in site-content.js.
*/

const SHEET_NAME = "Contact form";
const EMAIL_TO = "hello@hollycroftglobal.com";
const MAX_LENGTHS = {
  submittedAt: 40,
  firstName: 80,
  lastName: 80,
  email: 254,
  phoneCountry: 20,
  phone: 40,
  message: 5000,
  preferredContactMethod: 20,
  website: 200
};

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const payload = parsePayload_(event);
    const row = normalizePayload_(payload);

    if (row.website) {
      return jsonResponse_({ ok: true }, 200);
    }

    if (!row.firstName || !row.lastName || !row.email || !row.phone || !row.message) {
      return jsonResponse_({ ok: false, error: "Missing required fields" }, 400);
    }

    if (!isValidEmail_(row.email)) {
      return jsonResponse_({ ok: false, error: "Invalid email address" }, 400);
    }

    const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
    if (!sheetId) {
      return jsonResponse_({ ok: false, error: "Missing SHEET_ID script property" }, 500);
    }

    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(SHEET_NAME)
      || SpreadsheetApp.openById(sheetId).insertSheet(SHEET_NAME);

    ensureHeader_(sheet);
    sheet.appendRow([
      row.submittedAt || new Date().toISOString(),
      row.firstName,
      row.lastName,
      row.email,
      row.phoneCountry,
      row.phone,
      row.preferredContactMethod,
      row.message
    ]);

    sendEmail_(row);

    return jsonResponse_({ ok: true }, 200);
  } catch (error) {
    return jsonResponse_({ ok: false, error: "Invalid request" }, 400);
  } finally {
    lock.releaseLock();
  }
}

function parsePayload_(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Missing post body");
  }
  return JSON.parse(event.postData.contents);
}

function normalizePayload_(payload) {
  const output = {};
  Object.keys(MAX_LENGTHS).forEach((key) => {
    output[key] = String(payload[key] || "").trim().slice(0, MAX_LENGTHS[key]);
  });
  output.preferredContactMethod = output.preferredContactMethod === "call" ? "call" : "email";
  output.phoneCountry = output.phoneCountry === "UK" ? "UK" : "USA";
  return output;
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendEmail_(row) {
  const name = `${row.firstName} ${row.lastName}`.trim();
  const subject = `Website enquiry from ${name}`;
  const body = [
    "New Hollycroft Global website enquiry",
    "",
    `First name: ${row.firstName}`,
    `Last name: ${row.lastName}`,
    `Email: ${row.email}`,
    `Phone country: ${row.phoneCountry}`,
    `Phone: ${row.phone}`,
    `Preferred contact method: ${row.preferredContactMethod}`,
    "",
    "Message:",
    row.message,
    "",
    `Submitted at: ${row.submittedAt || new Date().toISOString()}`
  ].join("\n");

  MailApp.sendEmail({
    to: EMAIL_TO,
    subject,
    body,
    replyTo: row.email,
    name: "Hollycroft Global Website"
  });
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Submitted at",
    "First name",
    "Last name",
    "Email",
    "Phone country",
    "Phone",
    "Preferred contact method",
    "Message"
  ]);
}

function jsonResponse_(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(Object.assign({ statusCode }, body)))
    .setMimeType(ContentService.MimeType.JSON);
}
