import {Button, Navbar, Spacer, Text} from '@nextui-org/react';
import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher';

export const NavbarWrapper = () => {
   return (
      <Navbar
         isBordered
         css={{
            'overflow': 'hidden',
            '& .nextui-navbar-container': {
               background: '$background',
               borderBottom: 'none',
            },
         }}
        variant='sticky'
        maxWidth='fluid'
      >
         <Navbar.Toggle 
            showIn="sm" 
         />
         <Navbar.Brand>
            <Spacer x={2}/>
            <Text 
               h1 
               css={{
                  textGradient: "45deg, #E62429 30%, #FECB00 100%",
               }}
               size='$4xl'
            >
               <Link href='/'>
                  MARVEL UNITED
               </Link>
            </Text>
         </Navbar.Brand>
         <Navbar.Content
            hideIn='sm'
            enableCursorHighlight
         >
            <Button 
               auto 
               ghost 
               bordered
            >
               LOGIN
            </Button>

            <ThemeSwitcher />
         </Navbar.Content>
      </Navbar>
   );
};