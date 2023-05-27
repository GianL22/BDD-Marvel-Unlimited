import { NavbarWrapper } from "../components/navbar/Navbar";
import { Box } from "../components/containers";
import Head from "next/head";

interface Props {
   title: string;
   description: string;
   children: React.ReactNode;
}

export const SubSignupLayout = ( {children,title,description}: Props) => {
   return(
      <>   
         <Head>
            <title>{title}</title>
            <meta name='description' content={description}/>
         </Head>
         <Box
            css={{
               maxW: '100%',
               background: '$background',
            }}
         >
            <NavbarWrapper />
            {children}
         </Box>
      </>
   )
};