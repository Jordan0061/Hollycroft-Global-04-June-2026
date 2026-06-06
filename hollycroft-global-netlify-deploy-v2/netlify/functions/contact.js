"use strict";

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL
  || "https://hook.us2.make.com/95wordi3g85rnaose2mt7cjt1ahwa58s";

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  },
  body: JSON.stringify(body)
});

const clean = (value, maxLength) => String(value || "").trim().slice(0, maxLength);

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (country, value) => {
  const digits = value.replace(/\D/g, "");
  return country === "UK"
    ? digits.length === 12 && digits.startsWith("44")
    : digits.length === 11 && digits.startsWith("1");
};

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return jsonResponse(200, {
      ok: true,
      service: "hollycroft-contact",
      version: "make-query-v8",
      makeDelivery: "GET query parameters",
      fields: [
        "First name",
        "Last name",
        "Email",
        "Phone number",
        "How can we help?"
      ]
    });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method not allowed." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { message: "The form data could not be read." });
  }

  if (clean(body.website, 200)) {
    return jsonResponse(200, { ok: true });
  }

  const payload = {
    "First name": clean(body["First name"], 80),
    "Last name": clean(body["Last name"], 80),
    "Email": clean(body.Email, 254),
    "Phone number": clean(body["Phone number"], 40),
    "How can we help?": clean(body["How can we help?"], 5000)
  };

  const phoneCountry = clean(body["Phone country"], 20) === "UK" ? "UK" : "USA";

  if (!payload["First name"] || !payload["Last name"] || !payload.Email || !payload["Phone number"] || !payload["How can we help?"]) {
    return jsonResponse(400, { message: "Please complete every required field." });
  }

  if (!isValidEmail(payload.Email)) {
    return jsonResponse(400, { message: "Please enter a valid email address." });
  }

  if (!isValidPhone(phoneCountry, payload["Phone number"])) {
    return jsonResponse(400, {
      message: phoneCountry === "UK"
        ? "Enter +44 followed by exactly 10 digits."
        : "Enter +1 followed by exactly 10 digits."
    });
  }

  if (!MAKE_WEBHOOK_URL.startsWith("https://hook.us2.make.com/")) {
    return jsonResponse(500, { message: "The contact form is not configured correctly." });
  }

  try {
    const webhookUrl = new URL(MAKE_WEBHOOK_URL);
    Object.entries(payload).forEach(([key, value]) => {
      webhookUrl.searchParams.set(key, value);
    });

    const response = await fetch(webhookUrl, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Make webhook returned ${response.status}`);
    }

    return jsonResponse(200, { ok: true });
  } catch {
    return jsonResponse(502, { message: "Something went wrong. Please email hello@hollycroftglobal.com." });
  }
};
