import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Risolve l'alias "@/*" da tsconfig.json (nativo in Vite 8).
  resolve: { tsconfigPaths: true },
  // Il prerender di build avvia un preview server e lo interroga con node:http.
  // Senza host esplicito Vite si lega a ::1 ma annuncia "localhost", che viene
  // risolto su IPv4 -> ECONNREFUSED. Vincolarlo a 127.0.0.1 allinea le due cose.
  preview: { host: "127.0.0.1" },
  plugins: [tailwindcss(), reactRouter()],
});
