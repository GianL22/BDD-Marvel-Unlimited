import React from 'react';
import { SidebarItem } from './SidebarItem';
import { Search, Gamepad, Tv, HomeSimpleDoor, Movie, List, OpenBook, CoinsSwap } from 'iconoir-react';
import { useRouter } from 'next/router';

export const MenuItemsDashboard = () => {
    const router = useRouter();
   return (
      <>
        <SidebarItem
            title="Personajes"
            isActive={router.pathname.includes('characters')}
            href="/dashboard/characters"
            icon = { <HomeSimpleDoor />}
        />
        <SidebarItem
            title="Medios"
            isActive={router.pathname.includes('medios')}
            href="/dashboard/medios"
            icon={<Search />}
        />
        <SidebarItem
            title="Organizaciones"
            isActive={router.pathname.includes('organizations')}
            href="/dashboard/organizations"
            icon={<Movie/>}
            />                        
        <SidebarItem
            title="Sedes"
            isActive={router.pathname.includes('headquarters')}
            href="/dashboard/headquarters"
            icon={<Tv/>}
        />
        <SidebarItem
            title="Poderes"
            isActive={router.pathname.includes('powers')}
            href="/dashboard/powers"
            icon={<Gamepad/>}
        />
        <SidebarItem
            title="Objetos"
            isActive={router.pathname.includes('objects')}
            href="/dashboard/objects"
            icon={<List/>}
        />
        <SidebarItem
            title="Algo más"
            isActive={router.pathname.includes('reports')}
            href="/dashboard/objects"
            icon={<OpenBook/>}
        />
      </>
   );
};