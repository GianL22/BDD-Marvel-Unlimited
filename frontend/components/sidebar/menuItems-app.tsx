import React from 'react';
import { SidebarItem } from './SidebarItem';
import { Search, Gamepad, Tv, HomeSimpleDoor, Movie, List, OpenBook, CoinsSwap } from 'iconoir-react';
import { useRouter } from 'next/router';

export const MenuItemsApp = () => {
    const router = useRouter();
   return (
      <>
        <SidebarItem
            title="Home"
            isActive={router.pathname === '/app'}
            href="/app"
            icon = { <HomeSimpleDoor />}
        />
        <SidebarItem
            title="Busqueda"
            isActive={router.pathname.includes('search')}
            href="/app/search"
            icon={<Search />}
        />
        <SidebarItem
            title="Películas"
            isActive={router.pathname.includes('movies')}
            href="/app/movies"
            icon={<Movie/>}
            />                        
        <SidebarItem
            title="Series"
            isActive={router.pathname.includes('series')}
            href="/app/series"
            icon={<Tv/>}
        />
        <SidebarItem
            title="VideoJuegos"
            isActive={router.pathname.includes('videogames')}
            href="/app/videogames"
            icon={<Gamepad/>}
        />
        <SidebarItem
            title="Mi Lista"
            isActive={router.pathname.includes('mylist')}
            href="/app/mylist"
            icon={<List/>}
        />
        <SidebarItem
            title="Reportes"
            isActive={router.pathname.includes('reports')}
            href="/app/reports"
            icon={<OpenBook/>}
        />

        <SidebarItem
            title="Suscripcion"
            isActive={router.pathname.includes('changesuscription')}
            href="/app/changesuscription"
            icon={<CoinsSwap/>}
        />
      
      </>
   );
};