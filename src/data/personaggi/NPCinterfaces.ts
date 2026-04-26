export interface INPC {
    nome: string,
    descrizione: string,
    img?: string
}

export type INPCInfo<T> = Record<string, INPC | T>;

export interface INPCGroup extends INPCInfo<INPCGroup> {}