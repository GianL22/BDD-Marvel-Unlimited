import {Text, Link} from '@nextui-org/react';
import React from 'react';
import { Flex } from '../containers/Flex';

interface Props {
   title: string;
   icon?: React.ReactNode;
   isActive?: boolean;
   href?: string;
   onClick?: () => void;
}

export const SidebarItem = ({icon, title, isActive, href = '', onClick}: Props) => {
   
   const handleClick = () => window.innerWidth < 768 && onClick && onClick();
   
   return (
      <Link
         href={href}
         css={{
            color: '$accents9',
            'minWidth': '100%',
            'width': '100%',

         }}
      >
         <Flex
            onClick={handleClick}
            css={{
               'gap': '$6',
               'minWidth': '100%',
               'width': '100%',
               'minHeight': '44px',
               'height': '100%',
               'alignItems': 'center',
               'px': '$7',
               'borderRadius': '0px',
               'cursor': 'pointer',
               'transition': 'all 0.15s ease',
               '&:active': {
                  transform: 'scale(0.98)',
               },
               ...(isActive
                  ? {
                        '& svg path': {
                           color:'$primary'
                        },
                        borderLeft:'$primary 4px solid',
                     }
                  : {'&:hover': {bg: '$accents2'}}),
            }}
            align='center'
         >
            {icon}
            <Text
               span
               weight='normal'
               size='$2xl'
               css={{
                  color: '$accents9', 
                  ...(isActive && {color: '$primary'}),
                  fontWeight:'bold'
               }}
            >
               {title}
            </Text>
         </Flex>
      </Link>
   );
};