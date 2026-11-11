'use strict';

(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('#site-menu');
  const toggles = [...document.querySelectorAll('.menu-toggle')];
  const overlay = document.querySelector('.menu-overlay');
  const main = document.querySelector('main');
  const footer = document.querySelector('.site-footer');
  const brand = document.querySelector('.site-header__inner > .site-header__brand');
  let compact = false;
  let open = false;
  let minimumWidth = 0;

  function setOpen(value, restoreFocus = true) {
    open = compact && value;
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggles.forEach(button => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    });
    menu.inert = compact && !open;
    main.inert = open;
    if (footer) footer.inert = open;
    brand.inert = open;
    toggles[0].inert = open;
    if (open) {
      menu.setAttribute('role', 'dialog');
      menu.setAttribute('aria-modal', 'true');
      menu.setAttribute('aria-label', 'Ana menü');
      toggles[1].focus({ preventScroll: true });
    } else {
      menu.removeAttribute('role');
      menu.removeAttribute('aria-modal');
      menu.removeAttribute('aria-label');
      if (compact && restoreFocus) toggles[0].focus({ preventScroll: true });
    }
  }

  function measureNavigation() {
    // Measure natural desktop widths even while the visible menu is vertical.
    const probe = document.createElement('div');
    probe.className = 'site-header';
    Object.assign(probe.style, { position: 'fixed', left: '-10000px', visibility: 'hidden', pointerEvents: 'none' });
    probe.setAttribute('aria-hidden', 'true');
    probe.inert = true;
    const left = header.querySelector('.site-header__primary').cloneNode(true);
    const right = header.querySelector('.site-header__right').cloneNode(true);
    probe.append(left, right);
    document.body.append(probe);
    minimumWidth = Math.max(left.getBoundingClientRect().width, right.getBoundingClientRect().width) * 2 + 150 + 64;
    probe.remove();
    updateLayout();
  }

  function updateLayout() {
    const next = header.querySelector('.site-header__inner').clientWidth < minimumWidth;
    if (next === compact) return;
    compact = next;
    header.classList.toggle('is-compact', compact);
    setOpen(false, false);
    if (!compact && (menu.contains(document.activeElement) || toggles.includes(document.activeElement))) brand.focus({ preventScroll: true });
  }

  toggles.forEach(button => button.addEventListener('click', () => setOpen(!open)));
  overlay.addEventListener('click', () => setOpen(false));
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false, false);
  });
  document.addEventListener('keydown', event => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  measureNavigation();
  document.fonts.ready.then(measureNavigation);
  new ResizeObserver(updateLayout).observe(header.querySelector('.site-header__inner'));

  const slider = document.querySelector('.hero__slider');
  if (slider && typeof Swiper !== 'undefined') {
    new Swiper(slider, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650,
      slidesPerView: 1,
      parallax: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      grabCursor: true,
      keyboard: { enabled: true, onlyInViewport: true },
      pagination: {
        el: '.hero__pagination',
        clickable: true,
        renderBullet(index, className) {
          return `<button type="button" class="${className}" aria-label="${index + 1}. slayta git"></button>`;
        }
      },
      a11y: {
        enabled: true,
        containerMessage: 'Sıfır araç fırsatları',
        containerRoleDescriptionMessage: 'Slayt gösterisi',
        itemRoleDescriptionMessage: 'Slayt',
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        paginationBulletMessage: '{{index}}. slayta git'
      }
    });
  }
  const vehicleSlider = document.querySelector('.vehicle-offers__slider');
  if (vehicleSlider && typeof Swiper !== 'undefined') {
    new Swiper(vehicleSlider, {
      slidesPerView: 1,
      spaceBetween: 4,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500,
      breakpointsBase: 'container',
      // Each card needs 320px: 2 × 320 + 4px gap; 3 × 320 + 8px gaps.
      breakpoints: { 644: { slidesPerView: 2 }, 968: { slidesPerView: 3 } },
      watchOverflow: true,
      navigation: { prevEl: '.vehicle-offers__prev', nextEl: '.vehicle-offers__next' },
      a11y: {
        enabled: true,
        containerMessage: 'Avantajlı araç fırsatları',
        prevSlideMessage: 'Önceki araç',
        nextSlideMessage: 'Sonraki araç',
        slideLabelMessage: '{{index}} / {{slidesLength}}'
      }
    });
  }

  // All cards are server-readable HTML; tabs only switch panel visibility.
  document.querySelectorAll('.brand-tabs').forEach(tabList => {
    const tabs = [...tabList.querySelectorAll('[role="tab"]')];
    function activateTab(tab, moveFocus = false) {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
      if (moveFocus) tab.focus({ preventScroll: true });
      // Scroll only the logo strip; do not move the page vertically.
      const left = tab.offsetLeft;
      const right = left + tab.offsetWidth;
      if (left < tabList.scrollLeft) tabList.scrollLeft = left;
      else if (right > tabList.scrollLeft + tabList.clientWidth) tabList.scrollLeft = right - tabList.clientWidth;
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activateTab(tabs[next], true);
      });
    });
  });

  const weeklySlider = document.querySelector('.weekly-offer__slider');
  if (weeklySlider && typeof Swiper !== 'undefined') {
    function updateWeeklyFocus(swiper) {
      swiper.slides.forEach((slide, index) => {
        const active = index === swiper.activeIndex;
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
      });
    }
    new Swiper(weeklySlider, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      slidesPerView: 1,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650,
      parallax: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      grabCursor: true,
      keyboard: { enabled: true, onlyInViewport: true },
      pagination: {
        el: weeklySlider.querySelector('.weekly-offer__pagination'),
        clickable: true,
        renderBullet(index, className) {
          return `<button type="button" class="${className}" aria-label="${index + 1}. fırsata git"></button>`;
        }
      },
      a11y: {
        enabled: true,
        containerMessage: 'Haftanın avantajlı araçları',
        itemRoleDescriptionMessage: 'Slayt',
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        paginationBulletMessage: '{{index}}. fırsata git'
      },
      on: { init: updateWeeklyFocus, slideChange: updateWeeklyFocus, loopFix: updateWeeklyFocus }
    });
  }
})();
