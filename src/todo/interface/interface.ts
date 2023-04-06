
export interface ITodo {
    id?: number
    name: string
    dateStart: Date
    dateEnd: Date
    isStatus: boolean
    isDelete?: boolean,
    idUser: number
}

export interface IStatus {
    message: string
}
