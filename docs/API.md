# API Documentation

## Overview

APIGuincho é uma API RESTful para gerenciamento de usuários, despesas e serviços. A API utiliza autenticação baseada em tokens JWT para proteger endpoints sensíveis.

## Base URL

```
http://localhost:PORT
```

## Autenticação

A maioria dos endpoints requer autenticação via JWT token. O token deve ser enviado no header `Authorization`:

```
Authorization: Bearer <seu_token_jwt>
```

## Módulos

A API está organizada em módulos temáticos:

- **[Auth](./AUTH.md)** - Autenticação e registro de usuários
- **[Users](./USERS.md)** - Gerenciamento de perfil do usuário
- **[Expenses](./EXPENSES.md)** - Gerenciamento de despesas
- **[Services](./SERVICES.md)** - Gerenciamento de serviços
- **[Health](./HEALTH.md)** - Health check da API

## CORS

A API está configurada para aceitar requisições CORS. Os seguintes métodos HTTP são permitidos:
- GET
- POST
- PUT
- DELETE
- PATCH
- OPTIONS

## Tratamento de Erros

A API retorna erros em formato JSON com informações de status e mensagem:

```json
{
  "message": "Descrição do erro",
  "statusCode": 400
}
```

## Documentação dos Módulos

Consulte os documentos específicos de cada módulo para detalhes completos sobre endpoints, parâmetros e responses.
