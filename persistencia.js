(function () {
  const CHAVE_RANKING = "cobrinha-ranking-v1";
  const CHAVE_SOM = "cobrinha-som-v1";
  let memoriaRanking = [];
  let memoriaSom = true;

  function acessarStorage() {
    try {
      const teste = "__cobrinha_teste__";
      window.localStorage.setItem(teste, "ok");
      window.localStorage.removeItem(teste);
      return window.localStorage;
    } catch (erro) {
      return null;
    }
  }

  function lerRanking() {
    const storage = acessarStorage();
    if (!storage) return memoriaRanking.slice();
    try {
      const dados = JSON.parse(storage.getItem(CHAVE_RANKING) || "[]");
      return Array.isArray(dados) ? dados.filter(validarEntrada).slice(0, 10) : [];
    } catch (erro) {
      return memoriaRanking.slice();
    }
  }

  function validarEntrada(entrada) {
    return entrada && typeof entrada.iniciais === "string" && /^[A-Z]{3}$/.test(entrada.iniciais) && Number.isInteger(entrada.pontuacao) && entrada.pontuacao >= 0;
  }

  function normalizarIniciais(valor) {
    return String(valor || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
  }

  function salvarPontuacao(iniciais, pontuacao) {
    const entrada = { iniciais: normalizarIniciais(iniciais), pontuacao: Math.max(0, Math.floor(pontuacao)), data: new Date().toISOString() };
    if (!validarEntrada(entrada)) return { salvo: false, ranking: lerRanking(), motivo: "iniciais" };
    const ranking = lerRanking().concat(entrada).sort(function (a, b) { return b.pontuacao - a.pontuacao || a.data.localeCompare(b.data); }).slice(0, 10);
    memoriaRanking = ranking.slice();
    const storage = acessarStorage();
    if (!storage) return { salvo: ranking.some(function (item) { return item === entrada; }), ranking: ranking, motivo: "indisponivel" };
    try {
      storage.setItem(CHAVE_RANKING, JSON.stringify(ranking));
      return { salvo: true, ranking: ranking };
    } catch (erro) {
      return { salvo: true, ranking: ranking, motivo: "indisponivel" };
    }
  }

  function lerSom() {
    const storage = acessarStorage();
    if (!storage) return memoriaSom;
    try {
      const salvo = storage.getItem(CHAVE_SOM);
      memoriaSom = salvo === null ? true : salvo !== "false";
    } catch (erro) { return memoriaSom; }
    return memoriaSom;
  }

  function salvarSom(ativo) {
    memoriaSom = Boolean(ativo);
    const storage = acessarStorage();
    if (!storage) return false;
    try { storage.setItem(CHAVE_SOM, String(memoriaSom)); return true; } catch (erro) { return false; }
  }

  window.Persistencia = { lerRanking, salvarPontuacao, normalizarIniciais, lerSom, salvarSom };
}());
