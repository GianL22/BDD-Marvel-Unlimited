import type { NextPage } from 'next'
import { Text, Row, Col, Grid, Link, Button, Spacer, Container } from '@nextui-org/react';
import { NavbarWrapper } from '@/components/navbar/Navbar';
import { AddProfile } from '@/components/profile/AddProfile';
import { EditPencil, Cancel } from 'iconoir-react';
import { useQuery } from '@apollo/client';
import { GetProfilesByUser } from '@/graphql/Profile';
import { Profile } from '@/components/profile/Profile';
import { useEffect, useState } from 'react';
import { Profile as ProfileModel } from '@/models/Client';

interface RequestType {
    profileByUser: ProfileModel[],
}

const ProfilesPage: NextPage = () => {

    const { data } = useQuery<RequestType>(GetProfilesByUser,{
        pollInterval: 1000
    });
    console.log('Time')
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
