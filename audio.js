(function () {
  let contexto = null;
  let somAtivo = true;
  let musica = null;

  function preparar() {
    if (!somAtivo) return;
    const AudioContexto = window.AudioContext || window.webkitAudioContext;
    if (!AudioContexto) return;
    if (!contexto) contexto = new AudioContexto();
    if (contexto.state === "suspended") contexto.resume();
  }

  function tom(frequencia, duracao, tipo, atraso, volume) {
    preparar();
    if (!contexto || !somAtivo) return;
    const oscilador = contexto.createOscillator();
    const ganho = contexto.createGain();
    const inicio = contexto.currentTime + (atraso || 0);
    oscilador.type = tipo || "square";
    oscilador.frequency.setValueAtTime(frequencia, inicio);
    ganho.gain.setValueAtTime(volume || 0.035, inicio);
    ganho.gain.exponentialRampToValueAtTime(0.001, inicio + duracao);
    oscilador.connect(ganho).connect(contexto.destination);
    oscilador.start(inicio);
    oscilador.stop(inicio + duracao);
  }

  function somCorreto() { tom(660, .08, "square", 0, .05); tom(990, .12, "square", .08, .05); }
  function somErro() { tom(180, .18, "sawtooth", 0, .04); tom(110, .22, "sawtooth", .12, .04); }
  function somFim() { tom(440, .12, "square", 0, .05); tom(220, .18, "square", .12, .05); tom(90, .3, "sawtooth", .3, .04); }
  function somInicio() { tom(330, .08, "square", 0, .04); tom(520, .1, "square", .09, .04); }

  function iniciarMusica() {
    preparar();
    if (!contexto || !somAtivo || musica) return;
    musica = window.setInterval(function () { tom(110, .06, "triangle", 0, .008); }, 900);
  }

  function pararMusica() { if (musica) { window.clearInterval(musica); musica = null; } }
  function definirAtivo(ativo) { somAtivo = Boolean(ativo); if (!somAtivo) pararMusica(); }
  function estaAtivo() { return somAtivo; }
  window.AudioJogo = { preparar, somCorreto, somErro, somFim, somInicio, iniciarMusica, pararMusica, definirAtivo, estaAtivo };
}());
