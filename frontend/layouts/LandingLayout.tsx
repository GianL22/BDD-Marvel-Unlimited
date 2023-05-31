import { NavbarWrapper } from "../components/navbar/Navbar";
import { Box } from "../components/containers";
import Head from "next/head";

interface Props {
   title: string;
   description: string;
   children: React.ReactNode;
}

export const LandingLayout = ( {children,title,description}: Props) => {
   return(
      <>   
         <Head>
            <title>{title}</title>
            <meta name='description' content={description}/>
         </Head>
         <NavbarWrapper 
            type = {true}
         />
         <Box
            css={{
               maxW: '100%',
               background: '$background',
               height: '100vh',
            }}
         >
            {children}
         </Box>
      </>
   )
};