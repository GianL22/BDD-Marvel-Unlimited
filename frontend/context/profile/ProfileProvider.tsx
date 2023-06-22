import { FC, useState } from 'react';
import { Profile } from '@/models/Client';
import { ProfileContext } from './ProfileContext';


interface Props {
    children: React.ReactNode;
}


export const ProfileProvider: FC<Props> = ({children}) => {
    const [activeProfile, setActiveProfile] = useState<Profile | undefined>(undefined)
    return (
        <ProfileContext.Provider value={{activeProfile, setActiveProfile}}>
            {children}
        </ProfileContext.Provider>
    )
};