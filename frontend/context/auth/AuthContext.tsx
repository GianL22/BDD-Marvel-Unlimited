import { createContext } from 'react';
import { Client } from '../../models/Client';
import { CreditCardInput, SignupInput, SuscriptionInput } from '@/models/Signup';

interface ContextProps {
    isLoggedIn: boolean;
    user?: Client;
    login: (email: string, password: string) => Promise<void>;
    register: (signUpInput: SignupInput, createCardInput: CreditCardInput, suscriptionInput: SuscriptionInput ) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);