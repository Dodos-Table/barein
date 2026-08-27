import type { LuogoPOI } from "../data/mappa/POIinterfacs"
import { useLocation, useNavigate } from "react-router"
import { Tooltip } from "react-tooltip"
import { useState, useRef, useEffect } from "react"

interface InputMappaBarein {
    img?: string
    luoghi?: Record<string, LuogoPOI>
    lugogo_scelto?: string
}

export default function MappaInterattiva(prop: InputMappaBarein) {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [imgWidth, setImgWidth] = useState(0)
    const [imgHeight, setImgHeight] = useState(0)
    const imgRef = useRef<HTMLImageElement>(null)

    const handleLoad = () => {
        if (imgRef.current) {
            setImgWidth(imgRef.current.naturalWidth)
            setImgHeight(imgRef.current.naturalHeight)
        }
    }

    useEffect(() => {
        if (imgRef.current?.complete) {
            handleLoad()
        }
    }, [])

    function onClick(event: React.MouseEvent<SVGEllipseElement>) {
        const citta = event.currentTarget.getAttribute("name") || ""
        navigate(pathname.replace(/\/+$/, "") + "/" + citta)
    }


    return (<>
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            {prop.img ? (
                <img
                    ref={imgRef}
                    src={prop.img}
                    alt="Mappa"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    onLoad={handleLoad}
                />
            ) : null}
            <svg
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                version="1.1"
                id="mappa"
                viewBox={imgWidth && imgHeight ? `0 0 ${imgWidth} ${imgHeight}` : '0 0 100 100'}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="citta">
                    {
                        (prop.luoghi) ? Object.entries(prop.luoghi).map(pair =>
                            <ellipse key={pair[0]}
                                data-tooltip-id="my-tooltip" data-tooltip-content={pair[0]}
                                name={pair[0]}
                                onClick={onClick}
                                style={{ fill: "transparent", stroke: (pair[0] === prop.lugogo_scelto ? "#09B8C8" : "#ff0000"), strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "2.1", strokeWidth: "0.5rem" }}
                                id={pair[0]}
                                cx={pair[1].x}
                                cy={pair[1].y}
                                rx={pair[1].rx || "87"}
                                ry={pair[1].ry || "54"} />
                        )
                            : null
                    }

                </g>
            </svg>
        </div>
        <Tooltip id="my-tooltip" />
    </>)

}