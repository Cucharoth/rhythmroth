export interface User {
    id: string | null;
    userName: string | null;
    email: string | null;
} 

export interface Session {
    user: User | null;
}