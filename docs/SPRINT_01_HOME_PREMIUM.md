# Sprint 01 — Home premium e navegação clara

## Status

Pronta para execução por agente frontend/Codex.

## Objetivo

Transformar a primeira experiência do AHDK em uma home mais premium, clara e orientada para ação, sem reescrever o projeto inteiro.

## Escopo permitido

Arquivos prováveis:

- `AHDK_v10_pack_curadoria/index.html`
- `AHDK_v10_pack_curadoria/style.css`
- `AHDK_v10_pack_curadoria/app.js`
- `AHDK_v10_pack_curadoria/assets/`

## Fora de escopo

- Criar backend.
- Criar checkout real.
- Trocar stack.
- Remover módulos internos.
- Reescrever todo o app.
- Alterar a proposta central da marca.

## Tarefas

### 1. Hero principal

- Reforçar título e subtítulo.
- Garantir CTA principal visível.
- Melhorar leitura da primeira dobra.
- Manter estética dark/premium/agressiva.

Critério de aceite:

- Em até 5 segundos, o visitante entende que pode explorar catálogo/drop.

### 2. CTA principal

Adicionar ou reforçar ação principal:

```txt
Explorar catálogo
Ver drop atual
Chamar atendimento
```

Critério de aceite:

- Existe uma ação principal clara na primeira tela.

### 3. Categorias

Organizar blocos de categorias para leitura rápida.

Possíveis categorias públicas:

- Vestuário.
- Acessórios.
- Drops.
- Coleções.
- Atendimento.

Critério de aceite:

- As categorias são compreensíveis sem explicação.

### 4. Drop atual

Criar ou fortalecer uma área de destaque para o drop atual.

Critério de aceite:

- O drop atual aparece como seção editorial, não como lista comum.

### 5. Cards de destaque

Padronizar cards com:

- Imagem.
- Nome.
- Categoria/status.
- Ação.

Critério de aceite:

- Cards parecem parte do mesmo sistema visual.

### 6. Mobile

Revisar:

- Menu inferior.
- Espaçamento.
- Tamanho dos botões.
- Quebras de texto.
- Área da bag/carrinho.

Critério de aceite:

- A navegação mobile está limpa e não esmaga informações principais.

## Checklist de QA

- [ ] Home carrega.
- [ ] Menu inferior funciona.
- [ ] Catálogo abre.
- [ ] Drops abre.
- [ ] Coleções abre.
- [ ] Atendimento abre.
- [ ] Bag/carrinho continua funcional.
- [ ] Mobile não tem overflow horizontal.
- [ ] Console sem erro crítico.
- [ ] Identidade visual foi preservada.

## Prompt de execução para Codex

```txt
Você é o Agente Frontend do projeto AHDK.

Execute somente a Sprint 01: Home premium e navegação clara.

Contexto:
AHDK é uma experiência web/miniapp com estética dark, urbana, premium e agressiva. O usuário é diretor criativo e quer comandar pela essência, não por detalhes técnicos.

Objetivo:
Melhorar a primeira experiência do app sem reescrever a arquitetura.

Tarefas:
1. Reforçar hero principal.
2. Garantir CTA principal claro.
3. Organizar categorias públicas.
4. Destacar drop atual.
5. Padronizar cards de destaque.
6. Revisar mobile e menu inferior.
7. Preservar bag/carrinho e módulos existentes.

Restrições:
- Não criar backend.
- Não trocar framework.
- Não remover funcionalidades existentes.
- Não alterar a essência dark/premium/agressiva.
- Não inserir dependências desnecessárias.
- Fazer mudanças pequenas e revisáveis.

Ao final, entregue:
- Arquivos alterados.
- Resumo das mudanças.
- Motivo técnico de cada mudança.
- Como testar.
- Riscos ou pendências.
```

## Decisão pendente do diretor criativo

Antes da execução visual final, o usuário deve escolher o CTA prioritário:

1. `Explorar catálogo`
2. `Ver drop atual`
3. `Chamar atendimento`

Recomendação inicial: `Explorar catálogo`, por ser mais amplo e comercial.