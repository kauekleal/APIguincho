# Users Module

Módulo responsável pelo gerenciamento do perfil do usuário autenticado.

## Autenticação

Todos os endpoints deste módulo requerem autenticação via JWT token.

```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints

### Get Current User (Me)

Retorna os dados do usuário autenticado.

**URL:** `/users/me`  
**Método:** `GET`  
**Autenticação:** Requerida

#### Response Success (200)

```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "name": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **401 Unauthorized** - Token inválido ou expirado
- **404 Not Found** - Usuário não encontrado

---

## Exemplo Completo

### 1. Obter dados do usuário autenticado

```bash
curl -H "Authorization: Bearer <seu_token>" \
  http://localhost:PORT/users/me
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "username": "johndoe",
  "email": "john@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```
