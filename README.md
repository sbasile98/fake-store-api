# Fake Store API

API e-commerce completa con autenticazione Basic Auth, prodotti, carrello, ordini e gestione utenti.

## Quick Start

```bash
npm install
npm start
```

L'API sara' disponibile su `http://localhost:3000` con la documentazione interattiva.

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

L'API usa **Basic Auth** su tutte le route. Ogni richiesta richiede email e password:

```bash
curl -u mario.rossi@example.com:password123 http://localhost:3000/api/products
```

## Endpoints

### Prodotti (Basic Auth, CRUD Admin)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/products` | Lista prodotti con filtri e paginazione |
| GET | `/api/products/all` | Tutti i prodotti (senza paginazione) |
| GET | `/api/products/:id` | Dettaglio prodotto |
| POST | `/api/products` | Crea prodotto (Admin) |
| PUT | `/api/products/:id` | Aggiorna prodotto (Admin) |
| DELETE | `/api/products/:id` | Elimina prodotto (Admin) |

**Query params per GET /api/products:**
- `page` - Pagina (default: 1)
- `limit` - Prodotti per pagina (default: 10, max: 100)
- `search` - Cerca nel titolo, descrizione e brand
- `category` - Filtra per slug o ID categoria
- `minPrice` / `maxPrice` - Range prezzo
- `sort` - Ordinamento: `price_asc`, `price_desc`, `rating`, `newest`

### Categorie (Basic Auth)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/categories` | Lista categorie |
| GET | `/api/categories/:id/products` | Prodotti per categoria |

### Carrello (Basic Auth)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/cart` | Vedi carrello |
| POST | `/api/cart/items` | Aggiungi prodotto |
| PUT | `/api/cart/items/:productId` | Aggiorna quantita' |
| DELETE | `/api/cart/items/:productId` | Rimuovi prodotto |
| DELETE | `/api/cart` | Svuota carrello |

### Ordini (Basic Auth)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| POST | `/api/orders` | Crea ordine dal carrello |
| GET | `/api/orders` | Lista ordini |
| GET | `/api/orders/:id` | Dettaglio ordine |
| PUT | `/api/orders/:id/status` | Aggiorna stato (Admin) |
| DELETE | `/api/orders/:id` | Cancella ordine (solo se pending) |

### Utenti (Basic Auth)

| Metodo | Path | Descrizione |
|--------|------|-------------|
| GET | `/api/users/profile` | Vedi profilo |
| PUT | `/api/users/profile` | Aggiorna profilo |
| GET | `/api/users` | Lista utenti (Admin) |

## Formato Risposte

Le liste restituiscono direttamente un **array JSON**. La paginazione e' negli header HTTP:

- `X-Total-Count` - Totale elementi
- `X-Page` - Pagina corrente
- `X-Per-Page` - Elementi per pagina
- `X-Total-Pages` - Totale pagine

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
| 1 | Elettronica | `elettronica` |
| 2 | Abbigliamento | `abbigliamento` |
| 3 | Libri | `libri` |
| 4 | Casa e Cucina | `casa-cucina` |
| 5 | Sport e Outdoor | `sport-outdoor` |
| 6 | Bellezza e Cura della Persona | `bellezza-cura-persona` |
