import { createContext } from 'react';
import { Client } from '../../models/Client';
import { CreditCardInput, SignupInput } from '@/models/Signup';

interface ContextProps {
    isLoggedIn: boolean;
    user?: Client;
    login: (email: string, password: string) => void;
    register: (signUpInput: SignupInput, createCardInput: CreditCardInput) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);