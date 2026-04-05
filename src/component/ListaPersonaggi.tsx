'use client'

import { INPCGroup } from "@/data/personaggi/interfaces";
import personaggi from "@/data/personaggi/personaggi";
import Link from "next/link";
import { usePathname } from "next/navigation";

function buildList(root: INPCGroup, link: string) {

    const ids = Object.keys(root)

    return ids.map(element => {
        if(typeof root[element]?.nome === "string") {
            return <li key={root[element]?.nome} className="personaggio">
                <Link href={link+"/"+element}>{root[element]?.nome}</Link>
            </li>
        }
        

        let uls = buildList(root[element] as INPCGroup, link+"/"+element)
        return (
            <ul key={"sez-"+element} className="sezionePersonaggi">
                <li className="titoloCategoria">{element}</li>
                {...uls}
            </ul>
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