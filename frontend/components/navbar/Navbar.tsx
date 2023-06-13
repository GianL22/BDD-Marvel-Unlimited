import {Button, Navbar, Spacer, Text} from '@nextui-org/react';
import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { useRouter } from 'next/router';

interface Props {
   type: boolean;
}

export const NavbarWrapper = ( {type}: Props) => {
   const { replace }  = useRouter()
   const { logout } =useContext(AuthContext);
   const handleLogout = () =>{
      logout();
      replace('/')
   }
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
            // hideIn='sm'
            enableCursorHighlight
         >
            <ThemeSwitcher />
            {
               ( Cookies.get('token') )
                  ? <Button 
                        auto 
                        ghost 
                        bordered
                        onPress={ handleLogout }
                     >
                        LOGOUT
                     </Button>
                  : <></>
            }
            {
               (type)
                  ? (
                     <Link
                        href={'/auth/login'}
                     >
                        <Button 
                           auto 
                           ghost 
                           bordered
                        >
                           LOGIN
                        </Button>
                     </Link>
                  )
                  : null
            }
         </Navbar.Content>
      </Navbar>
   );
};