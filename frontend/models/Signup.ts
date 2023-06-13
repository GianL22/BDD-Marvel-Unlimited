

export interface SignupInput{
    username: string
    name: string
    lastName: string;
    email: string;
    password: string;
    birthdate: string;
    creditCard: {
        cardNumber: string;
        ownerName: string;
        ownerLastName: string;
        expiration: string;
        cvv: number;
    }
}

export interface CreditCardInput{

    cardNumber: string;
    ownerName: string;
    ownerLastName: string;
    expiration: string;
    cvv: number;
}