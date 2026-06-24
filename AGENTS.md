# AGENTS.md

## Projeto

Este repositorio contem o app estatico AHDK. A area principal esta em `AHDK_v10_pack_curadoria/`.

Arquivos centrais:
- `AHDK_v10_pack_curadoria/index.html`
- `AHDK_v10_pack_curadoria/homepage.html`
- `AHDK_v10_pack_curadoria/style.css`
- `AHDK_v10_pack_curadoria/app.js`
- `AHDK_v10_pack_curadoria/hardening.css`
- `AHDK_v10_pack_curadoria/hardening.js`

## Regras de trabalho

- Fazer mudancas pequenas e revisaveis.
- Preservar a identidade visual escura, editorial e mobile-first.
- Priorizar estabilidade de interface antes de criar novas funcionalidades.
- Nao remover assets sem conferir referencias em HTML, CSS e JS.
- Nao adicionar dependencia nova sem necessidade clara.
- Manter compatibilidade com deploy estatico no Netlify.

## Checklist de interface

Antes de considerar uma tarefa pronta, validar:
- Inicio, Catalogo, Drops, Colecoes, Atendimento e BAG.
- Menu superior, modal de produto, zoom visual e carrinho.
- Fechamento por botao, backdrop e tecla Escape.
- Layout mobile sem overflow horizontal.
- Botoes visiveis, com texto ou `aria-label`.
- Nenhum elemento invisivel capturando clique.

## Regras contra botoes ghost

- Camadas decorativas, pseudo-elementos, badges e hints devem usar `pointer-events: none` quando nao forem controles.
- Overlays devem capturar clique apenas quando estiverem visiveis e renderizados.
- Elementos ocultos por `opacity: 0`, `visibility: hidden`, `hidden` ou `aria-hidden=true` nao devem aceitar eventos.
- Botoes dentro de cards clicaveis precisam impedir propagacao acidental.
- Preferir `button type="button"` para botoes que nao enviam formulario.

## Validacao sugerida

Como o projeto atual e estatico, validar abrindo `AHDK_v10_pack_curadoria/index.html` localmente e inspecionando console, navegacao e cliques principais.
