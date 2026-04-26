'use client'

import { INPCGroup } from "@/data/personaggi/NPCinterfaces";
import personaggi from "@/data/personaggi/personaggi";
import Link from "next/link";
import { usePathname } from "next/navigation";

function buildList(root: INPCGroup, link: string) {

    const ids = Object.keys(root).sort()

    return ids.map(element => {
        if (typeof root[element]?.nome === "string") {
            return <li key={root[element]?.nome} className="personaggio">
                <Link className="link" href={link + "/" + element}>{root[element]?.nome}</Link>
            </li>
        }


        const uls = buildList(root[element] as INPCGroup, link + "/" + element)
        return (<div key={"sez-" + element}>
            <div className="titoloCategoria">{element}</div>
            <ul className="sezionePersonaggi">
                {...uls}
            </ul>
        </div>
        )


    });


}

export default function ListaPersonaggi() {
    return <ul className="sezionePersonaggi">
        {
            buildList(personaggi, usePathname())
        }
    </ul>
}