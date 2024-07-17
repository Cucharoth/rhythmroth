export interface User {
    id: string | null;
    userName: string | null;
    email: string | null;
    profileImg: string | null;
} 

export interface Session {
    user: User | null;
}