# AGENTS.md — AHDK AI Studio

Este arquivo orienta agentes de IA, Codex e revisores humanos ao trabalhar neste repositório.

## Contexto do projeto

AHDK é um MiniApp/experiência web com estética dark, urbana, premium e agressiva. A proposta principal é criar desejo por meio de drops, coleções, catálogo visual e atendimento direto.

O app atual está concentrado principalmente em:

- `AHDK_v10_pack_curadoria/index.html` — estrutura principal.
- `AHDK_v10_pack_curadoria/homepage.html` — página de entrada alternativa.
- `AHDK_v10_pack_curadoria/style.css` — identidade visual, layout e responsividade.
- `AHDK_v10_pack_curadoria/app.js` — navegação, produtos, carrinho/bag, permissões e módulos internos.
- `AHDK_v10_pack_curadoria/hardening.css` — correções de interface e ghost buttons.
- `AHDK_v10_pack_curadoria/hardening.js` — estabilizações de clique, overlay e propagação.
- `AHDK_v10_pack_curadoria/assets/` — imagens.
- `AHDK_v10_pack_curadoria/data/` — exemplos de dados.

## Papel do usuário

O usuário atua como diretor criativo/produto. Ele define essência, estética, prioridade e aprovação. O agente deve traduzir essas decisões em tarefas técnicas pequenas, seguras e revisáveis.

## Regras obrigatórias para agentes

1. Não reescrever o projeto inteiro sem solicitação explícita.
2. Não trocar framework, stack ou estrutura base sem justificar e abrir tarefa separada.
3. Não criar backend, checkout real ou banco de dados sem aprovação explícita.
4. Não alterar a identidade visual central sem explicar o motivo.
5. Priorizar alterações pequenas, rastreáveis e fáceis de revisar.
6. Antes de alterar código, identificar arquivos prováveis e critério de aceite.
7. Após alterar código, explicar arquivos modificados, motivo técnico e como testar.
8. Em frontend, priorizar mobile, performance, legibilidade e clareza comercial.
9. Não inserir dados sensíveis, credenciais, tokens ou números privados no código.
10. Preservar a linguagem pública do app como editorial, premium e comercial.
11. Não remover assets sem conferir referências em HTML, CSS e JS.
12. Manter compatibilidade com deploy estático no Netlify.

## Regras contra botões ghost

- Camadas decorativas, pseudo-elementos, badges e hints devem usar `pointer-events: none` quando não forem controles.
- Overlays devem capturar clique apenas quando estiverem visíveis e renderizados.
- Elementos ocultos por `opacity: 0`, `visibility: hidden`, `hidden` ou `aria-hidden=true` não devem aceitar eventos.
- Botões dentro de cards clicáveis precisam impedir propagação acidental.
- Preferir `button type="button"` para botões que não enviam formulário.

## Checklist de interface

Antes de considerar uma tarefa pronta, validar:
- Início, Catálogo, Drops, Coleções, Atendimento e BAG.
- Menu superior, modal de produto, zoom visual e carrinho.
- Fechamento por botão, backdrop e tecla Escape.
- Layout mobile sem overflow horizontal.
- Botões visíveis, com texto ou `aria-label`.
- Nenhum elemento invisível capturando clique.

## Comandos e validação

Este projeto é uma aplicação estática. Quando não houver `package.json`, validar por inspeção manual e servidor estático local.

Sugestões de validação:

```bash
cd AHDK_v10_pack_curadoria
python3 -m http.server 4173
```

Depois verificar:

- Home carrega sem erro.
- Menu inferior funciona.
- Catálogo abre corretamente.
- Drops e coleções navegam sem quebrar.
- Bag/carrinho não perde estado indevidamente.
- Layout funciona em largura mobile.
- Console do navegador não apresenta erro crítico.

## Estilo de entrega

Toda alteração deve terminar com:

- Resumo do que mudou.
- Arquivos alterados.
- Motivo técnico.
- Como testar.
- Riscos ou pendências.
- Próxima tarefa recomendada.

## Diretriz de produto

AHDK não deve parecer loja genérica. A experiência deve parecer:

- Dark.
- Premium.
- Urbana.
- Forte.
- Editorial.
- Seletiva.
- De drop limitado.

Quando houver dúvida entre complexidade técnica e clareza visual, escolher clareza visual e estabilidade.
