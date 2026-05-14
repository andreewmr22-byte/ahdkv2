# Troubleshooting — erro `invalid_workspace_selected` (403)

Se você recebeu a mensagem abaixo no Codex/ChatGPT:

- `unexpected status 403 Forbidden`
- `auth error code: invalid_workspace_selected`
- endpoint `https://chatgpt.com/backend-api/codex/responses`

isso normalmente significa que a sessão está autenticada, mas o **workspace selecionado não é válido** para a conta atual.

## Como corrigir (passo a passo)

1. **Confirme o workspace ativo no ChatGPT**
   - Abra o seletor de workspace (canto superior esquerdo no ChatGPT).
   - Troque para o workspace correto (pessoal ou time que tem acesso ao Codex).

2. **Atualize a sessão de autenticação**
   - Saia da conta e entre novamente.
   - Feche a aba/janela onde o Codex estava aberto e reabra.

3. **Limpe cache/cookies do domínio do ChatGPT**
   - Limpe dados de `chatgpt.com` e `openai.com`.
   - Entre novamente e selecione o workspace antes de testar de novo.

4. **Verifique se a conta tem permissão no workspace**
   - Se for workspace de equipe, peça ao admin para confirmar seu acesso.
   - Em SSO, confirme se você entrou com o provedor/empresa correto.

5. **Desative VPN/proxy temporariamente** (se aplicável)
   - Alguns proxies corporativos causam conflito de sessão.

6. **Teste em janela anônima**
   - Se funcionar no anônimo, o problema costuma ser cookie/sessão local.

## Checklist rápido

- Workspace correto selecionado.
- Conta correta logada.
- Sessão renovada (logout/login).
- Cookies do ChatGPT limpos.
- Permissão confirmada com admin.

## Quando escalar para suporte

Se continuar falhando após os passos acima, envie para suporte:

- `request id` (ex.: `339a044a-355e-44aa-af2d-45e38ca425c2`)
- `cf-ray` (ex.: `9fbba8812be7fbbe-POA`)
- data/hora UTC do erro
- e-mail da conta e nome do workspace selecionado

Esses identificadores ajudam o suporte a localizar exatamente a requisição recusada.

## Correção automática (semi-automática)

Dá para automatizar **parte** da correção: extração de dados do erro e checklist.

```bash
python tools/extract_codex_403_info.py --text "unexpected status 403 Forbidden: {...}"
```

Ou via arquivo:

```bash
cat erro_codex.txt | python tools/extract_codex_403_info.py
```

> Limitação: seleção de workspace, logout/login e limpeza de cookies ainda precisam de ação manual no navegador.
