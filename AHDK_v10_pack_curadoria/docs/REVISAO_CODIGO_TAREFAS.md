# Revisão rápida da base e sugestões de tarefas

## 1) Tarefa para corrigir erro de digitação
**Problema encontrado:** no card de estoque, o texto mostra `Baixo estoque`, enquanto em outros pontos do app o padrão é `Estoque baixo`.

- Local: função `stockCheckCard` em `app.js`.
- Impacto: inconsistência de microcopy e ruído de linguagem.

**Tarefa sugerida:**
> Padronizar a string `Baixo estoque` para `Estoque baixo` na função `stockCheckCard`, mantendo o mesmo padrão textual usado no restante do app.

---

## 2) Tarefa para corrigir bug
**Problema encontrado:** em `addProduct()`, o cálculo de `status` usa a variável `stock` original do `prompt`, mas o valor efetivamente salvo pode ser `0` quando o parse falha. Isso pode gerar `status: "OK"` com `stock: 0` (inconsistente).

- Local: função `addProduct` em `app.js`.
- Impacto: item inválido pode entrar no catálogo com estado incorreto.

**Tarefa sugerida:**
> Em `addProduct()`, calcular um `safeStock` (ex.: `const safeStock = Number.isNaN(stock) ? 0 : stock`) e usar `safeStock` tanto no campo `stock` quanto no cálculo de `status`.

---

## 3) Tarefa para ajustar comentário ou discrepância de documentação
**Problema encontrado:** no `README.md`, a seção “Como testar” sugere abrir `index.html` diretamente no navegador. Isso pode funcionar localmente, mas não cobre limitações de ambiente WebView do Telegram nem possíveis políticas de CORS/cache em deploy.

- Local: `README.md`, seção “Como testar”.
- Impacto: documentação incompleta para validar comportamento real do MiniApp.

**Tarefa sugerida:**
> Atualizar o `README.md` para separar: (a) teste local rápido por `index.html`, e (b) teste recomendado em servidor local (por exemplo, `python -m http.server`) e no ambiente Telegram WebApp.

---

## 4) Tarefa para melhorar teste
**Problema encontrado:** não há suíte automatizada para funções críticas de regra de negócio (ex.: limiar de estoque baixo e consistência de status).

- Local: lógica em `app.js` (`isLowStock`, `addProduct`, indicadores de estoque).
- Impacto: regressões silenciosas em comportamento de estoque.

**Tarefa sugerida:**
> Extrair funções puras de estoque para um módulo pequeno (ex.: `stock-utils.js`) e criar testes unitários cobrindo pelo menos:
> 1. `isLowStock` retorna `true` para estoque `<= 10`;
> 2. normalização de estoque inválido para `0`;
> 3. mapeamento de status (`Baixo` vs `OK`) com base em estoque normalizado.
