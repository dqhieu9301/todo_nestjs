export interface IUser {
    id?: number
    username: string
    password: string
    role?: number
}

export interface IPayloadUser {
    id: number,
    name: string,
}

export interface IStatus {
    message: string
}