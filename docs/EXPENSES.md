# Expenses Module

Módulo responsável pelo gerenciamento de despesas do usuário autenticado. Permite criar, listar, atualizar e deletar despesas.

## Autenticação

Todos os endpoints deste módulo requerem autenticação via JWT token.

```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints

### List Expenses (Listar Despesas)

Retorna todas as despesas do usuário autenticado.

**URL:** `/expenses`  
**Método:** `GET`  
**Autenticação:** Requerida

#### Response Success (200)

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "category": "string",
    "value": "number",
    "description": "string",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
]
```

#### Response Errors

- **401 Unauthorized** - Token inválido ou expirado

---

### Get Expense (Obter Despesa)

Retorna os detalhes de uma despesa específica.

**URL:** `/expenses/:id`  
**Método:** `GET`  
**Autenticação:** Requerida

#### Parâmetros

- `id` (path) - UUID da despesa

#### Response Success (200)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "category": "string",
  "value": "number",
  "description": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Despesa não encontrada

---

### Create Expense (Criar Despesa)

Cria uma nova despesa para o usuário autenticado.

**URL:** `/expenses`  
**Método:** `POST`  
**Autenticação:** Requerida

#### Request Body

```json
{
  "category": "string (não vazio)",
  "value": "number (positivo)",
  "description": "string (máximo 11 caracteres)"
}
```

#### Validações

- `category`: Deve ser uma string não vazia
- `value`: Deve ser um número positivo
- `description`: Deve ter no máximo 11 caracteres

#### Response Success (201)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "category": "string",
  "value": "number",
  "description": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **400 Bad Request** - Validação falhou
- **401 Unauthorized** - Token inválido ou expirado

---

### Update Expense (Atualizar Despesa)

Atualiza uma despesa existente.

**URL:** `/expenses/:id`  
**Método:** `PATCH`  
**Autenticação:** Requerida

#### Parâmetros

- `id` (path) - UUID da despesa

#### Request Body

Qualquer um dos campos pode ser atualizado (todos são opcionais):

```json
{
  "category": "string (opcional)",
  "value": "number (positivo, opcional)",
  "description": "string (máximo 11 caracteres, opcional)"
}
```

#### Response Success (200)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "category": "string",
  "value": "number",
  "description": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **400 Bad Request** - Validação falhou
- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Despesa não encontrada

---

### Delete Expense (Deletar Despesa)

Deleta uma despesa existente.

**URL:** `/expenses/:id`  
**Método:** `DELETE`  
**Autenticação:** Requerida

#### Parâmetros

- `id` (path) - UUID da despesa

#### Response Success (204)

Sem conteúdo

#### Response Errors

- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Despesa não encontrada

---

## Exemplos Completos

### 1. Listar todas as despesas

```bash
curl -H "Authorization: Bearer <seu_token>" \
  http://localhost:PORT/expenses
```

### 2. Obter uma despesa específica

```bash
curl -H "Authorization: Bearer <seu_token>" \
  http://localhost:PORT/expenses/123e4567-e89b-12d3-a456-426614174000
```

### 3. Criar uma nova despesa

```bash
curl -X POST http://localhost:PORT/expenses \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Alimentação",
    "value": 50.99,
    "description": "Almoço"
  }'
```

### 4. Atualizar uma despesa

```bash
curl -X PATCH http://localhost:PORT/expenses/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 75.50,
    "description": "Ceia"
  }'
```

### 5. Deletar uma despesa

```bash
curl -X DELETE http://localhost:PORT/expenses/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer <seu_token>"
```
