"use strict";

(() => {
  const content = window.HOLLYCROFT_CONTENT;
  if (!content) return;

  const getValue = (path) => path.split(".").reduce((value, key) => value?.[key], content);
  const setText = (element, value) => {
    if (element && typeof value === "string") element.textContent = value;
  };
  const labels = {
    viewExperience: content.buttons?.viewExperience || "VIEW EXPERIENCE",
    hideExperience: content.buttons?.hideExperience || "HIDE EXPERIENCE",
    viewAllInsights: content.buttons?.viewAllInsights || "VIEW ALL INSIGHTS",
    hideExtraInsights: content.buttons?.hideExtraInsights || "HIDE EXTRA INSIGHTS",
    readMore: content.buttons?.readMore || "READ MORE",
    readLess: content.buttons?.readLess || "READ LESS"
  };

  if (typeof content.pageTitle === "string") document.title = content.pageTitle;
  document.querySelectorAll("[data-meta-content]").forEach((element) => {
    const value = getValue(element.dataset.metaContent);
    if (typeof value === "string") element.setAttribute("content", value);
  });

  document.querySelectorAll("[data-content]").forEach((element) => {
    setText(element, getValue(element.dataset.content));
  });

  document.querySelectorAll("[data-placeholder-content]").forEach((element) => {
    const value = getValue(element.dataset.placeholderContent);
    if (typeof value === "string") element.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-review-index]").forEach((article) => {
    const review = content.reviews[Number(article.dataset.reviewIndex)];
    if (!review) return;
    setText(article.querySelector('[data-review-field="attribution"]'), review.attribution);
    setText(article.querySelector('[data-review-field="quote"]'), `“${review.quote}”`);
  });

  document.querySelectorAll("[data-card-index]").forEach((card) => {
    const cardContent = content.cards[Number(card.dataset.cardIndex)];
    if (!cardContent) return;
    setText(card.querySelector('[data-card-field="title"]'), cardContent.title);
    setText(card.querySelector('[data-card-field="copy"]'), cardContent.copy);
  });

  const brandGrid = document.getElementById("brand-grid");
  const brandEmpty = document.getElementById("brand-empty");
  const experienceToggle = document.getElementById("experience-toggle");
  const safeImageName = /^[a-zA-Z0-9._/-]+$/;
  const visibleLogoLimit = Number.isInteger(content.work?.visibleLogoLimit) ? content.work.visibleLogoLimit : 12;

  if (brandGrid && Array.isArray(content.work?.logos)) {
    content.work.logos.forEach((logo, index) => {
      if (!logo || !safeImageName.test(logo.image || "")) return;

      const wrapper = logo.url?.startsWith("https://")
        ? document.createElement("a")
        : document.createElement("div");
      wrapper.className = "brand-logo";
      const isCollapsibleLogo = index >= visibleLogoLimit;
      wrapper.hidden = isCollapsibleLogo;
      if (isCollapsibleLogo) wrapper.dataset.collapsibleLogo = "true";

      if (wrapper instanceof HTMLAnchorElement) {
        wrapper.href = logo.url;
        wrapper.target = "_blank";
        wrapper.rel = "noopener noreferrer";
      }

      const image = document.createElement("img");
      image.src = logo.image;
      image.alt = logo.alt || "";
      image.loading = "lazy";
      image.decoding = "async";
      wrapper.append(image);
      brandGrid.append(wrapper);
    });

    if (brandEmpty) {
      brandEmpty.hidden = brandGrid.children.length > 0;
    }

    const hiddenLogos = [...brandGrid.querySelectorAll('[data-collapsible-logo="true"]')];
    if (experienceToggle && hiddenLogos.length) {
      experienceToggle.hidden = false;
      experienceToggle.addEventListener("click", () => {
        const isOpen = experienceToggle.getAttribute("aria-expanded") === "true";
        experienceToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
        experienceToggle.textContent = isOpen ? labels.viewExperience : labels.hideExperience;
        hiddenLogos.forEach((logo) => {
          logo.hidden = isOpen;
        });
      });
    }
  }

  const caseStudiesGrid = document.getElementById("case-studies-grid");
  const caseStudiesEmpty = document.getElementById("case-studies-empty");
  const caseStudiesCard = document.querySelector(".case-studies-card");
  const safeLocalPage = /^[a-zA-Z0-9._/-]+\.html$/;

  if (caseStudiesGrid && Array.isArray(content.caseStudies?.items)) {
    content.caseStudies.items.forEach((item) => {
      if (!item || !safeImageName.test(item.image || "") || !safeLocalPage.test(item.page || "")) return;

      const link = document.createElement("a");
      link.className = "case-study";
      link.href = item.page;

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.alt || "";
      image.loading = "lazy";
      image.decoding = "async";

      const label = document.createElement("span");
      label.className = "case-study-label";
      label.textContent = item.title || "View case study";

      link.append(image, label);
      caseStudiesGrid.append(link);
    });

    if (caseStudiesEmpty) {
      caseStudiesEmpty.hidden = caseStudiesGrid.children.length > 0;
    }
    if (caseStudiesCard) {
      caseStudiesCard.hidden = caseStudiesGrid.children.length === 0;
    }
  }

  const insightsSection = document.getElementById("insights");
  const insightsToggle = document.querySelector(".insights-toggle");
  const insightArticles = [...document.querySelectorAll("[data-insight-index]")];
  const hasInsightCopy = (insight) => Boolean(
    insight
    && ["title", "preview", "expanded", "meta"].some((field) => typeof insight[field] === "string" && insight[field].trim())
  );
  let visibleInsightCount = 0;

  insightArticles.forEach((article) => {
    const insight = content.insights.articles[Number(article.dataset.insightIndex)];
    const hasCopy = hasInsightCopy(insight);

    article.hidden = !hasCopy;
    article.removeAttribute("data-additional-insight");
    if (!hasCopy) return;

    visibleInsightCount += 1;
    if (visibleInsightCount > 1) {
      article.hidden = true;
      article.dataset.additionalInsight = "true";
    }

    ["title", "preview", "expanded", "meta"].forEach((field) => {
      setText(article.querySelector(`[data-insight-field="${field}"]`), insight[field]);
    });

    const readMore = article.querySelector(".insights-more");
    readMore.hidden = !(typeof insight.expanded === "string" && insight.expanded.trim());
    readMore.textContent = labels.readMore;
  });

  if (insightsSection) {
    insightsSection.hidden = visibleInsightCount === 0;
  }

  if (insightsToggle) {
    insightsToggle.hidden = visibleInsightCount <= 1;
  }

  setText(document.getElementById("year"), String(new Date().getFullYear()));

  const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
  const sectionTargets = sectionLinks
    .map((link) => ({
      link,
      target: document.getElementById(link.dataset.sectionLink)
    }))
    .filter(({ target }) => target);
  let scrollFrame;

  const updateActiveSection = () => {
    const header = document.querySelector(".site-header");
    const threshold = (header?.offsetHeight || 0) + 24;
    let activeSection = sectionTargets[0];

    sectionTargets.forEach((section) => {
      if (section.target.getBoundingClientRect().top <= threshold) {
        activeSection = section;
      }
    });

    sectionTargets.forEach(({ link }) => {
      if (link === activeSection?.link) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const requestSectionUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = undefined;
      updateActiveSection();
    });
  };

  window.addEventListener("scroll", requestSectionUpdate, { passive: true });
  window.addEventListener("resize", requestSectionUpdate);
  updateActiveSection();

  const reviewTrack = document.querySelector(".review-track");
  const reviewDots = [...document.querySelectorAll(".review-dot")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeReview = 0;
  let reviewTimer;

  const showReview = (index) => {
    if (!reviewTrack || !reviewDots.length) return;
    activeReview = index;
    reviewTrack.style.transform = `translateX(-${index * 100}%)`;
    reviewDots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  };

  const startReviewTimer = () => {
    if (reducedMotion || !reviewDots.length) return;
    clearInterval(reviewTimer);
    reviewTimer = setInterval(() => {
      showReview((activeReview + 1) % reviewDots.length);
    }, 5000);
  };

  reviewDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showReview(index);
      startReviewTimer();
    });
  });

  startReviewTimer();

  document.querySelectorAll(".insights-more").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("aria-controls");
      const expandedContent = targetId ? document.getElementById(targetId) : null;
      if (!expandedContent) return;

      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", isOpen ? "false" : "true");
      button.textContent = isOpen ? labels.readMore : labels.readLess;
      expandedContent.hidden = isOpen;
    });
  });

  const contactForm = document.querySelector(".contact-form");
  const contactFunctionEndpoint = "/.netlify/functions/contact";
  const formStatus = document.getElementById("form-status");
  const submitButton = document.getElementById("contact-submit");
  const honeypotInput = document.getElementById("website");
  const phoneCountryInput = document.getElementById("phone-country");
  const phoneInput = document.getElementById("phone");
  const phoneLabel = document.querySelector('label[for="phone"]');
  const contactMethodInputs = [...document.querySelectorAll('input[name="preferred-contact-method"]')];
  const captchaQuestion = document.getElementById("captcha-question");
  const captchaAnswer = document.getElementById("captcha-answer");
  const captchaError = document.getElementById("captcha-error");
  let captchaTotal = 0;

  const lockCaptchaField = () => {
    if (!captchaAnswer) return;
    captchaAnswer.type = "tel";
    captchaAnswer.inputMode = "numeric";
    captchaAnswer.maxLength = 2;
    captchaAnswer.size = 2;
    captchaAnswer.pattern = "[0-9]{1,2}";
    captchaAnswer.classList.add("captcha-answer");
    captchaAnswer.style.width = "calc(2ch + 0.9rem)";
    captchaAnswer.style.minWidth = "calc(2ch + 0.9rem)";
    captchaAnswer.style.maxWidth = "calc(2ch + 0.9rem)";
  };

  const updateContactMethodRequirements = () => {
    if (!phoneInput || !phoneLabel) return;
    phoneInput.required = true;
    phoneInput.setCustomValidity("");
    phoneLabel.textContent = content.contact?.phoneLabel || "Phone number*";
  };

  const updatePhoneFormat = () => {
    if (!phoneInput || !phoneCountryInput) return;
    const isUk = phoneCountryInput.value === "UK";
    phoneInput.placeholder = isUk
      ? content.contact?.phoneUkPlaceholder || "+44 20 7946 0958"
      : content.contact?.phoneUsaPlaceholder || "+1 310 555 1212";
    phoneInput.pattern = isUk
      ? "^\\+44[\\s.-]?\\d(?:[\\s.-]?\\d){9}$"
      : "^\\+1[\\s.-]?\\d(?:[\\s.-]?\\d){9}$";
    phoneInput.maxLength = isUk ? 17 : 16;
    phoneInput.title = isUk
      ? "Enter +44 followed by exactly 10 digits, for example +44 20 7946 0958."
      : "Enter +1 followed by exactly 10 digits, for example +1 310 555 1212.";
    phoneInput.setCustomValidity("");
  };

  const validatePhoneNumber = () => {
    if (!phoneInput || !phoneCountryInput) return true;
    const digits = phoneInput.value.replace(/\D/g, "");
    const isUk = phoneCountryInput.value === "UK";
    const isValid = isUk
      ? digits.length === 12 && digits.startsWith("44")
      : digits.length === 11 && digits.startsWith("1");

    phoneInput.setCustomValidity(isValid
      ? ""
      : isUk
        ? "Enter +44 followed by exactly 10 digits."
        : "Enter +1 followed by exactly 10 digits.");
    return isValid;
  };

  contactMethodInputs.forEach((input) => {
    input.addEventListener("change", updateContactMethodRequirements);
  });
  phoneCountryInput?.addEventListener("change", () => {
    updatePhoneFormat();
    validatePhoneNumber();
  });
  phoneInput?.addEventListener("input", () => {
    const isUk = phoneCountryInput?.value === "UK";
    const maxDigits = isUk ? 12 : 11;
    const digits = phoneInput.value.replace(/\D/g, "");
    if (digits.length > maxDigits) {
      let seenDigits = 0;
      phoneInput.value = [...phoneInput.value].filter((character) => {
        if (!/\d/.test(character)) return true;
        seenDigits += 1;
        return seenDigits <= maxDigits;
      }).join("");
    }
    validatePhoneNumber();
  });

  updateContactMethodRequirements();
  updatePhoneFormat();
  lockCaptchaField();

  const setFormStatus = (message) => {
    if (formStatus) formStatus.textContent = message || "";
  };

  const cleanFormValue = (value, maxLength) => String(value || "").trim().slice(0, maxLength);

  const getContactPayload = () => {
    const formData = new FormData(contactForm);
    return {
      "First name": cleanFormValue(formData.get("first-name"), 80),
      "Last name": cleanFormValue(formData.get("last-name"), 80),
      "Email": cleanFormValue(formData.get("email"), 254),
      "Phone country": cleanFormValue(formData.get("phone-country"), 20),
      "Phone number": cleanFormValue(formData.get("phone"), 40),
      "How can we help?": cleanFormValue(formData.get("message"), 5000),
      website: cleanFormValue(formData.get("website"), 200)
    };
  };

  const createCaptcha = () => {
    if (!captchaQuestion || !captchaAnswer) return;
    const firstNumber = Math.floor(Math.random() * 8) + 2;
    const secondNumber = Math.floor(Math.random() * 8) + 2;
    captchaTotal = firstNumber + secondNumber;
    captchaQuestion.textContent = `${firstNumber} + ${secondNumber} =`;
    captchaAnswer.value = "";
    captchaAnswer.setCustomValidity("");
    if (captchaError) captchaError.hidden = true;
  };

  createCaptcha();

  captchaAnswer?.addEventListener("input", () => {
    lockCaptchaField();
    captchaAnswer.value = captchaAnswer.value.replace(/\D/g, "").slice(0, 2);
    captchaAnswer.setCustomValidity("");
    if (captchaError) captchaError.hidden = true;
  });

  captchaAnswer?.addEventListener("beforeinput", (event) => {
    if (event.inputType?.startsWith("delete")) return;
    const incoming = event.data || "";
    const selectedLength = captchaAnswer.selectionEnd - captchaAnswer.selectionStart;
    const nextLength = captchaAnswer.value.length - selectedLength + incoming.length;
    if (/\D/.test(incoming) || nextLength > 2) {
      event.preventDefault();
    }
  });

  const handleContactSend = async (event) => {
    event?.preventDefault();
    if (!contactForm || !captchaAnswer) return;
    updateContactMethodRequirements();

    if (honeypotInput?.value.trim()) {
      return;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (!validatePhoneNumber()) {
      phoneInput?.reportValidity();
      return;
    }

    const submittedAnswer = Number.parseInt(captchaAnswer.value, 10);
    const isCorrect = captchaAnswer.value.trim() !== "" && submittedAnswer === captchaTotal;

    if (!isCorrect) {
      captchaAnswer.setCustomValidity(content.contact?.captchaError || "Please answer the security check correctly.");
      if (captchaError) captchaError.hidden = false;
      captchaAnswer.reportValidity();
      return;
    }

    captchaAnswer.setCustomValidity("");
    if (captchaError) captchaError.hidden = true;

    if (window.location.protocol === "file:") {
      setFormStatus(content.contact?.localPreviewMessage || "Local preview cannot submit to Netlify Forms.");
      return;
    }

    const payload = getContactPayload();

    if (submitButton) submitButton.disabled = true;
    setFormStatus(content.contact?.sendingMessage || "Sending...");

    try {
      const response = await fetch(contactFunctionEndpoint, {
        method: "POST",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let endpointMessage = content.contact?.endpointErrorMessage || "The contact form is not responding.";
        try {
          const errorBody = await response.json();
          if (typeof errorBody?.message === "string" && errorBody.message.trim()) {
            endpointMessage = errorBody.message;
          }
        } catch {
          // Keep the default endpoint message.
        }
        throw new Error(endpointMessage);
      }

      setFormStatus(content.contact?.successMessage || "Thank you. Your message has been sent.");
      contactForm.reset();
      updateContactMethodRequirements();
      updatePhoneFormat();
      createCaptcha();
      window.location.href = contactForm.getAttribute("action") || "/thank-you.html";
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : content.contact?.errorMessage || "Something went wrong. Please email hello@hollycroftglobal.com.";
      setFormStatus(message);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  };

  submitButton?.addEventListener("click", handleContactSend);

  contactForm?.addEventListener("submit", handleContactSend);

  insightsToggle?.addEventListener("click", () => {
    const isOpen = insightsToggle.getAttribute("aria-expanded") === "true";
    const additionalInsights = [...document.querySelectorAll('[data-additional-insight="true"]')];
    insightsToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    insightsToggle.textContent = isOpen ? labels.viewAllInsights : labels.hideExtraInsights;
    additionalInsights.forEach((article) => {
      article.hidden = isOpen;
    });
  });
})();
