import { createCard } from './Card.js';

// Cria um carrossel completo para uma categoria (ex: Filmes, Séries, Para maratonar)
export function createCarousel(category) {
    // Seção principal do carrossel
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Cabeçalho com título e indicadores visuais
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title; // texto vem do objeto category.title

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    // Adiciona título e indicadores ao cabeçalho
    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Linha de cards (filmes/séries)
    const row = document.createElement('div');
    row.className = 'movie-row';

    // Cria um card para cada item da categoria
    category.items.forEach(item => {
        const card = createCard(item); // cada card é criado em Card.js
        row.appendChild(card);
    });

    // Controles de carrossel para avançar e voltar
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-control carousel-control-prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.setAttribute('aria-label', 'Voltar');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-control carousel-control-next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.setAttribute('aria-label', 'Avançar');

    const getScrollStep = () => {
        // Assume 3 cards por passo; cada card tem 250px + gap 8px
        // 3 * 250 + 2 * 8 (gaps) = 774px
        // Ajuste se você alterar a largura dos cards ou o gap.
        return 3 * 250 + 2 * 8;
    };

    prevBtn.addEventListener('click', () => {
        row.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        row.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    // Adiciona os elementos na ordem correta
    section.appendChild(prevBtn);
    section.appendChild(nextBtn);
    section.appendChild(row);
    return section;
}
