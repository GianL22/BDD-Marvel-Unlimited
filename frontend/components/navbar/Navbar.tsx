import {Button, Dropdown, Link, Navbar, Spacer, Switch, Text} from '@nextui-org/react';
import React from 'react';
//import {ModalLogin} from '../modal';
//import {icons} from './icons';
//import {AcmeLogo} from './logo';
import {useTheme as useNextTheme} from 'next-themes';
import {useTheme} from '@nextui-org/react';
//import {GithubIcon} from '../icons/GithubIcon';

export const NavbarWrapper = () => {
   const {setTheme} = useNextTheme();
   const {isDark, type} = useTheme();
   const collapseItems = [
      'Features',
      'Customers',
      'Pricing',
      'Company',
      'Legal',
   ];
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
         <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" showIn="sm" />
            {/* <Text b h2 hideIn="lg" >
               MARVEL UNITED
            </Text> */}
            <Spacer x={4}/>
            <Text h1 
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

         <Navbar.Collapse>
            {collapseItems.map((item, index) => (
               <Navbar.CollapseItem key={item}>
                  <Link
                     color="inherit"
                     css={{
                        minWidth: '100%',
                     }}
                     href="#"
                  >
                     {item}
                  </Link>
               </Navbar.CollapseItem>
            ))}
            <Navbar.CollapseItem>
               <Link
                  color="inherit"
                  css={{
                     minWidth: '100%',
                  }}
                  target="_blank"
                  href="https://github.com/Siumauricio/landing-template-nextui"
               >
               </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
               <Switch
                  checked={isDark}
                  onChange={(e) =>
                     setTheme(e.target.checked ? 'dark' : 'light')
                  }
               />
            </Navbar.CollapseItem>
         </Navbar.Collapse>
         <Navbar.Content>
            <Navbar.Item>
               <Button 
                    auto 
                    flat 
                    href="#"
                    bordered
                >
                  LOGIN
               </Button>
            </Navbar.Item>
            <Navbar.Item hideIn={'xs'}>
               <Link
                  color="inherit"
                  css={{
                     minWidth: '100%',
                  }}
                  target="_blank"
                  href="https://github.com/Siumauricio/landing-template-nextui"
               >
               </Link>
            </Navbar.Item>
            <Navbar.Item hideIn={'xs'}>
               <Switch
                  checked={isDark}
                  onChange={(e) =>
                     setTheme(e.target.checked ? 'dark' : 'light')
                  }
               />
            </Navbar.Item>
         </Navbar.Content>
      </Navbar>
   );
};