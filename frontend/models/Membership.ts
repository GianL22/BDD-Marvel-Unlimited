

export interface Memberships{
    memberships: Membership[]
}

export interface Membership {
    id: string;
    price: number;
    type: string;
    description: string;
}

export interface MemberData{
    membership: Membership;
}