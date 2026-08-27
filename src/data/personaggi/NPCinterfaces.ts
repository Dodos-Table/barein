export interface INPC {
    nome: string,
    descrizione: string,
    img?: string
}

export type INPCInfo<T> = Record<string, INPC | T>;

// L'interfaccia vuota serve a rendere il tipo ricorsivo: un alias
// `type INPCGroup = INPCInfo<INPCGroup>` si riferirebbe a se stesso.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface INPCGroup extends INPCInfo<INPCGroup> {}