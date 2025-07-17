export interface Chat {
    _id: string;
    name: string;
    description: string;
    isGroup: boolean;
    members: string[];
    createdAt: string; 
}
