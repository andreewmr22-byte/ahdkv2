# Tarefa Codex - AHDK

Cole ou abra este arquivo no painel Codex do VS Code.

## Contexto

O app principal esta em `AHDK_v10_pack_curadoria/`.
Leia `AGENTS.md` antes de alterar qualquer arquivo.

## Objetivo imediato

Auditar o app AHDK apos a correcao de hardening e estabilizar a interface.

## Tarefas

1. Validar se `hardening.css` e `hardening.js` estao carregando em `index.html` e `homepage.html`.
2. Procurar botoes ghost, overlays invisiveis, hitboxes ocultas, z-index problemático, overflow mobile e propagacao incorreta de cliques.
3. Testar navegacao principal: Inicio, Catalogo, Drops, Colecoes, Atendimento e BAG.
4. Testar menu superior, modal de produto, zoom visual, carrinho, botao de fechar, backdrop e tecla Escape.
5. Corrigir somente o necessario, com menor diff possivel.
6. Preservar identidade visual AHDK, assets existentes e estrutura mobile-first.
7. Ao final, reportar arquivos alterados, problemas encontrados, correcoes aplicadas e riscos restantes.

## Criterios de pronto

- Nenhum elemento invisivel captura clique.
- Botoes dentro de cards nao disparam o card pai por engano.
- Overlays fecham corretamente por botao, backdrop e Escape.
- Layout mobile nao tem overflow horizontal.
- Console sem erros criticos.

## Prompt curto para executar no Codex

Leia AGENTS.md e execute a auditoria de interface em AHDK_v10_pack_curadoria, focando botoes ghost, overlays, z-index, propagacao de eventos e navegacao mobile. Corrija no menor diff possivel e entregue resumo final.
