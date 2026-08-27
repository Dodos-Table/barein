import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  // Splat e non ":id": i percorsi hanno profondita' variabile
  // (/mappa/teville, /mappa/teville/cattedrale, /personaggi/players/player A)
  // e i componenti leggono lo slug da params["*"].
  ...prefix("mappa", [
    index("routes/mappa/index.tsx"),
    route("*", "routes/mappa/mappa-poi.tsx"),
  ]),

  ...prefix("personaggi", [
    index("routes/personaggi/index.tsx"),
    route("*", "routes/personaggi/personaggio.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
