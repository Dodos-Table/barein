import { Link } from "react-router";


export default function Nav() {
    return (
        <div className="py-2 border-b-2 border-black mb-2">
            <div className="flex flex-row justify-center mx-3 flex-wrap">
                <div>
                    <Link to="/">
                        <h1 className="text-3xl">La storia di Barein</h1>
                    </Link>
                </div>
                <div className="grow">&nbsp;</div>
                <div className="inline-flex items-center gap-x-2">
                    <div><Link to="/"><button>Home</button></Link></div>
                    <div><Link to="/personaggi"><button>Personaggi</button></Link></div>
                    <div><Link to="/mappa"><button>Mappa</button></Link></div>
                </div>
            </div>
        </div>
    );
}
