"use client"

import MappaInterattiva from "@/component/MappaInterattiva";
import { mappaPoi } from "@/data/mappa/mappaPoi";
import DescrizioneMD from '../../component/DescrizioneMD';


export default function Mappa() {

    const map = mappaPoi["barein"]
    
    return (
        <div className="m-2 flex">
            <div className="w-190" >
                <MappaInterattiva luoghi={map.citta} img={map.img} />
            </div>
            <div className="grow">
                {map ? (<div className="mx-3">
                    <h1 className="text-center">{map.nome}</h1>
                    {map.abitanti ? (<div>Abitanti: {map.abitanti}</div>) : null}
                    <DescrizioneMD descrizione={map.descrizione} />
                </div>) : null}
            </div>
        </div>
    );
}