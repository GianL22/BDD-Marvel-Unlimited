import { NavbarWrapper } from "../components/navbar/Navbar";
import { Box } from "../components/containers";
import Head from "next/head";

interface Props {
   title: string;
   description: string;
   children: React.ReactNode;
}

export const AuthLayout = ( {children,title,description}: Props) => {
   return(
      <>   
         <Head>
            <title>{title}</title>
            <meta name='description' content={description}/>
         </Head>
         <NavbarWrapper 
            type = {false}
         />
         <Box
            css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                height: '90vh',
                width: '100vw',
            }}
         >
            {children}
         </Box>
      </>
   )
};