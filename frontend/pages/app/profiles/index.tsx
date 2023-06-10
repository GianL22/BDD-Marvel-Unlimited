import type { NextPage } from 'next'
import { Text, Row, Col, Grid, Link, Button, Spacer, Container } from '@nextui-org/react';
import { Flex } from '@/components/containers';
import { Profile } from '@/components/profile/Profile';
import { NavbarWrapper } from '@/components/navbar/Navbar';
import { AddProfile } from '@/components/profile/AddProfile';
import { EditPencil, Cancel } from 'iconoir-react';
import { useState } from 'react';


const ProfilesPage: NextPage = () => {
   const [edit,setEdit] = useState(false);
  return (
    <>
        <NavbarWrapper type = {false} />
        <Button 
            icon={(edit) ? <Cancel fontSize={'20px'}/> : <EditPencil fontSize={'20px'}/>}
            color="error" flat
            css={{position: 'fixed', right: '10px', marginTop: '20px', p:'$8'}}
            onClick={ () => setEdit(!edit) }
        >
            <Text h4>
                Editar
            </Text>
        </Button>
        <Grid.Container gap={0} justify='center' alignItems='center' css={{minWidth:'auto', minHeight:'80vh'}}>
            <Grid md={2} justify='center' alignItems='center'>
                <Profile
                    img='/profiles/1.png' 
                    nickname='MiPerfil'
                    nProfile={1}
                    editable = { edit }
                />
            </Grid>
            <Grid md={2} justify='center' alignItems='center'>
                <Profile
                    img='/profiles/2.png' 
                    nickname='MiPerfil'
                    nProfile={1}
                    editable = { edit }
                />
            </Grid>
            <Grid md={2} justify='center' alignItems='center'>
                <Profile
                    img='/profiles/3.png' 
                    nickname='MiPerfil'
                    nProfile={1}
                    editable = { edit }
                />
            </Grid>
            <Grid md={2} justify='center' alignItems='center'>
                <Profile
                    img='/profiles/4.png'  
                    nickname='MiPerfil'
                    nProfile={1}
                    editable = { edit }
                />
            </Grid>
            <Grid md={2} justify='center' alignItems='center'>
                <Profile
                    img='/profiles/5.png' 
                    nickname='MiPerfil'
                    nProfile={1}
                    editable = { edit }
                />
            </Grid>
            <Grid md={2} justify='center' alignItems='center'>
                <AddProfile/>
            </Grid>

        </Grid.Container>
    </> 
  )
}

export default ProfilesPage
