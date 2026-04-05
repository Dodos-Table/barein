import { INPC, INPCGroup, INPCInfo } from "@/data/personaggi/interfaces";
import personaggi from "@/data/personaggi/personaggi";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    console.log(slug)

    let path_to_personaggio: INPCGroup = personaggi
    for (let index = 0; index < slug.length-1; index++) {

        let key = decodeURI(slug[index])
        path_to_personaggio = path_to_personaggio[key] as INPCGroup;
    }


    let key = decodeURI(slug[slug.length-1])
    let personaggio: INPC | undefined = path_to_personaggio[key] as INPC | undefined;

    if (!personaggio) {
        notFound()
    }



    return <div>
        <div>Nome: {personaggio.nome}</div>
        <div>Desc: {personaggio.descrizione}</div>
        <div>IMG: {personaggio.img}</div>
    </div>


}