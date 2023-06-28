import type { NextPage } from 'next'
import { Text, Row, Col, Grid, Link, Button, Spacer, Container } from '@nextui-org/react';
import { NavbarWrapper } from '@/components/navbar/Navbar';
import { AddProfile } from '@/components/profile/AddProfile';
import { EditPencil, Cancel } from 'iconoir-react';
import { useQuery } from '@apollo/client';
import { GetProfilesByUser } from '@/graphql/Profile';
import { Profile } from '@/components/profile/Profile';
import { useContext, useEffect, useState } from 'react';
import { Profile as ProfileModel } from '@/models/Client';
import { ProfileContext } from '@/context/profile';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/auth';

interface RequestType {
    profileByUser: ProfileModel[],
}

const ProfilesPage: NextPage = () => {

    const {replace} = useRouter()
    const {user} = useContext(AuthContext)
    
    const { data } = useQuery<RequestType>(GetProfilesByUser,{
        pollInterval: 1000
    });
    const [edit,setEdit] = useState(false);
    const { setActiveProfile } = useContext(ProfileContext)

    useEffect( ( ) => {
        setActiveProfile(undefined)
    }, [])

  return (
    <>
        <NavbarWrapper type = {false} />
        <Grid.Container>
            <Grid>
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
            </Grid>
            <Grid>
                <Button 
                    color="error" flat
                    css={{position: 'initial', right: '10px', marginTop: '20px', p:'$8'}}
                    onPress={ () => setTimeout(() => replace(`/app/user/${user?.id}`), 700)}
                >
                    <Text h4>
                        Modificar Usuario
                    </Text>
                </Button>
            </Grid>
        </Grid.Container>
        <Grid.Container gap={4} justify='center' alignItems='center' css={{minWidth:'auto', minHeight:'80vh'}}>
            {
                data?.profileByUser.map( (profile, i)  => (
                    <Grid md={2} justify='center' alignItems='center' key={profile.id}>
                        <Profile
                            profile={profile}
                            nProfile={ i + 1 }
                            editable = { edit }
                        />
                    </Grid>
                ))
            }
            {
                (data?.profileByUser.length === 5)
                    ? <></>
                    :   <Grid md={2} justify='center' alignItems='center'>
                            <AddProfile/>
                        </Grid>
            }
        </Grid.Container>
    </> 
  )
}

export default ProfilesPage
