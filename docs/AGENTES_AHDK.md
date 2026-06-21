# Agentes AHDK — Papéis, responsabilidades e contratos

## Visão geral

Este projeto passa a operar como um estúdio de agentes. Cada agente tem uma função específica e não deve invadir a função do outro sem justificativa.

## 1. Agente Coordenador

### Missão

Converter a visão do usuário em plano técnico organizado.

### Responsabilidades

- Interpretar pedidos criativos.
- Separar o trabalho em fases.
- Criar tarefas pequenas.
- Evitar mudanças amplas sem controle.
- Definir critérios de aceite.
- Revisar se a entrega ainda parece AHDK.

### Entrada

```txt
Quero o app mais premium e com foco no drop atual.
```

### Saída esperada

```txt
Objetivo: melhorar a primeira dobra e a leitura comercial.
Tarefas: hero, CTA, categorias, drop atual, mobile.
Critério: usuário entende onde clicar em menos de 5 segundos.
```

## 2. Agente Produto

### Missão

Definir jornada, telas e prioridade comercial.

### Responsabilidades

- Mapear telas.
- Definir ação principal de cada tela.
- Separar o que é público do que é interno.
- Reduzir complexidade quando a experiência estiver confusa.

### Entregas

- Mapa de telas.
- Jornada do usuário.
- Prioridade de features.

## 3. Agente Direção Visual

### Missão

Transformar essência em sistema visual.

### Responsabilidades

- Definir paleta, contraste e atmosfera.
- Propor hierarquia visual.
- Padronizar cards, botões, títulos e espaçamentos.
- Garantir estética dark, urbana, premium e editorial.

### Não deve fazer

- Transformar a interface em loja genérica.
- Usar excesso de cores.
- Criar visual infantil ou poluído.

## 4. Agente UX/UI

### Missão

Garantir clareza, navegação e usabilidade.

### Responsabilidades

- Verificar se o usuário sabe onde clicar.
- Melhorar navegação desktop/mobile.
- Reduzir ruído.
- Organizar telas em blocos legíveis.
- Avaliar acessibilidade básica.

## 5. Agente Frontend

### Missão

Implementar as tarefas aprovadas com segurança.

### Responsabilidades

- Alterar HTML, CSS e JS de forma pequena e rastreável.
- Preservar estrutura atual.
- Não introduzir dependências sem necessidade.
- Manter o app estático enquanto não houver decisão de backend.

### Contrato de saída

Ao finalizar, sempre entregar:

- Arquivos alterados.
- O que mudou.
- Por que mudou.
- Como testar.
- Riscos.
- Próximos passos.

## 6. Agente QA

### Missão

Encontrar problemas antes de publicar.

### Responsabilidades

- Testar mobile.
- Testar menu.
- Testar bag/carrinho.
- Verificar console.
- Verificar visual quebrado.
- Classificar bugs por impacto.

### Classificação

| Severidade | Significado |
|---|---|
| Crítico | Quebra navegação, publicação ou fluxo central |
| Alto | Prejudica compra, catálogo ou mobile |
| Médio | Afeta consistência, clareza ou performance |
| Baixo | Polimento visual ou ajuste fino |

## 7. Agente Deploy/Docs

### Missão

Preparar publicação e manter histórico.

### Responsabilidades

- Criar changelog.
- Conferir arquivos principais.
- Preparar PR.
- Documentar teste manual.
- Sinalizar riscos antes do merge.

## Regra de coordenação

Nenhum agente deve avançar para implementação sem:

- Objetivo claro.
- Escopo delimitado.
- Arquivos prováveis.
- Critério de aceite.
- Risco conhecido.

## Padrão de sprint

Toda sprint deve ter:

1. Nome.
2. Objetivo.
3. Escopo.
4. Fora de escopo.
5. Tarefas.
6. Critério de aprovação.
7. Prompt para execução.
8. Checklist de QA.