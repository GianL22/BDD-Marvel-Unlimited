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
            isActive={router.pathname === '/character'}
            href="/dashboard/character"
            icon = { <HomeSimpleDoor />}
        />
        <SidebarItem
            title="Medios"
            isActive={router.pathname.includes('search')}
            href="/dashboard/organizations"
            icon={<Search />}
        />
        <SidebarItem
            title="Organizaciones"
            isActive={router.pathname.includes('movies')}
            href="/dashboard/movies"
            icon={<Movie/>}
            />                        
        <SidebarItem
            title="Sedes"
            isActive={router.pathname.includes('series')}
            href="/dashboard/series"
            icon={<Tv/>}
        />
        <SidebarItem
            title="Poderes"
            isActive={router.pathname.includes('videogames')}
            href="/dashboard/videogames"
            icon={<Gamepad/>}
        />
        <SidebarItem
            title="Objetos"
            isActive={router.pathname.includes('mylist')}
            href="/dashboard/powers"
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