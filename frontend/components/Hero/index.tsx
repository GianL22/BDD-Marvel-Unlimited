import {Button, Divider, Image, Link, Text} from '@nextui-org/react';
import { Check } from 'iconoir-react';
import {Box, Flex} from '../containers'

export const Hero = () => {
   return (
      <>
         <Flex
            css={{
               'gap': '$3',
               'px': '$6',
               'flexDirection': 'column',
               'alignContent': 'center',
               'justifyContent': 'center',
               'alignItems': 'center',
               'width': '100%',
               '@sm': {
                  flexDirection: 'row',
                  mt: '$20',
               },
            }}
            justify={'center'}
         >
            <Box
               css={{
                  pt: '$12',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '$5',
               }}
            >
               <Box
                  css={{
                     maxWidth: '600px',
                  }}
               >
                  <Text
                     h1
                     css={{
                        display: 'inline',
                     }}
                  >
                     DESCUBRE EL PODER DEL{' '}
                  </Text>
                  <Text
                     h1
                     css={{
                        display: 'inline',
                     }}
                     color="primary"
                  >
                     UNIVERSO MARVEL
                  </Text>
               </Box>

               <Text
                  css={{
                     color: '$accents8',
                     maxWidth: '570px',
                  }}
                  size={'$lg'}
               >
                    Disfrutarás de información completa sobre tus peliculas, series, videojuegos  y
                    personajes favoritos.
                    Descubre los secretos del Universo Marvel y vive la emoción.
               </Text>

               <Flex
                  css={{
                     gap: '$8',
                     pt: '$2',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
                  wrap={'wrap'}
               >
                  <Link href='/auth/register'>
                        <Button>
                           ¡Únete a la Aventura!
                        </Button>
                  </Link>
               </Flex>
               <Flex
                  wrap={'wrap'}
                  css={{
                     'gap': '$8',
                     'py': '$7',
                     '@sm': {
                        py: '$4',
                     },
                  }}
               >
                  <Flex
                     css={{
                        color: '$accents7',
                        alignItems: 'center',
                     }}
                  >
                     <Check color='green' /> Mejor contenido.
                  </Flex>
                  <Flex
                     css={{
                        color: '$accents7',
                        alignItems: 'center',
                     }}
                  >
                     <Check color='green' /> Prueba gratuita .
                  </Flex>
                  <Flex
                     css={{
                        color: '$accents7',
                        alignItems: 'center',
                     }}
                  >
                     <Check color='green' /> Cancelar en cualquier momento.
                  </Flex>
               </Flex>
            </Box>
            <Box>
               <Image 
                    src="/Marvel_Universe.jpg"
                    width={'775px'} 
                    objectFit="contain" 
                    showSkeleton
                    containerCss={{
                        borderRadius: '5%',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                        overflow: 'hidden',
                    }}
                />
            </Box>
         </Flex>
         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$10'}}
         />
      </>
   );
};