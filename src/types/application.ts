export interface Application {
    id?: string
    created_at?: string

    // Personal Information
    full_name: string
    email: string
    age: number
    city: string
    institution: string
    phone: string

    // Program Questions
    motivation: string
    business_idea: string
    availability_confirmed: boolean
    weekly_hours: '2-5h' | '5-10h' | '10+h'
    previous_experience?: string
    community?: string

    // Status
    status?: 'pending' | 'reviewing' | 'accepted' | 'rejected'
}
