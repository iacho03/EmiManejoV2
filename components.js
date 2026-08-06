/* ==========================================================================
   EmiManejo — components.js
   Comportamiento de los componentes compartidos: nav sticky, overlay de menú
   mobile y botón flotante de WhatsApp.

   El markup vive en index.html (SEO server-rendered, sin build step); este
   archivo sólo le agrega comportamiento. El footer es estático: no necesita JS.
   ========================================================================== */
(function () {
  'use strict';

  var DESKTOP_QUERY = '(min-width: 768px)';
  var SCROLL_THRESHOLD = 8;   // px de scroll para encender la sombra del nav
  var WA_DELAY = 2000;        // ms hasta que aparece el botón flotante

  /* ------------------------------------------------------------------------
     Nav sticky: sombra a partir de scrollY > 8
     ------------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var scrolled = null;

    function update() {
      var next = window.scrollY > SCROLL_THRESHOLD;
      if (next === scrolled) return;
      scrolled = next;
      header.classList.toggle('is-scrolled', next);
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // la página puede cargar ya scrolleada (recarga, deep link)
  }

  /* ------------------------------------------------------------------------
     Overlay de menú mobile
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var menu = document.querySelector('[data-menu]');
    var openBtn = document.querySelector('[data-menu-open]');
    var closeBtn = document.querySelector('[data-menu-close]');
    if (!menu || !openBtn) return;

    var FOCUSABLE = 'a[href], button:not([disabled])';
    var isOpen = false;

    function open() {
      if (isOpen) return;
      isOpen = true;
      menu.hidden = false;
      document.body.classList.add('is-menu-open');
      openBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    }

    function close(restoreFocus) {
      if (!isOpen) return;
      isOpen = false;
      menu.hidden = true;
      document.body.classList.remove('is-menu-open');
      openBtn.setAttribute('aria-expanded', 'false');
      if (restoreFocus) openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', function () { close(true); });

    // Los links del overlay navegan a un ancla de la misma página: cerrar.
    Array.prototype.forEach.call(
      menu.querySelectorAll('[data-menu-link]'),
      function (link) { link.addEventListener('click', function () { close(false); }); }
    );

    // Escape cierra; Tab queda atrapado dentro del overlay mientras está abierto.
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        close(true);
        return;
      }
      if (e.key !== 'Tab') return;

      var items = menu.querySelectorAll(FOCUSABLE);
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // Al pasar a viewport desktop el overlay ya no aplica.
    var mq = window.matchMedia(DESKTOP_QUERY);
    var onChange = function (e) { if (e.matches) close(false); };

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(onChange); // Safari < 14
    }
  }

  /* ------------------------------------------------------------------------
     Botón flotante de WhatsApp: aparece a los 2s con fade + scale
     ------------------------------------------------------------------------ */
  function initWaFloat() {
    var wa = document.querySelector('[data-wa-float]');
    if (!wa) return;

    window.setTimeout(function () { wa.classList.add('is-ready'); }, WA_DELAY);
  }

  initHeader();
  initMobileMenu();
  initWaFloat();
})();
