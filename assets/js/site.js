/* ==========================================================================
   Cabinet Chiropratique Thomas Nunes — interactions
   Vanilla JS, zero dependance, ~7 Ko. Tout est progressif : sans JS, le site
   reste entierement lisible et navigable. Tout respecte prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  /* ---------- 1. Ecran de chargement ---------------------------------- */
  var loader = document.querySelector(".loader");
  function hideLoader() {
    if (!loader) return;
    loader.classList.add("is-done");
    setTimeout(function () { loader.remove(); }, 800);
  }
  if (loader) {
    if (reduced) hideLoader();
    else window.addEventListener("load", function () { setTimeout(hideLoader, 520); });
    // filet de securite : on ne bloque jamais la page
    setTimeout(hideLoader, 3000);
  }

  /* ---------- 2. Titre revele mot par mot ------------------------------ */
  document.querySelectorAll("[data-words]").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    el.classList.add("reveal-words");
    words.forEach(function (word, i) {
      var outer = document.createElement("span");
      outer.className = "w";
      var inner = document.createElement("span");
      inner.style.setProperty("--i", i);
      inner.textContent = word;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });
  setTimeout(function () {
    document.querySelectorAll("[data-words]").forEach(function (el) {
      (el.closest("section") || el).classList.add("is-lit");
    });
  }, loader && !reduced ? 700 : 60);

  /* ---------- 3. Apparition au defilement ------------------------------ */
  var revealables = document.querySelectorAll(".reveal, .figure");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. En-tete : masquage au defilement ---------------------- */
  var header = document.querySelector(".site-header");
  var nav = document.getElementById("nav-principal");
  var lastY = window.scrollY;
  var progressBar = document.querySelector(".progress i");
  var parallaxItems = [].slice.call(document.querySelectorAll(".figure--parallax img"));
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    if (header) {
      header.classList.toggle("is-stuck", y > 10);
      var menuOpen = nav && nav.classList.contains("is-open");
      header.classList.toggle("is-hidden", y > 420 && y > lastY + 4 && !menuOpen);
    }

    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    }

    if (!reduced) {
      var vh = window.innerHeight;
      parallaxItems.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var mid = (r.top + r.height / 2 - vh / 2) / vh;   // -1 .. 1
        img.style.transform = "scale(1.12) translate3d(0," + (mid * -22).toFixed(2) + "px,0)";
      });
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; raf(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- 5. Menu mobile ------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.removeProperty("overflow");
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open && header) header.classList.remove("is-hidden");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeNav(); toggle.focus(); }
    });
    var desktop = window.matchMedia("(min-width: 62rem)");
    var onChange = function (e) { if (e.matches) closeNav(); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------- 6. Curseur personnalise (souris uniquement) -------------- */
  if (fine && !reduced) {
    var cur = document.createElement("div");
    cur.className = "cursor";
    document.body.appendChild(cur);
    var cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY; cur.classList.add("is-on");
    });
    (function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      raf(loop);
    })();
    document.addEventListener("mouseover", function (e) {
      cur.classList.toggle("is-hover", !!e.target.closest("a, button, summary, input, select, textarea, label"));
    });
    document.addEventListener("mouseleave", function () { cur.classList.remove("is-on"); });
  }

  /* ---------- 7. Boutons magnetiques ----------------------------------- */
  if (fine && !reduced) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- 8. Compteurs --------------------------------------------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
        cio.unobserve(el);
        if (reduced) { el.textContent = target + suffix; return; }
        var t0 = performance.now(), dur = 1400;
        (function tick(now) {
          var p = Math.min((now - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) raf(tick);
        })(t0);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- 9. Une seule FAQ ouverte a la fois ----------------------- */
  document.querySelectorAll("[data-accordion]").forEach(function (group) {
    var items = group.querySelectorAll("details");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (o) { if (o !== item) o.open = false; });
      });
    });
  });

  /* ---------- 10. Jour d'ouverture mis en evidence --------------------- */
  var hoursTable = document.querySelector("[data-hours]");
  if (hoursTable) {
    var today = new Date().getDay();            // 0 = dimanche
    var row = hoursTable.querySelector('[data-day="' + today + '"]');
    if (row) row.classList.add("is-today");
  }

  /* ---------- 11. CTA collant du tunnel -------------------------------- */
  var sticky = document.querySelector(".funnel-sticky");
  if (sticky) {
    document.body.classList.add("has-sticky-cta");
    var formCard = document.querySelector("#reserver");
    if ("IntersectionObserver" in window && formCard) {
      new IntersectionObserver(function (entries) {
        sticky.classList.toggle("is-visible", !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(formCard);
    } else {
      window.addEventListener("scroll", function () {
        sticky.classList.toggle("is-visible", window.scrollY > 700);
      }, { passive: true });
    }
  }

  /* ---------- 12. Transition entre les pages --------------------------- */
  var swipe = document.querySelector(".swipe");
  if (swipe && !reduced) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (/^(https?:)?\/\//.test(href) && a.host !== location.host) return;
      if (/^(mailto:|tel:|#)/.test(href) || href === "") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      swipe.classList.add("is-out");
      setTimeout(function () { location.href = a.href; }, 460);
    });
    // retour arriere : on ne doit jamais rester sur un voile noir
    window.addEventListener("pageshow", function (ev) {
      if (ev.persisted) swipe.classList.remove("is-out");
    });
  }

  /* ---------- 13. Provenance publicitaire ------------------------------ */
  // ?src=meta-octobre dans l'URL de l'annonce -> enregistre avec la demande,
  // pour savoir quelle campagne a genere quel rendez-vous.
  var srcField = document.querySelector("[data-src-field]");
  if (srcField) {
    try {
      var src = new URLSearchParams(location.search).get("src");
      if (src) srcField.value = src.slice(0, 80);
    } catch (e) { /* navigateur ancien : on garde la valeur par defaut */ }
  }

  /* ---------- 14. Annee courante --------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
