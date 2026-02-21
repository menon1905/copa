# Integração Supabase - Guia de Configuração

## 1. Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente no painel Vars do v0:

```
VITE_SUPABASE_URL=<sua_url_supabase>
VITE_SUPABASE_ANON_KEY=<sua_chave_anonima>
```

Você pode encontrar esses valores no dashboard do Supabase:
- URL: Vá para Project Settings > API > Project URL
- Anon Key: Vá para Project Settings > API > anon (public) key

## 2. Tabelas no Banco de Dados

As seguintes tabelas foram criadas automaticamente:

### `public.profiles`
- `id` (UUID) - Referencia `auth.users(id)`
- `email` (TEXT)
- `display_name` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**RLS Policies:**
- Usuários só podem ver/editar seus próprios dados

### `public.payment_cards`
- `id` (UUID)
- `user_id` (UUID) - Referencia `auth.users(id)`
- `card_number` (TEXT)
- `card_holder` (TEXT)
- `expiry_month` (INTEGER)
- `expiry_year` (INTEGER)
- `cvv` (TEXT)
- `is_default` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**RLS Policies:**
- Usuários só podem ver/editar seus próprios cartões

## 3. Fluxo de Funcionamento

### Login/Signup
1. Usuário acessa `/login`
2. Preenche email e senha
3. Supabase autentica o usuário e cria/retorna perfil
4. Sessão é mantida no contexto AuthContext

### Checkout com Cartões
1. Usuário faz login
2. Vai para checkout
3. Na seção de pagamento por cartão de crédito:
   - Vê cartões salvos anteriormente
   - Pode adicionar novo cartão
   - Cartões são salvos na tabela `payment_cards`
   - Números são mascarados por segurança (mostra últimos 4 dígitos)

## 4. Segurança

- **Row Level Security (RLS)** protege todos os dados
- **Senhas** são gerenciadas e encriptadas pelo Supabase Auth
- **Números de cartão** nunca são expostos no frontend (apenas últimos 4 dígitos)
- **Sessão** é automaticamente gerenciada pelo Supabase

## 5. Troubleshooting

### Erro "Missing Supabase URL or Anon Key"
- Verifique se as variáveis estão corretas no painel Vars
- Reinicie o servidor de desenvolvimento

### Erro de RLS ao salvar cartão
- Garanta que o usuário está logado (session ativa)
- Verifique se as policies estão ativadas no banco

### Cartões não aparecem no checkout
- Verifique o console para erros
- Garanta que `fetchCards` foi chamado quando o usuário fez login

## 6. API Functions

### `useAuth()`
```javascript
const { user, loading, error, login, signup, signOut } = useAuth();

// Login
await login(email, password);

// Signup
await signup(email, password);

// Logout
await signOut();
```

### `usePayment()`
```javascript
const { cards, loading, fetchCards, saveCard, deleteCard, setDefaultCard } = usePayment();

// Fetch cards for user
await fetchCards(userId);

// Save new card
await saveCard(userId, {
  cardNumber: '4111111111111111',
  cardHolder: 'John Doe',
  expiryMonth: '12',
  expiryYear: '2025',
  cvv: '123'
});

// Delete card
await deleteCard(cardId, userId);

// Set card as default
await setDefaultCard(cardId, userId);
```

## 7. Próximas Etapas

- Implementar processamento real de pagamento (Stripe, etc)
- Adicionar validação de CVV
- Implementar 3D Secure
- Adicionar suporte a múltiplos métodos de pagamento
