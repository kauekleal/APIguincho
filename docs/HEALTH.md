# Health Check Module

Módulo responsável pelo health check da API. Permite verificar se a API está online e funcionando corretamente.

## Endpoints

### Health Check

Verifica o status da API.

**URL:** `/health`  
**Método:** `GET`  
**Autenticação:** Não requerida

#### Response Success (200)

```json
{
  "status": "ok",
  "timestamp": "ISO 8601 timestamp"
}
```

---

## Exemplo

### Verificar se a API está online

```bash
curl http://localhost:PORT/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.123Z"
}
```

## Uso

Este endpoint é útil para:
- Verificar se a API está online durante o startup
- Monitoramento e alertas de disponibilidade
- Load balancing e health checks automáticos
