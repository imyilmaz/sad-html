'use strict';

(() => {
  const requestedVehicle = new URLSearchParams(window.location.search).get('arac');
  const vehicle = window.siteVehicles?.find(item => item.id === requestedVehicle);
  if (vehicle) {
    document.querySelector('#vehicle-title').textContent = vehicle.name;
    document.querySelector('[data-vehicle-field="color"]').textContent = vehicle.color;
    document.querySelector('[data-vehicle-contact]').href = `contact.html?arac=${encodeURIComponent(vehicle.id)}`;
    document.title = `${vehicle.name} Araç Fotoğrafları | Sıfır Araç Danışmanı`;
    document.querySelector('meta[name="description"]').content = `${vehicle.name} fotoğraflarını inceleyin. Güncel özellikler, fiyat ve satın alma koşulları için bilgi alın.`;
    const gallerySection = document.querySelector('.detail-gallery');
    gallerySection.setAttribute('aria-label', `${vehicle.name} fotoğraf galerisi`);
    const wrapper = gallerySection.querySelector('.swiper-wrapper');
    wrapper.replaceChildren(...vehicle.photos.map((photo, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      const link = document.createElement('a');
      link.className = 'detail-gallery__image-link';
      link.href = photo;
      link.dataset.fancybox = 'vehicle-gallery';
      link.dataset.caption = `${vehicle.name} – fotoğraf ${index + 1}`;
      link.setAttribute('aria-label', `${index + 1}. araç fotoğrafını büyüt`);
      const image = document.createElement('img');
      image.src = photo;
      image.alt = `${vehicle.color} ${vehicle.name} – görünüm ${index + 1}`;
      image.width = 800; image.height = 600;
      image.decoding = 'async';
      if (index) image.loading = 'lazy';
      else image.fetchPriority = 'high';
      link.append(image); slide.append(link);
      return slide;
    }));
  }
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
      navigation: { prevEl: '.detail-gallery__prev', nextEl: '.detail-gallery__next' },
      pagination: {
        el: document.querySelector('.detail-gallery__pagination'),
        clickable: true,
        renderBullet(index, className) {
          return `<button class="${className}" type="button" aria-label="${index + 1}. fotoğrafı göster"></button>`;
        }
      },

      a11y: {
        enabled: true,
        containerMessage: vehicle ? `${vehicle.name} fotoğrafları` : 'Renault Clio fotoğrafları',
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

  document.querySelectorAll('.detail-faq__questions').forEach((group, groupIndex) => {
    const questions = [...group.querySelectorAll('.detail-faq__item')].map((item, index) => {
      const toggle = item.querySelector('.detail-faq__toggle');
      const answer = item.querySelector('.detail-faq__answer');
      answer.id = `detail-faq-answer-${groupIndex}-${index}`;
      toggle.setAttribute('aria-controls', answer.id);
      return { toggle, answer, expanded: false, frame: null };
    });

    function setExpanded(question, expanded) {
      const { toggle, answer } = question;
      const from = answer.hidden ? 0 : answer.getBoundingClientRect().height;
      cancelAnimationFrame(question.frame);
      question.expanded = expanded;
      toggle.setAttribute('aria-expanded', String(expanded));
      if (!expanded && answer.contains(document.activeElement)) toggle.focus();
      answer.inert = !expanded;
      answer.style.height = `${from}px`;
      answer.style.overflow = 'hidden';
      answer.hidden = false;
      const to = expanded ? answer.scrollHeight : 0;
      const duration = reducedMotion ? 0 : 350;
      let started;
      function step(now) {
        started ??= now;
        const progress = duration ? Math.min((now - started) / duration, 1) : 1;
        const eased = 1 - Math.pow(1 - progress, 3);
        answer.style.height = `${from + (to - from) * eased}px`;
        if (progress < 1) {
          question.frame = requestAnimationFrame(step);
        } else {
          answer.hidden = !expanded;
          answer.style.height = '';
          answer.style.overflow = '';
          question.frame = null;
        }
      }
      question.frame = requestAnimationFrame(step);
    }

    questions.forEach(question => question.toggle.addEventListener('click', () => {
      const expand = !question.expanded;
      if (expand) questions.forEach(other => {
        if (other !== question && other.expanded) setExpanded(other, false);
      });
      setExpanded(question, expand);
    }));
  });
})();
