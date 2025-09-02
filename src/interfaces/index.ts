

export interface IUser {
    id : string;
    email: string;
    password: string;
    username: string;
    role: "user" | "admin";
    updated_at: string;
    created_at: string;
    is_active: boolean;
}