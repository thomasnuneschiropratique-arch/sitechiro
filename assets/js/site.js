/* Nunes Chiropratique — interactions (vitrine + tunnel)
   Sans dependance externe. Tout est optionnel : la page reste utilisable sans JS. */
(function () {
  "use strict";

  /* --- Menu mobile ------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-principal");

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    // Referme le menu si on repasse en affichage bureau
    var desktop = window.matchMedia("(min-width: 62rem)");
    var onChange = function (e) { if (e.matches) closeNav(); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* --- Ombre de l'en-tete au defilement ---------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  /* --- Apparition au defilement ------------------------------------------ */
  var revealables = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealables.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

      revealables.forEach(function (el) { observer.observe(el); });
    }
  }

  /* --- CTA collant du tunnel -------------------------------------------- */
  var sticky = document.querySelector(".funnel-sticky");
  if (sticky) {
    document.body.classList.add("has-sticky-cta");
    // Le CTA collant s'affiche des que le formulaire n'est plus a l'ecran,
    // et disparait quand le visiteur l'a sous les yeux : il ne recouvre donc
    // jamais les champs ni le bouton d'envoi.
    var formCard = document.querySelector("#reserver");

    if ("IntersectionObserver" in window && formCard) {
      new IntersectionObserver(function (entries) {
        sticky.classList.toggle("is-visible", !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(formCard);
    } else {
      window.addEventListener("scroll", function () {
        sticky.classList.toggle("is-visible", window.scrollY > 600);
      }, { passive: true });
    }
  }

  /* --- Annee courante dans le pied de page ------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Une seule FAQ ouverte a la fois ----------------------------------- */
  document.querySelectorAll("[data-accordion]").forEach(function (group) {
    var items = group.querySelectorAll("details");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  });
})();
