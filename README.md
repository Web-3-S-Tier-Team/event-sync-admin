# events-admin

## Installation

Install the application dependencies by running:

```sh
npm install
```

## Real-world events ("Découvrir")

The "Découvrir" page shows real, live events pulled from the Ticketmaster
Discovery API and lets you import any of them into your managed events list
with one click.

1. Get a free API key at https://developer.ticketmaster.com/
2. Copy `.env.example` to `.env`
3. Set `VITE_TICKETMASTER_API_KEY=your-key`

Without a key, the rest of the app (your own `events`) works normally —
only the "Découvrir" page needs it.

## Development

Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

