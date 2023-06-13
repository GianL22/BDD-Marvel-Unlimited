import { FC, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useMutation, useQuery } from '@apollo/client';
import { RevalidateToken } from '@/graphql';
import { Login, SignUp } from '@/graphql/User';
import { Client } from '@/models/Client';
import { authReducer } from './auth.reducer';
import { AuthContext } from './AuthContext';
import { CreditCardInput, SignupInput, SuscriptionInput } from '@/models/Signup';

export interface AuthState {
    isLoggedIn: boolean;
    user?: Client;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: React.ReactNode;
}



export const AuthProvider: FC<Props> = ({children}) => {

    const [state,dispatch] = useReducer(authReducer, initialState);
    
    useQuery(RevalidateToken,{
        onCompleted: (data) => {
            Cookies.set('token', data.revalite.token, { expires: 12 })
            dispatch({
                type: '[AUTH] Login',
                payload: data.revalite.user,
            });
        },
        onError: () =>{
            Cookies.remove('token');
        }
    });
    
    const [loginUser] = useMutation(Login);

    const login = async(email: string, password: string) => {

        const { data } = await loginUser({
            variables: {
                loginInput: {
                    email: email,
                    password: password,
                },
            },
        });
        
        Cookies.set('token', data.login.token, { expires: 12 });
        dispatch({
            type: '[AUTH] Login',
            payload: data.login.user
        });
    }

    const [createUser] = useMutation(SignUp);

    const register = async(signUpInput: SignupInput, createCardInput: CreditCardInput, suscriptionInput: SuscriptionInput) => {

        const { data } = await createUser({
            variables: {
                signupInput: {
                    ...signUpInput,
                },
                creditCardInput:{
                    ...createCardInput,
                },
                suscriptionInput:{
                    ...suscriptionInput
                }
            },
        });

        Cookies.set('token', data.signup.token, { expires: 12 });
        dispatch({
            type: '[AUTH] Login',
            payload: data.signup.user,
        });
    }

    const logout = () => {
        Cookies.remove('token');
        dispatch({
            type: '[AUTH] Logout'
        });
    }

    return (
        <AuthContext.Provider value={{...state,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
};