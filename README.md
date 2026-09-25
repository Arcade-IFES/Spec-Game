# Cobrinha em Movimento

Jogo educativo offline em que a cobrinha deve coletar a alternativa correta de cada pergunta.

O projeto transforma a mecânica clássica do Snake em uma atividade rápida de revisão. Cada rodada apresenta uma questão, distribui as alternativas pelo tabuleiro e mostra uma explicação depois da resposta.

## Objetivo do projeto

O jogo foi criado para apoiar aulas e estudos individuais de conteúdos do ensino médio. O banco atual reúne questões de matemática, física, química, biologia, português, história, geografia, filosofia, inglês, programação, desenvolvimento web, dados, redes e sistemas.

## Requisitos

- Navegador atual para computador ou celular.
- Nenhuma instalação, dependência, conexão ou servidor.
- Execução direta por arquivo, abrindo `index.html`.

## Executar

Abra `index.html` diretamente no navegador. Não é necessário instalar dependências ou iniciar um servidor.

## Jogar

- **Mover:** setas, WASD ou deslize no tabuleiro.
- **Som:** botão `SOM` ou tecla `M`.
- **Acerto:** +100 pontos e a cobrinha cresce.
- **Erro:** -25 pontos, sem pontuação negativa, com explicação da resposta correta.
- **Fim de jogo:** colisão com a borda ou com o próprio corpo.
- **Ranking:** os dez melhores resultados podem ser salvos localmente com três letras.

O som é gerado pelo Web Audio API. A preferência de som e o ranking são armazenados no navegador quando o armazenamento local está disponível; o jogo continua funcionando mesmo sem ele.

## Editar perguntas

Edite somente `perguntas.js`. Cada item deve seguir este formato:

```js
{ q: "Pergunta", a: ["Correta", "Outra", "Outra"], e: "Explicação", m: "materia" }
```

Regras:

- `a` deve ter três ou quatro alternativas.
- A primeira alternativa de `a` é sempre a correta; o jogo embaralha a exibição.
- `e` é mostrada após a resposta.
- `m` identifica a matéria e ajuda a equilibrar o sorteio.
- Mantenha as alternativas curtas para caberem no tabuleiro.

O banco contém 250 questões. Para adicionar uma nova, copie um item existente, mantenha a primeira alternativa como correta e revise a explicação antes de usar o conteúdo em aula.

## Estrutura do projeto

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura das telas, controles e áreas acessíveis. |
| `VERSION` | Versão semântica atual do jogo. |
| `versao.js` | Disponibiliza a versão para a interface. |
| `estilos.css` | Visual retrô, tabuleiro, responsividade e efeitos CRT. |
| `perguntas.js` | Banco de questões editável pelos educadores. |
| `jogo.js` | Estado da partida, movimento, sorteio e colisões. |
| `renderizador.js` | Atualização da interface e do tabuleiro. |
| `audio.js` | Sons e música gerados em tempo real. |
| `persistencia.js` | Ranking local e preferência de som. |
| `tests/logic-tests.html` | Testes rápidos executados diretamente no navegador. |
| `.github/workflows/version-on-commit.yml` | Incremento automático da versão e criação de tags. |

## Documentação Speckit

Os documentos da funcionalidade estão em `specs/001-educational-snake/`:

- `spec.md`: requisitos e cenários de uso.
- `plan.md`: arquitetura e decisões técnicas.
- `data-model.md`: formato dos dados do jogo.
- `quickstart.md`: roteiro completo de validação.
- `tasks.md`: tarefas de implementação e acompanhamento.

## Testar

Abra `tests/logic-tests.html` para executar os testes de banco, colisão, pontuação, direção e iniciais.

## Versionamento automático

A versão atual fica em `VERSION` e segue o formato `MAJOR.MINOR.PATCH`.

Todo push para `main` ou `master` aciona o workflow `.github/workflows/version-on-commit.yml`, que:

1. incrementa o número PATCH;
2. atualiza `versao.js` e este README;
3. cria um commit de release;
4. cria uma tag anotada, como `v1.0.1`.

Alterações MAJOR ou MINOR devem ser feitas manualmente em `VERSION`. O commit automático usa `[skip ci]` para não iniciar outro versionamento.

Versão inicial: **1.0.0**. O conteúdo, a interface e os sons são originais e não usam arquivos externos.