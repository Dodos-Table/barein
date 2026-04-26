
import markdownit from 'markdown-it'
import NotKnownPlugin from "@/lib/markdown-plugin/NotKnown";

interface DescrizioneMDProps {
    descrizione: string
}

export default function DescrizioneMD(prop: DescrizioneMDProps) {
    if(!prop.descrizione) return null

    const md = markdownit()
    md.use(NotKnownPlugin)
    const result = md.render(prop.descrizione);

    return (
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
    )
}