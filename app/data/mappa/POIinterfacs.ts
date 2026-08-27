
export interface Coordinate {
    x: number
    y: number
    rx?: number
    ry?: number
}

export interface LuogoPOI extends Coordinate {
    nome: string
    descrizione?: string
}

export interface BasePOI {
    nome: string
    descrizione: string
    abitanti?: number
    img?: string
}

export interface Citta extends BasePOI, Coordinate {
    luoghi?: Record<string, LuogoPOI>
}

export interface Mappa extends BasePOI {
    img?: string
    citta?: CittaGroup
}

export type MappaGroup = Record<string, Mappa>
export type CittaGroup = Record<string, Citta>
