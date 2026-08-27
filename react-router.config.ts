import type { Config } from "@react-router/dev/config";
import { mappaPoi } from "./src/data/mappa/mappaPoi";
import personaggi from "./src/data/personaggi/personaggi";
import type { INPCGroup } from "./src/data/personaggi/NPCinterfaces";

export default {
  // I moduli dell'app (root, routes, componenti, dati) restano sotto src/.
  appDirectory: "src",
  // Nessun server: le pagine sono generate staticamente in build.
  ssr: false,
  async prerender() {
    const paths = ["/", "/mappa", "/personaggi"];

    const barein = mappaPoi["barein"];
    for (const [citta, poi] of Object.entries(barein.citta ?? {})) {
      paths.push(`/mappa/${citta}`);
      for (const luogo of Object.keys(poi.luoghi ?? {})) {
        paths.push(`/mappa/${citta}/${luogo}`);
      }
    }

    // Stesso discriminante usato da ListaPersonaggi per distinguere NPC e gruppi.
    const walk = (group: INPCGroup, prefix: string) => {
      for (const [key, value] of Object.entries(group)) {
        if (typeof value?.nome === "string") paths.push(`${prefix}/${key}`);
        else walk(value as INPCGroup, `${prefix}/${key}`);
      }
    };
    walk(personaggi, "/personaggi");

    return paths;
  },
} satisfies Config;
