# Services Module

Módulo responsável pelo gerenciamento de serviços. Permite criar, listar, atualizar e deletar serviços.

## Autenticação

Todos os endpoints deste módulo requerem autenticação via JWT token.

```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints

### List Services (Listar Serviços)

Retorna todos os serviços do usuário autenticado.

**URL:** `/service`  
**Método:** `GET`  
**Autenticação:** Requerida

#### Response Success (200)

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
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

### Get Service (Obter Serviço)

Retorna os detalhes de um serviço específico.

**URL:** `/service/:id`  
**Método:** `GET`  
**Autenticação:** Requerida

#### Parâmetros

- `id` (path) - UUID do serviço

#### Response Success (200)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "value": "number",
  "description": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Serviço não encontrado

---

### Create Service (Criar Serviço)

Cria um novo serviço para o usuário autenticado.

**URL:** `/service`  
**Método:** `POST`  
**Autenticação:** Requerida

#### Request Body

```json
{
  "value": "number (positivo)",
  "description": "string (máximo 11 caracteres)"
}
```

#### Validações

- `value`: Deve ser um número positivo
- `description`: Deve ter no máximo 11 caracteres

#### Response Success (201)

```json
{
  "id": "uuid",
  "userId": "uuid",
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

### Update Service (Atualizar Serviço)

Atualiza um serviço existente.

**URL:** `/service/:id`  
**Método:** `PATCH`  
**Autenticação:** Requerida

#### Parâmetros

- `id` (path) - UUID do serviço

#### Request Body

Qualquer um dos campos pode ser atualizado (todos são opcionais):

```json
{
  "value": "number (positivo, opcional)",
  "description": "string (máximo 11 caracteres, opcional)"
}
```

#### Response Success (200)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "value": "number",
  "description": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **400 Bad Request** - Validação falhou
- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Serviço não encontrado

---

### Delete Service (Deletar Serviço)

Deleta um serviço existente.

**URL:** `/service/:id`  
**Método:** `DELETE`  
**Autenticação:** Requerida

#### Parâmetros

- `id` (path) - UUID do serviço

#### Response Success (204)

Sem conteúdo

#### Response Errors

- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Serviço não encontrado

---

## Exemplos Completos

### 1. Listar todos os serviços

```bash
curl -H "Authorization: Bearer <seu_token>" \
  http://localhost:PORT/service
```

### 2. Obter um serviço específico

```bash
curl -H "Authorization: Bearer <seu_token>" \
  http://localhost:PORT/service/123e4567-e89b-12d3-a456-426614174000
```

### 3. Criar um novo serviço

```bash
curl -X POST http://localhost:PORT/service \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 150.00,
    "description": "Conserto"
  }'
```

### 4. Atualizar um serviço

```bash
curl -X PATCH http://localhost:PORT/service/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 200.00,
    "description": "Reparo"
  }'
```

### 5. Deletar um serviço

```bash
curl -X DELETE http://localhost:PORT/service/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer <seu_token>"
```
