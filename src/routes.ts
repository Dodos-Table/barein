import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("mappa", "routes/mappa.tsx"),
  route("mappa/*", "routes/mappa-poi.tsx"),
  route("personaggi", "routes/personaggi.tsx"),
  route("personaggi/*", "routes/personaggio.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
