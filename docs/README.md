# 📚 Documentação da API

Bem-vindo à documentação completa da APIGuincho. Aqui você encontrará toda a informação necessária para integrar e utilizar nossa API.

## 📑 Índice de Documentação

### Visão Geral
- **[API.md](./API.md)** - Overview geral da API, configuração CORS e tratamento de erros

### Módulos

1. **[AUTH.md](./AUTH.md)** - Autenticação
   - Register - Criar nova conta
   - Login - Autenticar usuário

2. **[USERS.md](./USERS.md)** - Gerenciamento de Usuários
   - Get Current User - Obter dados do usuário autenticado

3. **[EXPENSES.md](./EXPENSES.md)** - Gerenciamento de Despesas
   - List Expenses - Listar todas as despesas
   - Get Expense - Obter detalhes de uma despesa
   - Create Expense - Criar nova despesa
   - Update Expense - Atualizar despesa existente
   - Delete Expense - Deletar despesa

4. **[SERVICES.md](./SERVICES.md)** - Gerenciamento de Serviços
   - List Services - Listar todos os serviços
   - Get Service - Obter detalhes de um serviço
   - Create Service - Criar novo serviço
   - Update Service - Atualizar serviço existente
   - Delete Service - Deletar serviço

5. **[HEALTH.md](./HEALTH.md)** - Health Check
   - Health Check - Verificar status da API

## 🚀 Quick Start

### 1. Registrar um novo usuário

```bash
curl -X POST http://localhost:PORT/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepass123",
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### 2. Fazer login

```bash
curl -X POST http://localhost:PORT/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepass123"
  }'
```

### 3. Usar o token para acessar endpoints protegidos

```bash
curl -H "Authorization: Bearer <seu_token>" \
  http://localhost:PORT/users/me
```

## 🔐 Autenticação

A maioria dos endpoints requer um JWT token válido. O token deve ser enviado no header `Authorization`:

```
Authorization: Bearer <seu_token_jwt>
```

## 📊 Estrutura de Resposta

### Sucesso

As respostas bem-sucedidas retornam o status HTTP apropriado com dados em JSON.

### Erro

As respostas de erro retornam um status HTTP apropriado com a seguinte estrutura:

```json
{
  "message": "Descrição do erro",
  "statusCode": 400
}
```

## 🛠️ Métodos HTTP Suportados

- `GET` - Recuperar dados
- `POST` - Criar novos dados
- `PATCH` - Atualizar dados parcialmente
- `DELETE` - Deletar dados
- `PUT` - Atualizar dados completamente (quando aplicável)
- `OPTIONS` - CORS preflight

## 📝 Convenções

- Todos os endpoints retornam JSON
- Timestamps estão em formato ISO 8601
- IDs são UUIDs
- Números monetários são em formato decimal

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação específica de cada módulo ou verifique o health check da API:

```bash
curl http://localhost:PORT/health
```
