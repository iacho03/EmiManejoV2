/* ==========================================================================
   EmiManejo — main.js
   Comportamiento propio de la home: acordeón de FAQ y reveal de Paquetes.
   ========================================================================== */
(function () {
  'use strict';

  var PKG_FAIL_OPEN = 1200; // ms: red de seguridad si el observer nunca dispara

  /* ------------------------------------------------------------------------
     FAQ: acordeón de una sola fila abierta. Todas cerradas al cargar.
     Los <button> ya traen teclado nativo (Tab / Enter / Espacio).
     ------------------------------------------------------------------------ */
  function initFaq() {
    var root = document.querySelector('[data-faq]');
    if (!root) return;

    var buttons = Array.prototype.slice.call(root.querySelectorAll('.faq-q'));
    if (!buttons.length) return;

    function panelOf(button) {
      return document.getElementById(button.getAttribute('aria-controls'));
    }

    function setOpen(button, open) {
      var panel = panelOf(button);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.classList.toggle('is-open', open);
    }

    buttons.forEach(function (button) {
      setOpen(button, false);

      button.addEventListener('click', function () {
        var willOpen = button.getAttribute('aria-expanded') !== 'true';
        buttons.forEach(function (other) { setOpen(other, false); });
        if (willOpen) setOpen(button, true);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Paquetes: reveal una sola vez al entrar en viewport.
     Fail-open — si no hay IntersectionObserver o nunca dispara, un timeout
     muestra las cards igual. La animación nunca puede esconder contenido.
     ------------------------------------------------------------------------ */
  function initPackagesReveal() {
    var grid = document.querySelector('[data-pkg-grid]');
    if (!grid) return;

    var revealed = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      grid.classList.add('is-in');
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            reveal();
            io.disconnect();
            return;
          }
        }
      }, { threshold: 0.05 });

      io.observe(grid);
    }

    window.setTimeout(reveal, PKG_FAIL_OPEN);
  }

  initFaq();
  initPackagesReveal();
})();
