# Guia de edição — AHDK MiniApp

## Identidade visual

No arquivo `style.css`, procure por:

```css
:root
```

Ali ficam as cores principais do app.

## Catálogo

No arquivo `app.js`, procure por:

```js
const products = [
```

Cada produto possui:

- `image`
- `name`
- `category`
- `price`
- `stock`
- `status`
- `description`

## Avisos / Drops

No arquivo `app.js`, procure por:

```js
const notices = [
```

## Permissões

No arquivo `app.js`, procure por:

```js
const permissions = {
```

## WhatsApp

No arquivo `app.js`, procure por:

```js
whatsappNumber
```

Troque pelo número real com país e DDD.
