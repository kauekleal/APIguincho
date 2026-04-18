# Auth Module

Módulo responsável por autenticação de usuários, incluindo registro e login.

## Endpoints

### Register (Registrar)

Cria uma nova conta de usuário.

**URL:** `/auth/register`  
**Método:** `POST`  
**Autenticação:** Não requerida

#### Request Body

```json
{
  "username": "string (mínimo 3 caracteres)",
  "password": "string (mínimo 6 caracteres)",
  "name": "string (não vazio)",
  "email": "string (formato de email válido)"
}
```

#### Validações

- `username`: Deve ter no mínimo 3 caracteres
- `password`: Deve ter no mínimo 6 caracteres
- `name`: Deve ser preenchido
- `email`: Deve ser um email válido

#### Response Success (201)

```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "name": "string",
  "createdAt": "ISO 8601 timestamp"
}
```

#### Response Errors

- **400 Bad Request** - Validação falhou
- **409 Conflict** - Usuário ou email já existe

---

### Login

Autentica um usuário existente e retorna um JWT token.

**URL:** `/auth/login`  
**Método:** `POST`  
**Autenticação:** Não requerida

#### Request Body

```json
{
  "username": "string",
  "password": "string"
}
```

#### Validações

- `username`: Deve ter no mínimo 3 caracteres
- `password`: Deve ter no mínimo 6 caracteres

#### Response Success (200)

```json
{
  "token": "jwt_token_string"
}
```

#### Response Errors

- **400 Bad Request** - Validação falhou
- **401 Unauthorized** - Credenciais inválidas (usuário não encontrado ou senha incorreta)

---

## Uso do Token

Após fazer login com sucesso, utilize o token retornado para autenticar requisições em endpoints protegidos:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:PORT/users/me
```

## Exemplo Completo

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

### 2. Login

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
curl -H "Authorization: Bearer <token_recebido>" \
  http://localhost:PORT/users/me
```
