import { INPCGroup } from "./NPCinterfaces"
import players from "./players"
import teville from "./teville"



const personaggi: INPCGroup = {
    "gm": {
        "nome": "GM",
        "descrizione": `Un occhio veglia sugli eventi che accadono nel mondo, e su un povero gruppo in missione per svelare il mistero degli occhi di vetro`,
        "img": "/assets/imgs/personaggi/gm.png"
    },
    "players": {
        ...players
    },
    "teville": {
        ...teville
    }

}

export default personaggi