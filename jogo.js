(function () {
  const VERSAO = window.VERSAO_JOGO || "1.0.0";
  const COLUNAS = 20;
  const LINHAS = 14;
  const TICK = 120;
  const DIRECOES = { cima: { x: 0, y: -1 }, baixo: { x: 0, y: 1 }, esquerda: { x: -1, y: 0 }, direita: { x: 1, y: 0 } };
  const OPOSTAS = { cima: "baixo", baixo: "cima", esquerda: "direita", direita: "esquerda" };
  let estado;
  let intervalo;
  let temporizadorFeedback;
  let toqueInicial;
  let perguntasValidas = [];

  function validarPergunta(pergunta) {
    return pergunta && typeof pergunta.q === "string" && pergunta.q.trim() && Array.isArray(pergunta.a) && (pergunta.a.length === 3 || pergunta.a.length === 4) && pergunta.a.every(function (item) { return typeof item === "string" && item.trim(); }) && new Set(pergunta.a).size === pergunta.a.length && typeof pergunta.e === "string" && pergunta.e.trim() && typeof pergunta.m === "string" && pergunta.m.trim();
  }

  function embaralhar(lista) {
    return lista.slice().sort(function () { return Math.random() - 0.5; });
  }

  function compararPosicao(a, b) { return a.x === b.x && a.y === b.y; }
  function ocupado(posicao, snake, itens) { return snake.some(function (parte) { return compararPosicao(parte, posicao); }) || itens.some(function (item) { return compararPosicao(item.posicao, posicao); }); }
  function celulasLivres(snake, itens) { const livres = []; for (let y = 0; y < LINHAS; y += 1) for (let x = 0; x < COLUNAS; x += 1) if (!ocupado({ x: x, y: y }, snake, itens)) livres.push({ x: x, y: y }); return livres; }
  function retirarCelula(livres) { return livres.splice(Math.floor(Math.random() * livres.length), 1)[0]; }
  function criarItens(pergunta, snake) { const alternativas = embaralhar(pergunta.a); const itens = []; const livres = celulasLivres(snake, itens); alternativas.forEach(function (texto) { const posicao = retirarCelula(livres); if (posicao) itens.push({ texto: texto, correta: texto === pergunta.a[0], posicao: posicao }); }); return itens; }
  function novaPergunta() {
    if (estado.usadas.length >= perguntasValidas.length) { estado.usadas = []; estado.contagemMaterias = {}; }
    const disponiveis = perguntasValidas.map(function (pergunta, indice) { return { pergunta: pergunta, indice: indice }; }).filter(function (item) { return !estado.usadas.includes(item.indice); });
    const contagens = disponiveis.map(function (item) { return estado.contagemMaterias[item.pergunta.m] || 0; });
    const menor = Math.min.apply(null, contagens);
    let candidatas = disponiveis.filter(function (item) { return (estado.contagemMaterias[item.pergunta.m] || 0) === menor; });
    const semRepetirMateria = candidatas.filter(function (item) { return item.pergunta.m !== estado.ultimaMateria; });
    if (semRepetirMateria.length) candidatas = semRepetirMateria;
    const escolhida = candidatas[Math.floor(Math.random() * candidatas.length)];
    estado.usadas.push(escolhida.indice);
    estado.ultimaMateria = escolhida.pergunta.m;
    estado.contagemMaterias[escolhida.pergunta.m] = (estado.contagemMaterias[escolhida.pergunta.m] || 0) + 1;
    return escolhida.pergunta;
  }

  function mostrarFeedback(texto, tipo) { estado.feedback = texto; estado.tipoFeedback = tipo || ""; Renderizador.renderizarEstado(estado); }
  function configurarRodada() { estado.perguntaAtual = novaPergunta(); estado.itens = criarItens(estado.perguntaAtual, estado.snake); estado.rodada += 1; estado.feedback = ""; estado.tipoFeedback = ""; Renderizador.renderizarEstado(estado); }
  function iniciarEstado() { estado = { status: "jogando", snake: [{ x: 5, y: 7 }, { x: 4, y: 7 }, { x: 3, y: 7 }], direcao: "direita", proximaDirecao: "direita", perguntaAtual: null, itens: [], pontuacao: 0, vidas: 3, rodada: 0, erros: [], feedback: "", tipoFeedback: "", usadas: [], ultimaMateria: null, contagemMaterias: {}, versao: VERSAO }; configurarRodada(); }

  function direcaoValida(direcao) { return DIRECOES[direcao] && direcao !== OPOSTAS[estado.direcao]; }
  function mudarDirecao(direcao) { if (estado && estado.status === "jogando" && direcaoValida(direcao)) estado.proximaDirecao = direcao; }
  function proximaCabeca() { const movimento = DIRECOES[estado.proximaDirecao]; return { x: estado.snake[0].x + movimento.x, y: estado.snake[0].y + movimento.y }; }
  function colidiu(cabeca) { return cabeca.x < 0 || cabeca.x >= COLUNAS || cabeca.y < 0 || cabeca.y >= LINHAS || estado.snake.some(function (parte, indice) { return indice > 0 && compararPosicao(parte, cabeca); }); }

  function responder(item) {
    if (item.correta) {
      estado.pontuacao += 100;
      estado.snake.push(Object.assign({}, estado.snake[estado.snake.length - 1]));
      AudioJogo.somCorreto();
      estado.status = "pausado";
      mostrarFeedback("ACERTO! " + estado.perguntaAtual.e, "acerto");
      window.clearTimeout(temporizadorFeedback);
      temporizadorFeedback = window.setTimeout(function () { if (estado.status !== "fim") { estado.status = "jogando"; configurarRodada(); } }, 1000);
    } else {
      estado.pontuacao = Math.max(0, estado.pontuacao - 25);
      estado.erros.push({ pergunta: estado.perguntaAtual.q, escolhida: item.texto, correta: estado.perguntaAtual.a[0], explicacao: estado.perguntaAtual.e });
      const livres = celulasLivres(estado.snake, estado.itens.filter(function (outro) { return outro !== item; }));
      item.posicao = livres.length ? retirarCelula(livres) : item.posicao;
      AudioJogo.somErro();
      mostrarFeedback("ERRO! " + estado.perguntaAtual.e, "erro");
    }
  }

  function tick() {
    if (!estado || estado.status !== "jogando") return;
    estado.direcao = estado.proximaDirecao;
    const cabeca = proximaCabeca();
    if (colidiu(cabeca)) { terminar(); return; }
    estado.snake.unshift(cabeca);
    const item = estado.itens.find(function (alternativa) { return compararPosicao(alternativa.posicao, cabeca); });
    if (item) { responder(item); if (!item.correta) estado.snake.pop(); } else { estado.snake.pop(); }
    Renderizador.renderizarEstado(estado);
  }

  function terminar() { estado.status = "fim"; window.clearInterval(intervalo); AudioJogo.pararMusica(); AudioJogo.somFim(); Renderizador.renderizarFim(estado); Renderizador.mostrarTela("fim"); }
  function alternarSom() { const ativo = !AudioJogo.estaAtivo(); AudioJogo.definirAtivo(ativo); Persistencia.salvarSom(ativo); Renderizador.atualizarSom(ativo); if (ativo) AudioJogo.preparar(); }
  function iniciarPartida() { AudioJogo.preparar(); AudioJogo.somInicio(); AudioJogo.iniciarMusica(); iniciarEstado(); Renderizador.mostrarTela("jogo"); window.clearInterval(intervalo); intervalo = window.setInterval(tick, TICK); }
  function lidarTecla(evento) { const mapa = { ArrowUp: "cima", w: "cima", W: "cima", ArrowDown: "baixo", s: "baixo", S: "baixo", ArrowLeft: "esquerda", a: "esquerda", A: "esquerda", ArrowRight: "direita", d: "direita", D: "direita" }; if (evento.key === "m" || evento.key === "M") { alternarSom(); return; } if (mapa[evento.key]) { evento.preventDefault(); mudarDirecao(mapa[evento.key]); } }
  function iniciarToque(evento) { const toque = evento.touches[0]; toqueInicial = { x: toque.clientX, y: toque.clientY }; }
  function finalizarToque(evento) { if (!toqueInicial) return; const toque = evento.changedTouches[0]; const dx = toque.clientX - toqueInicial.x; const dy = toque.clientY - toqueInicial.y; toqueInicial = null; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; if (Math.abs(dx) > Math.abs(dy)) mudarDirecao(dx > 0 ? "direita" : "esquerda"); else mudarDirecao(dy > 0 ? "baixo" : "cima"); }
  function salvarRanking(evento) { evento.preventDefault(); const input = document.getElementById("iniciais"); const resultado = Persistencia.salvarPontuacao(input.value, estado.pontuacao); if (!resultado.salvo) { Renderizador.mostrarAvisoFinal("Digite exatamente tres letras para salvar."); return; } Renderizador.mostrarAvisoFinal(resultado.motivo === "indisponivel" ? "Partida concluida. O ranking nao pode ser persistido neste navegador." : "Pontuacao salva no TOP 10 local!"); Renderizador.renderizarRanking(resultado.ranking, "inicial"); input.value = ""; }
  function preparar() { Renderizador.iniciar(); Renderizador.versao(VERSAO); perguntasValidas = Array.isArray(window.PERGUNTAS) ? window.PERGUNTAS.filter(validarPergunta) : []; const ranking = Persistencia.lerRanking(); const som = Persistencia.lerSom(); AudioJogo.definirAtivo(som); Renderizador.atualizarSom(som); Renderizador.renderizarRanking(ranking, "inicial", Persistencia.lerSom() === som ? "" : "Ranking local indisponivel neste navegador."); if (!perguntasValidas.length) { Renderizador.mostrarAvisoConteudo("Nao foi possivel carregar perguntas validas. Revise o arquivo perguntas.js."); document.getElementById("botao-iniciar").disabled = true; return; } document.getElementById("botao-iniciar").addEventListener("click", iniciarPartida); document.getElementById("botao-jogar-novamente").addEventListener("click", iniciarPartida); document.getElementById("botao-som").addEventListener("click", alternarSom); document.getElementById("form-ranking").addEventListener("submit", salvarRanking); document.addEventListener("keydown", lidarTecla); const tabuleiro = Renderizador.tabuleiroElemento(); tabuleiro.addEventListener("touchstart", iniciarToque, { passive: true }); tabuleiro.addEventListener("touchend", finalizarToque, { passive: true }); }
  function redesenharAoRedimensionar() { if (estado && estado.status === "jogando") Renderizador.renderizarEstado(estado); }
  window.addEventListener("resize", redesenharAoRedimensionar);
  window.addEventListener("orientationchange", redesenharAoRedimensionar);
  window.addEventListener("DOMContentLoaded", preparar);
}());
