# Barein

Wiki della campagna di DnD "L'Occhio su Barein": personaggi e mappa interattiva.

Sito statico costruito con [React Router 8](https://reactrouter.com) in framework mode
(senza SSR), [Vite](https://vite.dev), [Tailwind CSS](https://tailwindcss.com) v4 e TypeScript.

## Requisiti

Node 24 (vedi `.nvmrc`):

```bash
nvm use
npm install
```

## Sviluppo

```bash
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173).

## Altri comandi

```bash
npm run build      # build di produzione in build/client (HTML prerenderizzato)
npm run preview    # serve localmente la build
npm run typecheck  # react-router typegen + tsc
npm run lint       # eslint
```

## Struttura

- `src/root.tsx` — documento HTML, `<Nav/>` e `<Outlet/>`
- `src/routes.ts` — definizione delle route
- `src/routes/` — una pagina per route
- `src/component/` — componenti condivisi (mappa interattiva, lista personaggi, markdown)
- `src/data/` — i contenuti della wiki, moduli TypeScript statici
- `src/lib/markdown-plugin/` — plugin markdown-it per i segnaposto `§N§`
- `public/assets/` — immagini di mappe e personaggi

## Contenuti

I testi vivono in `src/data/`. Per aggiungere un personaggio basta una voce in
`src/data/personaggi/`, per un luogo una voce in `src/data/mappa/`: le route,
la navigazione e le pagine statiche vengono generate da lì.

Nelle descrizioni la sintassi `§N§` inserisce un segnaposto "informazione ignota"
alto N righe, reso come riquadro con un punto interrogativo.

## Deploy

`npm run build` produce `build/client/`, servibile da qualsiasi host statico.
Configurare il fallback delle route non trovate su `__spa-fallback.html`.
