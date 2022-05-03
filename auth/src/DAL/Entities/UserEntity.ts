export interface UserEntity{
    id?: string;
    name: string;
    surname: string;
    pseudo: string;
    address: string;
    phone: number;
    email: string;
    password?: string;
}