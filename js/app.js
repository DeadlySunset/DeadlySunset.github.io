const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBP2fk_hJAU7u0OSQmnrfo5BTvjtHbscr0a49tgqEC9lo7c7xNSwyo6Qov5DfAPFqm36NVmr12XN8w/pubhtml';

function showInfo(data) {
  const grouped = {};

  data.forEach(item => {
    const category = item['Категория'] || 'Без категории';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(item);
  });

  const container = document.getElementById('menu-cards');

  for (const category in grouped) {
    const card = document.createElement('div');
    card.className = 'col-md-6 mb-4';

    let inner = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">🍽️ ${category}</h5>
    `;

    grouped[category].forEach(entry => {
      inner += `
        <h5 class="card-title">${entry['Название']} — ${entry['Цена']}</h5>
        ${entry['Описание'] ? `<p class="card-text">${entry['Описание']}</p>` : ''}
      `;
    });

    inner += `</div></div>`;
    card.innerHTML = inner;
    container.appendChild(card);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
});
