import { INPC, INPCGroup } from "@/data/personaggi/NPCinterfaces";
import personaggi from "@/data/personaggi/personaggi";
import { notFound } from "next/navigation";
import markdownit from 'markdown-it'
import NotKnownPlugin from "@/lib/markdown-plugin/NotKnown";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    let path_to_personaggio: INPCGroup = personaggi
    for (let index = 0; index < slug.length - 1; index++) {

        const key = decodeURI(slug[index])
        path_to_personaggio = path_to_personaggio[key] as INPCGroup;
    }


    const key = decodeURI(slug[slug.length - 1])
    const personaggio: INPC | undefined = path_to_personaggio[key] as INPC | undefined;

    if (!personaggio) {
        notFound()
    }

    const md = markdownit()
    md.use(NotKnownPlugin)
    const result = md.render(personaggio.descrizione);

    return <div className="container">
        <h1 className="text-center mb-2">{personaggio.nome}</h1>

        <div className="flex flex-col md:flex-row">
            {personaggio.img ? (
                <div className="sm:m-0 m-auto">
                    <img alt={personaggio.nome} src={personaggio.img} width={256} height={"auto"} />
                </div>
            ) : (<></>)}
            <div className="mx-2 w-[calc(100%-256px)]" dangerouslySetInnerHTML={{ __html: result }} />
        </div>
    </div>


}