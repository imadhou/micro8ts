import { UserEntity } from "./UserEntity";

export interface JoueurEntity {
    id: string;
    user: UserEntity | null;
    post: string;
    goals: number;
    assists: number;
}

