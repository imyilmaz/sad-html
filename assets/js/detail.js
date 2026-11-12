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
