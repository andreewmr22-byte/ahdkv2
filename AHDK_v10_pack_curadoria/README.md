# AHDK MiniApp — V10 Concept Pack + Curadoria

Versão interativa do MiniApp AHDK com o novo pack visual de vestuário e uma curadoria mais seletiva de tabacaria.

## Direção desta versão

- Abertura pública em modo **Cliente**.
- Navegação pública: **Início**, **Catálogo**, **Drops**, **Coleções** e **Atendimento**.
- Pack de imagens incorporado ao hero, catálogo, destaques, drops e lookbook.
- Catálogo intercalando vestuário e tabacaria para criar uma leitura mais editorial, menos técnica e mais comercial.
- Linguagem pública focada em roupa, bancada, kit adulto, baixa escala e coleção.
- Gestão e operação continuam disponíveis em perfis internos, mas fora da experiência principal do cliente.

## Como testar

1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Navegue pelo menu inferior.
4. Use o botão do canto superior direito para alternar entre Cliente, Equipe e Gestor, quando precisar validar a parte interna.

## Arquivos principais

- `index.html` — estrutura do app.
- `style.css` — identidade visual, layout, cards, modais e ajustes do pack.
- `app.js` — produtos, navegação, permissões, carrinho, drops e módulos internos.
- `assets/` — imagens usadas pelo app.
- `data/exemplo-produtos.json` — exemplo simples de estrutura de produto.
- `docs/GUIA-EDICAO.md` — guia rápido para editar catálogo, cores e WhatsApp.

## Editar catálogo

Abra `app.js` e procure por:

```js
const products = [
```

Cada produto pode conter imagem, nome, categoria, preço, estoque, descrição, narrativa de edição, material, processo, lote e cuidados.

## WhatsApp

Antes de publicar, altere em `app.js`:

```js
whatsappNumber: "5599999999999"
```

Use o número real com código do país e DDD.
