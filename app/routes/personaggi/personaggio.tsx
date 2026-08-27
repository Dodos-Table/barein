import type { INPC, INPCGroup } from "@/data/personaggi/NPCinterfaces";
import personaggi from "@/data/personaggi/personaggi";
import markdownit from 'markdown-it'
import NotKnownPlugin from "@/lib/markdown-plugin/NotKnown";
import NotFound from "@/component/NotFound";
import { useParams } from "react-router";

export default function Personaggio() {
    const params = useParams()
    const slug = (params["*"] ?? "").split("/").filter(Boolean).map(decodeURIComponent)

    if (slug.length === 0) return <NotFound />

    let path_to_personaggio: INPCGroup | undefined = personaggi
    for (let index = 0; index < slug.length - 1; index++) {
        path_to_personaggio = path_to_personaggio?.[slug[index]] as INPCGroup | undefined;
    }

    const personaggio: INPC | undefined = path_to_personaggio?.[slug[slug.length - 1]] as INPC | undefined;

    // Stesso discriminante di ListaPersonaggi: un NPC ha "nome", un gruppo no.
    // La descrizione puo' essere vuota (voci segnaposto), quindi non e' un criterio.
    if (typeof personaggio?.nome !== "string") {
        return <NotFound />
    }

    const md = markdownit()
    md.use(NotKnownPlugin)
    const result = md.render(personaggio.descrizione);

    return <div className="container">
        <h1 className="text-center mb-2">{personaggio.nome}</h1>

        <div className="flex flex-col md:flex-row">
            {personaggio.img ? (
                <div className="sm:m-0 m-auto">
                    <img alt={personaggio.nome} src={personaggio.img} width={256} />
                </div>
            ) : (<></>)}
            <div className="mx-2 w-[calc(100%-256px)]" dangerouslySetInnerHTML={{ __html: result }} />
        </div>
    </div>
}
