import MappaInterattiva from "@/component/MappaInterattiva";
import { mappaPoi } from "@/data/mappa/mappaPoi";
import { notFound } from "next/navigation";
import DescrizioneMD from "@/component/DescrizioneMD";


export default async function MappaPOI({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params

    if (!slug || slug.length === 0) notFound()

    const [citta, luogo] = slug
    const map_barein = mappaPoi["barein"]
    const map_citta = map_barein.citta?.[citta]
    if(!map_citta) notFound()
    
    let poi = undefined
    if(luogo !== undefined) {
        poi = map_citta.luoghi?.[luogo]
        if (!poi) notFound()
    }

    return (
        <div className="m-2 grid grid-cols-3 ">
            <div>
                <MappaInterattiva luoghi={map_citta.luoghi} img={map_citta.img} lugogo_scelto={luogo} />
            </div>
            <div className="col-span-2">
                <div className="mx-3">
                    <div className="mb-5">
                        <h1 className="text-center">{map_citta.nome}</h1>
                        {map_citta.abitanti ? (<div>Abitanti: {map_citta.abitanti}</div>) : null}
                        <DescrizioneMD descrizione={map_citta.descrizione} />
                    </div>
                    <div>
                        {poi !== undefined ? (<>
                            <h1 className="text-center">{poi.nome}</h1>
                            <DescrizioneMD descrizione={poi.descrizione || ""} />
                        </>) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
