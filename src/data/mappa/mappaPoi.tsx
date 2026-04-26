import { MappaGroup } from "./POIinterfacs";
import teville from "./teville";

export const mappaPoi: MappaGroup = {
    barein: {
        nome: "Barein",
        descrizione: "Un posto plasmato dal tempo e dalle forze della natura",
        img: "/assets/imgs/mappa/mappa.webp",
        citta: {
            ...teville,
        },
    },
    // Altre mappe possono essere aggiunte qui
}

