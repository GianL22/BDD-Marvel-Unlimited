import { createContext } from 'react';
import { Profile } from '@/models/Client';

interface ContextProps {
    activeProfile?: Profile;
    setActiveProfile : (profile : Profile | undefined) => void
}

export const ProfileContext = createContext({} as ContextProps);