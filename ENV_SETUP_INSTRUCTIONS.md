# Configuração de Variáveis de Ambiente

## Como adicionar as variáveis do Supabase no v0

### Passo 1: Abra o painel de Variáveis
1. Clique no ícone de **Vars** na sidebar esquerda do v0
2. Você verá um campo para adicionar variáveis de ambiente

### Passo 2: Adicione as variáveis
Adicione estas duas variáveis exatamente como mostrado:

```
VITE_SUPABASE_URL=https://dnmkemmstpcansztwhso.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1ByaXZhdGUiOmZhbHNlLCJzY29wZSI6InBvc3RncmVzIiwidXNlciI6eyJpZCI6ImFub25fa2V5IiwiZW1haWwiOiJhbm9ueW1vdXNAZXhhbXBsZS5jb20iLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJhbm9uIiwicHJvdmlkZXJzIjpbImFub24iXX0sInVzZXJfbWV0YWRhdGEiOm51bGwsInJvbGUiOiJhbm9uIn19.H3Sj2PKOUXoOeVJXvKMj1cJBXMCKDvKJKjpAZqCvjhs
```

### Passo 3: Salve e reinicie
- Clique para salvar as variáveis
- O servidor dev será reiniciado automaticamente
- Aguarde alguns segundos até a página recarregar

## Verificação

Após adicionar as variáveis:
1. A página inicial deve carregar normalmente
2. Você poderá fazer login/signup clicando no ícone de usuário no header
3. Poderá salvar cartões durante o checkout

## Se ainda não funcionar

Se ver a mensagem "Supabase not configured", abra o console do navegador (F12 ou Ctrl+Shift+I) e procure por logs que comecem com `[v0]` para diagnosticar o problema.
