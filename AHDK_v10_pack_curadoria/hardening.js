/* AHDK UI hardening: reduz hitboxes invisiveis, clique fantasma e propagacao acidental. */
(() => {
  const MODAL_SELECTOR = [
    ".product-modal-backdrop",
    ".detail-backdrop",
    ".cart-backdrop",
    ".image-zoom-backdrop",
    ".catalog-hub-backdrop"
  ].join(",");

  const INTERACTIVE_SELECTOR = [
    "button",
    "a",
    "input",
    "select",
    "textarea",
    "summary",
    "[role='button']",
    "[onclick]",
    "[tabindex]"
  ].join(",");

  const CARD_SELECTOR = [
    "article[onclick]",
    ".product-card[onclick]",
    ".featured-card[onclick]",
    ".collection-card[onclick]",
    ".drop-card[onclick]",
    ".interactive-card[onclick]",
    ".interactive-item[onclick]",
    ".order-card[onclick]"
  ].join(",");

  const INNER_CONTROL_SELECTOR = "button,a,input,select,textarea,summary,[role='button'],[data-ahdk-control]";

  function scheduleAudit() {
    clearTimeout(scheduleAudit.timer);
    scheduleAudit.timer = setTimeout(runAudit, 80);
  }

  function markModalState() {
    document.body.classList.toggle("ahdk-modal-open", Boolean(document.querySelector(MODAL_SELECTOR)));
  }

  function isGhostInteractive(element) {
    if (!(element instanceof HTMLElement)) return false;
    if (element.matches("input[type='hidden']")) return false;

    const rect = element.getBoundingClientRect();
    if (rect.width < 3 || rect.height < 3) return false;

    const styles = getComputedStyle(element);
    const opacity = Number.parseFloat(styles.opacity || "1");
    return element.hidden ||
      element.getAttribute("aria-hidden") === "true" ||
      styles.visibility === "hidden" ||
      styles.display === "none" ||
      opacity <= 0.01;
  }

  function remember(element, attr, value) {
    const key = `ahdkPrev${attr}`;
    if (element.dataset[key] === undefined) element.dataset[key] = value ?? "";
  }

  function suppressGhostTargets() {
    document.querySelectorAll(INTERACTIVE_SELECTOR).forEach(element => {
      if (!(element instanceof HTMLElement)) return;

      if (isGhostInteractive(element)) {
        remember(element, "Tabindex", element.getAttribute("tabindex"));
        remember(element, "AriaHidden", element.getAttribute("aria-hidden"));
        element.dataset.ahdkGhostSuppressed = "1";
        element.setAttribute("tabindex", "-1");
        element.setAttribute("aria-hidden", "true");
        return;
      }

      if (element.dataset.ahdkGhostSuppressed === "1") {
        element.removeAttribute("data-ahdk-ghost-suppressed");
        const previousTabindex = element.dataset.ahdkPrevTabindex || "";
        const previousAriaHidden = element.dataset.ahdkPrevAriaHidden || "";
        previousTabindex ? element.setAttribute("tabindex", previousTabindex) : element.removeAttribute("tabindex");
        previousAriaHidden ? element.setAttribute("aria-hidden", previousAriaHidden) : element.removeAttribute("aria-hidden");
        delete element.dataset.ahdkPrevTabindex;
        delete element.dataset.ahdkPrevAriaHidden;
      }
    });
  }

  function stopNestedInteractiveClicks() {
    document.querySelectorAll(CARD_SELECTOR).forEach(card => {
      if (!(card instanceof HTMLElement)) return;
      card.querySelectorAll(INNER_CONTROL_SELECTOR).forEach(control => {
        if (!(control instanceof HTMLElement) || control === card || control.dataset.ahdkStopBubble === "1") return;
        control.dataset.ahdkStopBubble = "1";
        control.addEventListener("click", event => event.stopPropagation());
      });
    });
  }

  function improveKeyboardAndLabels() {
    document.querySelectorAll("button:not([type])").forEach(button => button.setAttribute("type", "button"));

    document.querySelectorAll(".hero-dots button").forEach((button, index) => {
      if (!button.getAttribute("aria-label")) button.setAttribute("aria-label", `Ir para destaque ${index + 1}`);
    });

    document.querySelectorAll("[role='button']:not(button):not(a)").forEach(element => {
      if (!(element instanceof HTMLElement)) return;
      if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "0");
      if (element.dataset.ahdkKeyboardGuard === "1") return;
      element.dataset.ahdkKeyboardGuard = "1";
      element.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        element.click();
      });
    });
  }

  function runAudit() {
    markModalState();
    suppressGhostTargets();
    stopNestedInteractiveClicks();
    improveKeyboardAndLabels();
  }

  document.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target.closest("[data-ahdk-ghost-suppressed='1']") : null;
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  const observer = new MutationObserver(scheduleAudit);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class", "style", "hidden", "aria-hidden"]
  });

  window.addEventListener("load", runAudit);
  document.addEventListener("DOMContentLoaded", runAudit);
  scheduleAudit();
})();
