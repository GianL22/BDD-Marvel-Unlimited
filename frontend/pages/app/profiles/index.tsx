import type { NextPage } from 'next'
import { Text, Row, Col, Grid, Link, Button, Spacer } from '@nextui-org/react';
import { Flex } from '@/components/containers';
import { Profile } from '@/components/profile/Profile';
import { NavbarWrapper } from '@/components/navbar/Navbar';
import { AddProfile } from '@/components/profile/AddProfile';


const ProfilesPage: NextPage = () => {
  return (
    <>
            <NavbarWrapper type = {false} />
            <Flex justify='center' align='center' css={{mt:'$32'}}>
                <Profile
                    img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                    nickname='MiPerfil'
                    nProfile={1}
                />
                <Profile
                    img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                    nickname='MiPerfil'
                    nProfile={1}
                />
                <Profile
                    img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                    nickname='MiPerfil'
                    nProfile={1}
                />
                <Profile
                    img='https://i.pinimg.com/originals/a6/68/88/a6688803321b0c08fef8071a47249184.jpg' 
                    nickname='MiPerfil'
                    nProfile={1}
                />
                <AddProfile/>
            </Flex>
    </> 
  )
}

export default ProfilesPage
