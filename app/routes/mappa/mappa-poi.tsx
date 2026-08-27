import MappaInterattiva from "../../component/MappaInterattiva";
import { mappaPoi } from "../../data/mappa/mappaPoi";
import DescrizioneMD from "../../component/DescrizioneMD";
import NotFound from "../../component/NotFound";
import { useParams } from "react-router";


export default function MappaPOI() {
    const params = useParams()
    const slug = (params["*"] ?? "").split("/").filter(Boolean).map(decodeURIComponent)

    if (slug.length === 0) return <NotFound />

    const [citta, luogo] = slug
    const map_barein = mappaPoi["barein"]
    const map_citta = map_barein.citta?.[citta]
    if (!map_citta) return <NotFound />

    let poi = undefined
    if (luogo !== undefined) {
        poi = map_citta.luoghi?.[luogo]
        if (!poi) return <NotFound />
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
