'use strict';

const container = document.querySelector('#chamados');
const pesquisa = document.querySelector('#pesquisa');
const filtroPrioridade = document.querySelector('#prioridade');
const filtroStatus = document.querySelector('#status');
const contador = document.querySelector('#contador');

function renderizarChamados() {

    const texto = pesquisa.value.toLowerCase();
    const prioridade = filtroPrioridade.value;
    const status = filtroStatus.value;

    const chamadosFiltrados = chamados.filter(chamado => {

        const correspondeNome =
            chamado.usuario.toLowerCase().includes(texto);

        const correspondePrioridade =
            prioridade === '' ||
            chamado.prioridade === prioridade;

        const correspondeStatus =
            status === '' ||
            chamado.status === status;

        return correspondeNome &&
               correspondePrioridade &&
               correspondeStatus;
    });

    container.innerHTML = '';

    contador.textContent =
        `${chamadosFiltrados.length} chamado(s) encontrado(s)`;

    if (chamadosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="sem-resultados">
                <h2>Nenhum chamado encontrado</h2>
                <p>Tente alterar os filtros.</p>
            </div>
        `;

        return;
    }

    chamadosFiltrados.forEach(chamado => {

        const card = document.createElement('article');

        card.className = 'card';

        card.innerHTML = `
            <div class="card-top">
                <span class="id">#${chamado.id}</span>

                <span class="prioridade ${chamado.prioridade
                    .toLowerCase()
                    .replace('í', 'i')}">
                    ${chamado.prioridade}
                </span>
            </div>

            <h2>${chamado.titulo}</h2>

            <p class="usuario">
                👤 ${chamado.usuario}
            </p>

            <div class="card-bottom">

                <span class="status ${chamado.status
                    .toLowerCase()
                    .replace(' ', '-')}">
                    ${chamado.status}
                </span>

            </div>
        `;

        container.appendChild(card);
    });
}

pesquisa.addEventListener('input', renderizarChamados);
filtroPrioridade.addEventListener('change', renderizarChamados);
filtroStatus.addEventListener('change', renderizarChamados);

renderizarChamados();