'use strict';

(() => {
  const filters = document.querySelector('.vehicle-filters');
  const grid = document.getElementById('vehicle-list-grid');
  if (!filters || !grid) return;
  const buttons = [...filters.querySelectorAll('button[data-category]')];
  const cards = [...grid.querySelectorAll('.vehicle-card[data-category]')];
  const counter = document.getElementById('vehicle-list-count');
  const empty = document.getElementById('vehicle-list-empty');
  let selected = null;

  function updateResults() {
    let visible = 0;
    cards.forEach(card => {
      card.hidden = selected !== null && card.dataset.category !== selected;
      if (!card.hidden) visible++;
    });
    buttons.forEach(button => {
      const active = button.dataset.category === selected;
      button.setAttribute('aria-pressed', String(active));
      const label = button.querySelector('span').textContent;
      button.title = active ? `${label} filtresini kaldır` : label;
    });
    if (counter) counter.textContent = `${visible} araç`;
    if (empty) empty.hidden = visible > 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = selected === button.dataset.category ? null : button.dataset.category;
    updateResults();
  }));
  updateResults();
})();
