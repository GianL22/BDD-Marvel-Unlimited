import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from './sidebar.styles';
import { SidebarItem } from './SidebarItem';
import { Box, Flex } from '../containers';
import { LogoutButton } from './LogoutButton';
import { ThemeSwitcher } from '../navbar/ThemeSwitcher';
import { Search, Gamepad, Tv, HomeSimpleDoor, Movie, List, OpenBook } from 'iconoir-react';
import { Text, Link, Avatar, Tooltip } from '@nextui-org/react';

export const SidebarWrapper = () => {
   // const {user} = useContext(AuthContext);
   const router = useRouter();
   const [collapsed,setCollapsed] = useState(false)
   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 1000,
            position: 'sticky',
            top: '0',
            boxSizing: 'border-box'
         }}
      >
         {collapsed && <Sidebar.Overlay onClick={()=>setCollapsed(prev => !prev)}/>}
         <Sidebar 
            collapsed={collapsed} 
            css={{
               width:'max-content'
            }}
         >
            <Sidebar.Header>
               <Text 
                  h1 
                  css={{
                     //textGradient: "45deg, #E62429 30%, #FECB00 100%",
                     pt:'$16', pb:'$16'
                  }}
                  size='$4xl'
               >
                  <Link href='/app' css={{color:'$primary'}}>
                     MARVEL UNITED
                  </Link>
               </Text>
            </Sidebar.Header>
            <Flex
               direction='column'
               justify='between'
               css={{
                  height: '100vh', 
               }}
            >
               <Sidebar.Body className="body sidebar" >
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
               </Sidebar.Body>

               <Sidebar.Footer>
               <Tooltip content={'Profile'} rounded color="primary">
                  <Avatar
                     size="xl"
                     src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                     color="primary"
                     bordered
                  />
               </Tooltip>
                  {/* <ThemeSwitcher/> */}
                  {/* <LogoutButton/> */}
               </Sidebar.Footer>
            </Flex>
         </Sidebar>
      </Box>
   );
};
