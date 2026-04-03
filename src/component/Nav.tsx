import Link from "next/link";


export default function Nav() {
    return (
        <div className="py-2 border-b-2 border-black">
            <div className="flex flex-row justify-center mx-3">
                <div><h1 className="text-3xl">La storia di Barein</h1></div>
                <div className="grow">&nbsp;</div>
                <div className="inline-flex items-center">
                    <div><Link href="/"><button>Home</button></Link></div>
                    <div><Link href="personaggi"><button>Personaggi</button></Link></div>
                    <div><Link href="mappa"><button>Mappa</button></Link></div>
                </div>
            </div>
        </div>
    );
}