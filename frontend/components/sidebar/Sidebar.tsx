import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from './sidebar.styles';
import { SidebarItem } from './SidebarItem';
import { Box, Flex } from '../containers';
import { ThemeSwitcher } from '../navbar/ThemeSwitcher';
import { Search, Gamepad, Tv, HomeSimpleDoor, Movie, List, OpenBook, CoinsSwap } from 'iconoir-react';
import { Text, Link, Avatar, Tooltip, Button} from '@nextui-org/react';
import { ProfileContext } from '@/context/profile';
import { MenuItemsApp } from './menuItems-app';
import { MenuItemsDashboard } from './menuItems-dashboard';

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
                  {
                     (router.pathname.includes('app'))
                        ? <MenuItemsApp />
                        : <MenuItemsDashboard />
                  }
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
