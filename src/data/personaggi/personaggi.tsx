import { INPCGroup } from "./interfaces"
import players from "./players"



const personaggi: INPCGroup = {
    "gm": {
        "nome": "GM",
        "descrizione": "Colui che osserva il mondo"
    },
    "players": {
        ...players
    }
    
}

export default personaggi