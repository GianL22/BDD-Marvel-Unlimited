import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from './sidebar.styles';
import { Box, Flex } from '../containers';
import { ThemeSwitcher } from '../navbar/ThemeSwitcher';
import { Text, Link, Avatar, Tooltip } from '@nextui-org/react';
// import { ProfileContext } from '@/context/profile';
import { MenuItemsApp } from './menuItems-app';
import { MenuItemsDashboard } from './menuItems-dashboard';
import { AuthContext } from '@/context/auth';
import Cookies from 'js-cookie';

export const SidebarWrapper = () => {
   const router = useRouter();
   const [collapsed, setCollapsed] = useState(false)
   // const { activeProfile } = useContext(ProfileContext)
   const { user } = useContext(AuthContext)

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
         {collapsed && <Sidebar.Overlay onClick={() => setCollapsed(prev => !prev)} />}
         <Sidebar
            collapsed={collapsed}
            css={{
               width: 'max-content'
            }}
         >
            <Sidebar.Header>
               <Text
                  h1
                  css={{
                     //textGradient: "45deg, #E62429 30%, #FECB00 100%",
                     pt: '$16', pb: '$16'
                  }}
                  size='$4xl'
               >
                  <Link href='/app' css={{ color: '$primary' }}>
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
                  <Flex css={{ gap: '$8' }} direction={'column'} wrap={'wrap'}>
                     {
                        (router.pathname.includes('dashboard'))
                           ? <MenuItemsDashboard />
                           : <MenuItemsApp />
                     }
                  </Flex>
               </Sidebar.Body>

               <Sidebar.Footer css={{ m: '$10' }}>
                  <Flex direction={'column'} wrap={'wrap'} justify={'center'} css={{ gap: '$8' }}>
                     <ThemeSwitcher />
                     {
                        (router.pathname.includes('dashboard'))
                           ? <></>
                           : <Link href='/app/profiles'>
                              <Tooltip content={'Profile'} rounded color="primary" placement='rightStart'>
                                 <Avatar
                                    size="xl"
                                    src={user?.profiles.find(profile => profile.id === Cookies.get('activeProfile'))?.avatar}
                                    color="primary"
                                    bordered
                                 />
                              </Tooltip>
                           </Link>
                     }
                  </Flex>
               </Sidebar.Footer>
            </Flex>
         </Sidebar>
      </Box>
   );
};
