import React from 'react';
import { SidebarItem } from './SidebarItem';
import { Search, Gamepad, Tv, HomeSimpleDoor, Movie, List, OpenBook, CoinsSwap, CinemaOld, Building, City, Yoga, Running, Archery } from 'iconoir-react';
import { useRouter } from 'next/router';

export const MenuItemsDashboard = () => {
    const router = useRouter();
   return (
      <>
        <SidebarItem
            title="Personajes"
            isActive={router.pathname.includes('characters')}
            href="/dashboard/characters"
            icon = { <Yoga />}
        />
        <SidebarItem
            title="Medios"
            isActive={router.pathname.includes('medios')}
            href="/dashboard/medios"
            icon={<CinemaOld />}
        />
        <SidebarItem
            title="Organizaciones"
            isActive={router.pathname.includes('organizations')}
            href="/dashboard/organizations"
            icon={<Building/>}
            />                        
        <SidebarItem
            title="Sedes"
            isActive={router.pathname.includes('headquarters')}
            href="/dashboard/headquarters"
            icon={<City/>}
        />
        <SidebarItem
            title="Poderes"
            isActive={router.pathname.includes('powers')}
            href="/dashboard/powers"
            icon={<Running/>}
        />
        <SidebarItem
            title="Objetos"
            isActive={router.pathname.includes('objects')}
            href="/dashboard/objects"
            icon={<Archery/>}
        />
        {/* <SidebarItem
            title="Algo más"
            isActive={router.pathname.includes('reports')}
            href="/dashboard/objects"
            icon={<OpenBook/>}
        /> */}
      </>
   );
};