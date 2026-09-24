(function () {
  'use strict';

  /* ------------------------------------------------------------------
     WhatsApp: troque aqui o número (com 55 + DDD) e as mensagens prontas
     ------------------------------------------------------------------ */
  var WHATSAPP = {
    numero: '554132037293',
    mensagemPadrao: 'Olá! Vim pelo site e gostaria de agendar um horário no Espaço Vip Studio de Beleza.',
    mensagemServico: 'Olá! Vim pelo site e gostaria de agendar um horário para {servico} no Espaço Vip Studio de Beleza.',
    mensagemContato: 'Olá! Vim pelo site do Espaço Vip Studio de Beleza e gostaria de mais informações.'
  };

  document.querySelectorAll('[data-wa]').forEach(function (link) {
    var tipo = link.getAttribute('data-wa');
    var texto = WHATSAPP.mensagemPadrao;
    if (tipo === 'contato') texto = WHATSAPP.mensagemContato;
    else if (tipo) texto = WHATSAPP.mensagemServico.replace('{servico}', tipo.toLowerCase());
    link.href = 'https://wa.me/' + WHATSAPP.numero + '?text=' + encodeURIComponent(texto);
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  /* Header: fica sólido ao rolar */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('is-locked', open);
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && nav.classList.contains('is-open')) setMenu(false);
  });

  /* Link ativo no menu conforme a seção visível */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* Revelar elementos ao rolar (com leve escalonamento entre irmãos) */
  var reveals = document.querySelectorAll('.reveal');
  var groups = new Map();
  reveals.forEach(function (el) {
    var parent = el.parentElement;
    var i = groups.get(parent) || 0;
    el.style.setProperty('--rd', Math.min(i * 0.09, 0.45) + 's');
    groups.set(parent, i + 1);
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Contadores da seção de diferenciais */
  var counters = document.querySelectorAll('[data-count]');
  function formatNumber(value, decimals) {
    return value.toFixed(decimals).replace('.', ',');
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = formatNumber(target * eased, decimals);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* Parallax suave nas imagens de fundo */
  var parallaxImgs = document.querySelectorAll('[data-parallax]');
  if (!reduceMotion && parallaxImgs.length) {
    var ticking = false;
    function updateParallax() {
      var vh = window.innerHeight;
      parallaxImgs.forEach(function (img) {
        var rect = img.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var progress = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height);
        img.style.transform = 'translate3d(0,' + (progress * -14 - 7) + '%,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }

  /* Lightbox da galeria */
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox.querySelector('img');
  var lbCaption = lightbox.querySelector('.lightbox__caption');
  var current = 0;
  var lastFocus = null;

  function show(index) {
    current = (index + items.length) % items.length;
    var item = items[current];
    lbImg.style.visibility = '';
    lbImg.src = item.getAttribute('data-full');
    lbImg.alt = item.querySelector('img').alt;
    lbCaption.textContent = item.getAttribute('data-caption');
  }
  function openLightbox(index) {
    lastFocus = document.activeElement;
    show(index);
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.classList.add('is-locked');
    lightbox.querySelector('.lightbox__close').focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setTimeout(function () { lightbox.hidden = true; }, reduceMotion ? 0 : 400);
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(i); });
  });
  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
  lightbox.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Tab') {
      // mantém o foco dentro do lightbox
      var focusables = lightbox.querySelectorAll('button');
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Swipe no lightbox (celular) */
  var touchX = null;
  lightbox.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* Imagem que falhar ao carregar: esconde e deixa o fundo de reserva elegante */
  document.querySelectorAll('img').forEach(function (img) {
    function hide() { img.style.visibility = 'hidden'; }
    if (img.complete && img.naturalWidth === 0 && img.src) hide();
    img.addEventListener('error', hide);
  });
})();
