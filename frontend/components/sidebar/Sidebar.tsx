import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from './sidebar.styles';
import { SidebarItem } from './SidebarItem';
import { Box, Flex } from '../containers';
import { LogoutButton } from './LogoutButton';
import { ThemeSwitcher } from '../navbar/ThemeSwitcher';
import { Search, Gamepad, Tv, HomeSimpleDoor, Movie, List, OpenBook, CoinsSwap } from 'iconoir-react';
import { Text, Link, Avatar, Tooltip, Button} from '@nextui-org/react';
import Cookies from 'js-cookie';
import { ProfileContext } from '@/context/profile';

export const SidebarWrapper = () => {
   // const {user} = useContext(AuthContext);
   const router = useRouter();
   const [collapsed,setCollapsed] = useState(false)
   const {activeProfile} = useContext(ProfileContext)

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

                  <SidebarItem
                     title="Suscripcion"
                     isActive={router.pathname.includes('changesuscription')}
                     href="/app/changesuscription"
                     icon={<CoinsSwap/>}
                  />
               </Sidebar.Body>

               <Sidebar.Footer>
                  <ThemeSwitcher/>
                  {/*  Provisioal */}
                  <Link href='/app/profiles'> 
                     <Tooltip content={'Profile'} rounded color="primary">

                        <Avatar
                           size="xl"
                           src={activeProfile?.avatar}
                           color="primary"
                           bordered
                           />
                     </Tooltip>
                  </Link>                                    
                  {/* <LogoutButton/> */}
               </Sidebar.Footer>
            </Flex>
         </Sidebar>
      </Box>
   );
};
