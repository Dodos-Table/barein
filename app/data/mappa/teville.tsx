import type { CittaGroup } from "./POIinterfacs"

const teville: CittaGroup = {

    "teville":{
        nome: "Teville",
        descrizione: `Un piccolo villaggio che vive in una piana al ridosso del mare. Le giornate sono calde e la vita cittadina trasforre senza troppi pensieri.
La città ha girandi raccoldi intorno alle mura per sfamare ogni persona. La cattedrale svetta su tutte le altre case.
Al suo intenro risiedono cinque sacerdoti e il capo sacerdote, che amministra la città.`,
        abitanti: 600,
        img: "/assets/imgs/mappa/citta/teville.png",
        x: 664.26764,
        y: 743.25653,
        luoghi: {
            cattedrale: {
                nome: "Cattedrale",
                x: 1032,
                y: 1620,
                rx: 66,
                ry: 90,
                descrizione: "La cattedrale di Teville è un imponente edificio gotico che domina il centro della città. Le sue alte torri e le vetrate colorate attirano l'attenzione di chiunque si avvicini. All'interno, i fedeli si riuniscono per pregare e partecipare alle cerimonie religiose, guidati dai cinque sacerdoti e dal capo sacerdote."
            }
        }
    }
}

export default teville

