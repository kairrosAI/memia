/* MEMIA BPOS site — bilingual toggle, mobile menu, connector drawers, inert waitlist.
   Bilingual model: every translatable node exists twice in the DOM as
   <span data-lang="fr">…</span><span data-lang="en" hidden>…</span>.
   The toggle flips visibility and <html lang>. No copy lives in JS, so the FR
   default is fully crawlable and the EN version is complete, not partial. */
(function () {
  var STORE = "memia-lang";
  var DEFAULT = "en";

  function currentLang() {
    try { return localStorage.getItem(STORE) || DEFAULT; } catch (e) { return DEFAULT; }
  }

  function setLang(lang) {
    if (lang !== "fr" && lang !== "en") lang = DEFAULT;
    // Visibility is CSS-driven off <html lang> (see app.css). We only set the
    // attribute; the inline hidden spans are overridden by the lang rules.
    document.documentElement.lang = lang;
    // placeholders / aria via data-ph-fr / data-ph-en
    document.querySelectorAll("[data-ph-fr]").forEach(function (el) {
      el.setAttribute("placeholder", el.getAttribute("data-ph-" + lang) || el.getAttribute("data-ph-fr"));
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  function init() {
    setLang(currentLang());

    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-set-lang")); });
    });

    var menuToggle = document.querySelector(".menu-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    }

    // Connector family drawers
    document.querySelectorAll("[data-drawer]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var id = trigger.getAttribute("data-drawer");
        var drawer = document.getElementById(id);
        if (!drawer) return;
        var isOpen = drawer.classList.contains("open");
        document.querySelectorAll(".drawer.open").forEach(function (d) { d.classList.remove("open"); });
        if (!isOpen) { drawer.classList.add("open"); drawer.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
      });
    });

    // Inert waitlist — validates client-side, shows success, does NOT transmit.
    // Real collection is wired at deploy time only. This never sends anything.
    document.querySelectorAll("form[data-waitlist]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var lang = currentLang();
        var input = form.querySelector('input[type=email]');
        var msg = form.parentNode.querySelector(".form-msg");
        var val = (input && input.value || "").trim();
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (!msg) return;
        if (!valid) {
          msg.className = "form-msg err";
          msg.textContent = lang === "en" ? "Please enter a valid email." : "Veuillez entrer un email valide.";
          return;
        }
        msg.className = "form-msg ok";
        msg.textContent = lang === "en"
          ? "Thank you, you're on the list. We'll notify you when MEMIA Cloud is available."
          : "Merci, vous êtes inscrit. Nous vous préviendrons dès que MEMIA Cloud sera disponible.";
        if (input) input.value = "";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
