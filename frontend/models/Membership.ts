

export interface Memberships{
    memberships: Membership[]
}

interface Membership {
    id: string;
    price: number;
    type: string;
    description: string;
}

export interface MemberData{
    membership: Membership;
}