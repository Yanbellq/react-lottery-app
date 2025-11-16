export interface Participant {
    id: string;
    name: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
}

export interface FormErrors {
    name?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
}

export type SortField = 'name' | 'dateOfBirth';
export type SortOrder = 'asc' | 'desc';
