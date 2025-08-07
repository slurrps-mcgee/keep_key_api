export interface User {
    id?: string;
    email: string;
    password: string;
    salt: string;
    created_at: string | undefined;
    updated_at: string | undefined;
}
