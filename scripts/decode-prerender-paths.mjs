/**
 * Il prerender di React Router scrive le pagine usando il pathname codificato:
 * "/personaggi/teville/padre elion" finisce in "personaggi/teville/padre%20elion/".
 * Gli host statici pero' quasi sempre decodificano il path prima di cercare il file,
 * e non troverebbero quelle pagine (ricadendo sul fallback SPA).
 *
 * Qui affianchiamo a ogni cartella percent-encoded una copia con il nome decodificato,
 * senza rimuovere l'originale: cosi' l'output funziona con entrambi i comportamenti.
 */
import { cp, readdir, stat } from "node:fs/promises";
import path from "node:path";

const clientDir = path.resolve(import.meta.dirname, "..", "build", "client");

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    if (!(await stat(full)).isDirectory()) continue;

    const decoded = decodeURIComponent(entry);
    if (decoded !== entry) {
      const target = path.join(dir, decoded);
      await cp(full, target, { recursive: true, force: true });
      console.log(`Decoded ${path.relative(clientDir, full)} -> ${path.relative(clientDir, target)}`);
    }

    await walk(full);
  }
}

await walk(clientDir);
