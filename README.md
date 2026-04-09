# Fake Store API 🛒

API e-commerce per il corso di formazione n8n. Simula un negozio online tipo Amazon con autenticazione JWT.

## Quick Start

```bash
npm install
npm start
```

L'API sarà disponibile su `http://localhost:3000`

> Al primo avvio il database viene creato e popolato automaticamente con 50 prodotti, 6 categorie e 5 utenti.
> Per resettare i dati, elimina il file `database.sqlite` e riavvia.

## Account di Test

| Email | Password | Ruolo |
|-------|----------|-------|
| `admin@fakestoreapi.com` | `admin123` | Admin |
| `mario.rossi@example.com` | `password123` | Customer |
| `jane.smith@example.com` | `password123` | Customer |
| `carlos.garcia@example.com` | `password123` | Customer |
| `yuki.tanaka@example.com` | `password123` | Customer |

## Autenticazione

L'API usa **JWT Bearer Token**. Per le chiamate autenticate, aggiungi l'header:

```
Authorization: Bearer <il-tuo-token>
```

Ottieni il token tramite login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "mario.rossi@example.com", "password": "password123"}'
```

## Endpoints

### Auth (Pubblici)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| POST | `/api/auth/register` | Registra nuovo account |
| POST | `/api/auth/login` | Login, ritorna JWT token |

### Prodotti (Pubblici, CRUD Admin)

| Metodo | Path | Auth | Descrizione |
|--------|------|------|-------------|
| GET | `/api/products` | No | Lista prodotti |
| GET | `/api/products/:id` | No | Dettaglio prodotto |
| POST | `/api/products` | Admin | Crea prodotto |
| PUT | `/api/products/:id` | Admin | Aggiorna prodotto |
| DELETE | `/api/products/:id` | Admin | Elimina prodotto |

**Query params per GET /api/products:**
- `page` - Pagina (default: 1)
- `limit` - Prodotti per pagina (default: 10, max: 100)
- `search` - Cerca nel titolo, descrizione e brand
- `category` - Filtra per slug o ID categoria
- `minPrice` - Prezzo minimo
- `maxPrice` - Prezzo massimo
- `sort` - Ordinamento: `price_asc`, `price_desc`, `rating`, `newest`

### Categorie (Pubblici)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/categories` | Lista categorie |
| GET | `/api/categories/:id/products` | Prodotti per categoria |

### Carrello (Autenticazione richiesta)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/cart` | Vedi carrello |
| POST | `/api/cart/items` | Aggiungi prodotto (`{productId, quantity}`) |
| PUT | `/api/cart/items/:productId` | Aggiorna quantità (`{quantity}`) |
| DELETE | `/api/cart/items/:productId` | Rimuovi prodotto |
| DELETE | `/api/cart` | Svuota carrello |

### Ordini (Autenticazione richiesta)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| POST | `/api/orders` | Crea ordine dal carrello |
| GET | `/api/orders` | Lista ordini |
| GET | `/api/orders/:id` | Dettaglio ordine |
| PUT | `/api/orders/:id/status` | Aggiorna stato (Admin) |
| DELETE | `/api/orders/:id` | Cancella ordine (solo se pending) |

### Utenti (Autenticazione richiesta)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/users/profile` | Vedi profilo |
| PUT | `/api/users/profile` | Aggiorna profilo |
| GET | `/api/users` | Lista utenti (Admin) |

## Esempio Flusso Completo in n8n

1. **Login** → POST `/api/auth/login` → salva il `token` dalla risposta
2. **Cerca prodotti** → GET `/api/products?search=headphones`
3. **Aggiungi al carrello** → POST `/api/cart/items` con `{productId: 1, quantity: 2}` + header Auth
4. **Vedi carrello** → GET `/api/cart` + header Auth
5. **Crea ordine** → POST `/api/orders` + header Auth
6. **Verifica ordine** → GET `/api/orders` + header Auth

## Formato Risposte

**Successo:**
```json
{
  "success": true,
  "data": { ... },
  "pagination": { "page": 1, "limit": 10, "total": 50, "totalPages": 5 },
  "message": "Optional message"
}
```

**Errore:**
```json
{
  "success": false,
  "error": "Descrizione dell'errore"
}
```

## Categorie Disponibili

| ID | Nome | Slug |
|----|------|------|
| 1 | Electronics | `electronics` |
| 2 | Clothing | `clothing` |
| 3 | Books | `books` |
| 4 | Home & Kitchen | `home-kitchen` |
| 5 | Sports & Outdoors | `sports-outdoors` |
| 6 | Beauty & Personal Care | `beauty-personal-care` |
