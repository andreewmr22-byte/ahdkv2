# AHDK AI Studio — Sistema de operação com agentes

## Objetivo

Iniciar o AHDK como um projeto conduzido por agentes de IA, onde o usuário atua como diretor criativo/produto e a IA executa estrutura, design, código, revisão e documentação.

Este documento define o método operacional para evitar bagunça, retrabalho e alterações grandes demais.

## Princípio central

O usuário decide a essência. Os agentes transformam essência em execução.

```txt
Essência -> Produto -> UX/UI -> Frontend -> QA -> Deploy -> Aprovação
```

## Papéis principais

| Agente | Função | Entrega |
|---|---|---|
| Coordenador | Quebra ideias em fases e tarefas | Briefing, backlog, critérios |
| Produto | Define telas, jornada e prioridade | Mapa de experiência |
| Direção Visual | Converte estética em sistema visual | Guia visual e referências |
| UX/UI | Organiza fluxo, clareza e interação | Wireframe e checklist |
| Frontend | Implementa código | HTML, CSS, JS, componentes |
| QA | Testa e critica | Bugs, riscos e prioridade |
| Deploy/Docs | Documenta e prepara publicação | PR, changelog e instruções |

## Fluxo obrigatório

1. Receber direção do usuário em linguagem criativa.
2. Converter em objetivo técnico.
3. Dividir em tarefas pequenas.
4. Executar em branch separada.
5. Revisar com checklist de QA.
6. Abrir PR explicando mudanças.
7. Só depois integrar na branch principal.

## Como o usuário deve comandar

O usuário não precisa escrever pedido técnico. Pode comandar assim:

```txt
Quero que essa tela pareça mais premium, mais direta e com cara de drop exclusivo.
```

O Coordenador deve traduzir para tarefas como:

```txt
- Melhorar hero.
- Criar CTA principal.
- Reorganizar categorias.
- Reduzir ruído visual.
- Garantir leitura mobile.
```

## Fases iniciais

### Fase 0 — Organização dos agentes

- Criar `AGENTS.md`.
- Criar documentos de operação.
- Criar sprint inicial.
- Criar prompts de execução.

### Fase 1 — Home premium

- Reforçar hero.
- Deixar CTA claro.
- Melhorar categorias.
- Destacar drop atual.
- Padronizar cards.
- Revisar mobile.

### Fase 2 — Catálogo claro

- Melhorar filtros.
- Padronizar cards de produto.
- Separar categorias editoriais.
- Simplificar leitura comercial.

### Fase 3 — Bag e atendimento

- Melhorar fluxo da bag.
- Conectar intenção de compra com atendimento.
- Evitar checkout complexo no primeiro momento.

### Fase 4 — Operação simples

- Melhorar edição de catálogo.
- Preparar dados externos se necessário.
- Organizar documentação para manutenção.

## Regras de proteção

- Nada de alteração gigante sem fase.
- Nada de backend antes da validação visual.
- Nada de checkout real antes da jornada estar clara.
- Nada de dependência nova sem justificativa.
- Nada de mexer no deploy principal sem revisão.

## Métrica de aprovação

Uma entrega só é aprovada se:

- O visual parece mais premium.
- O usuário entende onde clicar.
- O mobile está limpo.
- Não há erro crítico no console.
- A identidade AHDK foi preservada.
- A mudança é pequena o suficiente para revisar.