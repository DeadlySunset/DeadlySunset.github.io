const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBP2fk_hJAU7u0OSQmnrfo5BTvjtHbscr0a49tgqEC9lo7c7xNSwyo6Qov5DfAPFqm36NVmr12XN8w/pubhtml';

function showInfo(data) {
  const grouped = {};

  data.forEach(item => {
    const category = item['Категория']?.trim() || 'Без категории';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(item);
  });

  const container = document.getElementById('menu-cards');
  container.innerHTML = '';

  for (const category in grouped) {
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-md-6 col-sm-12 mb-4';

    let inner = `
      <div class="card h-100 shadow-sm p-3">
        <div class="card-body">
          <h5 class="card-title fw-bold mb-3" style="font-size: 22px;">${category}</h5>
    `;

    grouped[category].forEach(entry => {
      const title = (entry['Название'] || '').trim();
      const price = (entry['Цена'] || '').trim();
      let description = (entry['Описание'] || '').trim();

      // Поддержка переноса строк (если он в ячейке)
      description = description.replace(/\n/g, '<br>');

      inner += `
        <div class="mb-3">
          <div style="font-size: 20px; font-weight: 500; display: inline;">${title}</div>
          <span style="font-size: 20px; font-weight: 700;"> — ${price}</span>
          ${description ? `<div style="font-size: 18px; font-weight: 300; margin-top: 2px;">${description}</div>` : ''}
        </div>
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
