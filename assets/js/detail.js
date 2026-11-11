'use strict';

(() => {
  const gallery = document.querySelector('.detail-gallery__swiper');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (gallery && typeof Swiper !== 'undefined') {
    function updateGalleryFocus(swiper) {
      swiper.slides.forEach((slide, index) => {
        const active = index === swiper.activeIndex;
        slide.inert = !active;
        slide.setAttribute('aria-hidden', String(!active));
      });
    }
    new Swiper(gallery, {
      slidesPerView: 1,
      rewind: true,
      speed: reducedMotion ? 0 : 500,
      pagination: {
        el: document.querySelector('.detail-gallery__pagination'),
        clickable: true,
        renderBullet(index, className) {
          return `<button class="${className}" type="button" aria-label="${index + 1}. fotoğrafı göster"></button>`;
        }
      },

      a11y: {
        enabled: true,
        containerMessage: 'Opel Grandland fotoğrafları',
        prevSlideMessage: 'Önceki fotoğraf',
        nextSlideMessage: 'Sonraki fotoğraf',
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        paginationBulletMessage: '{{index}}. fotoğrafı göster'
      },
      on: { init: updateGalleryFocus, slideChange: updateGalleryFocus }
    });
  }
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox]', {
      ...(Fancybox.l10n?.tr_TR ? { l10n: Fancybox.l10n.tr_TR } : {}),
      fadeEffect: !reducedMotion,
      Carousel: { Video: { autoplay: false } }
    });
  }
})();
