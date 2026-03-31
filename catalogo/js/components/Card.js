import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

// Cria um cartão de filme/série com imagem, trailer e detalhes.
export function createCard(item) {
    // Container do cartão
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Se tiver progresso, adiciona classe para mostrar barra de progresso
    if (item.progress) {
        card.classList.add('has-progress');
    }

    // Elemento de imagem do card
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Movie cover`;

    // iframe para tráiler do YouTube (inicialmente vazio)
    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';

    // Extrai ID do YouTube para usar no embed
    const videoId = getYouTubeId(item.youtube);

    // Insere iframe e imagem no cartão (imagem sobrepõe o iframe)
    card.appendChild(iframe);
    card.appendChild(img);

    // Gera badge de idade aleatória (A16, 16, etc.)
    const ageBadge = getRandomAgeBadge();

    // Bloco de detalhes que aparece ao passar o mouse
    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);

    // Se houver progresso de visualização, exibe barra abaixo do card
    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`; // define largura da barra conforme progresso
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    let playTimeout;

    // Animação de hover: ao entrar, inicia o trailer(do YouTube) com delay e expande card
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // Define origem de escala para evitar corte fora da tela
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing'); // css faz aparecer iframe
            img.classList.add('playing-video'); // css reduz opacidade da imagem
        }, 600); // delay para evitar carregar instantâneo no movimento do mouse
    });

    // Ao sair do hover, parar e resetar o card
    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = ''; // interrompe o vídeo do YouTube
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    // Retorna node completo para ser inserido no DOM pelo Carousel
    return card;
}