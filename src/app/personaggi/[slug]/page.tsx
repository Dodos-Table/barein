import dynamic from "next/dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    

    return <div>
        <div>Nome: </div>
        <div>Desc: </div>
        <div>IMG: </div>
    </div>


}