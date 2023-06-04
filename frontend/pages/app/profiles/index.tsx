import type { NextPage } from 'next'
import { Text, Row, Col, Grid, Link, Button, Spacer, Container } from '@nextui-org/react';
import { Flex } from '@/components/containers';
import { Profile } from '@/components/profile/Profile';
import { NavbarWrapper } from '@/components/navbar/Navbar';
import { AddProfile } from '@/components/profile/AddProfile';


const ProfilesPage: NextPage = () => {
  return (
    <>
        <NavbarWrapper type = {false} />
        {/* <Container justify='center' alignItems='center' alignContent='center'> */}
            <Grid.Container gap={0} justify='center' alignItems='center' css={{minWidth:'auto', minHeight:'80vh'}}>
                <Grid md={2} justify='center' alignItems='center'>
                    <Profile
                        img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                        nickname='MiPerfil'
                        nProfile={1}
                    />
                </Grid>
                <Grid md={2} justify='center' alignItems='center'>
                    <Profile
                        img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                        nickname='MiPerfil'
                        nProfile={1}
                    />
                </Grid>
                <Grid md={2} justify='center' alignItems='center'>
                    <Profile
                        img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                        nickname='MiPerfil'
                        nProfile={1}
                    />
                </Grid>
                <Grid md={2} justify='center' alignItems='center'>
                    <Profile
                        img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                        nickname='MiPerfil'
                        nProfile={1}
                    />
                </Grid>
                <Grid md={2} justify='center' alignItems='center'>
                    <Profile
                        img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                        nickname='MiPerfil'
                        nProfile={1}
                    />
                </Grid>
                <Grid md={2} justify='center' alignItems='center'>
                    <AddProfile/>
                </Grid>

            </Grid.Container>
        {/* </Container> */}
        
    </> 
  )
}

export default ProfilesPage
