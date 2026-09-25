(function () {
  const COLUNAS = 20;
  const LINHAS = 14;
  const elementos = {};

  function iniciar() {
    elementos.telas = { inicio: document.getElementById("tela-inicial"), jogo: document.getElementById("tela-jogo"), fim: document.getElementById("tela-fim") };
    elementos.tabuleiro = document.getElementById("tabuleiro");
    elementos.pergunta = document.getElementById("pergunta");
    elementos.feedback = document.getElementById("feedback");
    elementos.placar = document.getElementById("placar");
    elementos.vidas = document.getElementById("vidas");
    elementos.rodada = document.getElementById("rodada");
    elementos.pontuacaoFinal = document.getElementById("pontuacao-final");
    elementos.listaErros = document.getElementById("lista-erros");
    elementos.botaoSom = document.getElementById("botao-som");
    elementos.avisoConteudo = document.getElementById("aviso-conteudo");
    elementos.avisoRankingInicial = document.getElementById("aviso-ranking-inicial");
    elementos.avisoRankingFim = document.getElementById("aviso-ranking-fim");
    elementos.listaRankingInicial = document.getElementById("lista-ranking-inicial");
    criarCelulas();
  }

  function criarCelulas() {
    elementos.tabuleiro.innerHTML = "";
    for (let y = 0; y < LINHAS; y += 1) {
      for (let x = 0; x < COLUNAS; x += 1) {
        const celula = document.createElement("div");
        celula.className = "celula";
        celula.dataset.x = x;
        celula.dataset.y = y;
        celula.setAttribute("aria-hidden", "true");
        elementos.tabuleiro.appendChild(celula);
      }
    }
  }

  function celula(x, y) { return elementos.tabuleiro.querySelector('[data-x="' + x + '"][data-y="' + y + '"]'); }
  function mostrarTela(nome) { Object.keys(elementos.telas).forEach(function (chave) { elementos.telas[chave].classList.toggle("tela-ativa", chave === nome); }); }
  function formatarPontos(pontos) { return String(Math.max(0, pontos)).padStart(4, "0"); }

  function renderizarEstado(estado) {
    elementos.pergunta.textContent = estado.perguntaAtual ? estado.perguntaAtual.q : "Preparando proxima pergunta...";
    elementos.placar.textContent = formatarPontos(estado.pontuacao);
    elementos.vidas.textContent = estado.vidas;
    elementos.rodada.textContent = String(estado.rodada).padStart(2, "0");
    elementos.feedback.textContent = estado.feedback || "";
    elementos.feedback.className = "feedback" + (estado.tipoFeedback ? " " + estado.tipoFeedback : "");
    desenharTabuleiro(estado);
  }

  function desenharTabuleiro(estado) {
    Array.from(elementos.tabuleiro.children).forEach(function (item) { item.className = "celula"; item.textContent = ""; item.removeAttribute("aria-label"); item.setAttribute("aria-hidden", "true"); });
    estado.itens.forEach(function (item) {
      const alvo = celula(item.posicao.x, item.posicao.y);
      if (!alvo) return;
      alvo.className = "celula resposta" + (item.correta ? " resposta-correta" : "");
      alvo.textContent = item.texto;
      alvo.setAttribute("aria-label", "Alternativa: " + item.texto);
      alvo.setAttribute("aria-hidden", "false");
    });
    estado.snake.forEach(function (parte, indice) {
      const alvo = celula(parte.x, parte.y);
      if (!alvo) return;
      alvo.className = "celula cobra" + (indice === 0 ? " cabeca" : "");
      alvo.setAttribute("aria-label", indice === 0 ? "Cabeca da cobrinha" : "Corpo da cobrinha");
      alvo.setAttribute("aria-hidden", "false");
    });
  }

  function renderizarRanking(lista, seletor, aviso) {
    const destino = seletor === "inicial" ? elementos.listaRankingInicial : null;
    if (!destino) return;
    destino.innerHTML = "";
    if (!lista.length) { destino.innerHTML = "<li>AINDA SEM JOGADAS</li>"; }
    lista.forEach(function (entrada) { const item = document.createElement("li"); item.innerHTML = "<span>" + entrada.iniciais + "</span><strong>" + formatarPontos(entrada.pontuacao) + "</strong>"; destino.appendChild(item); });
    elementos.avisoRankingInicial.hidden = !aviso;
    elementos.avisoRankingInicial.textContent = aviso || "";
  }

  function renderizarFim(estado) {
    elementos.pontuacaoFinal.textContent = formatarPontos(estado.pontuacao);
    elementos.listaErros.innerHTML = "";
    if (!estado.erros.length) { elementos.listaErros.innerHTML = "<p class=\"sem-erros\">Nenhum erro registrado. Excelente leitura do corpo!</p>"; return; }
    estado.erros.forEach(function (erro, indice) {
      const bloco = document.createElement("article");
      bloco.className = "erro-item";
      bloco.innerHTML = "<strong>" + (indice + 1) + ". " + erro.pergunta + "</strong><br>Voce pegou: " + erro.escolhida + "<br>Resposta certa: " + erro.correta + "<br><span>Aprenda: " + erro.explicacao + "</span>";
      elementos.listaErros.appendChild(bloco);
    });
  }

  function atualizarSom(ativo) { elementos.botaoSom.textContent = ativo ? "SOM: ON" : "SOM: OFF"; elementos.botaoSom.setAttribute("aria-pressed", String(ativo)); elementos.botaoSom.setAttribute("aria-label", ativo ? "Desativar som" : "Ativar som"); }
  function mostrarAvisoConteudo(texto) { elementos.avisoConteudo.hidden = !texto; elementos.avisoConteudo.textContent = texto || ""; }
  function mostrarAvisoFinal(texto) { elementos.avisoRankingFim.hidden = !texto; elementos.avisoRankingFim.textContent = texto || ""; }
  function tabuleiroElemento() { return elementos.tabuleiro; }
  function versao(texto) { document.querySelectorAll("[data-versao]").forEach(function (item) { item.textContent = texto; }); }

  window.Renderizador = { iniciar, mostrarTela, renderizarEstado, renderizarRanking, renderizarFim, atualizarSom, mostrarAvisoConteudo, mostrarAvisoFinal, tabuleiroElemento, versao };
}());
