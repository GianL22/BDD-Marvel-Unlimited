import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Grid, Image, Input, Link, Loading, Radio, Spacer, Text, useTheme } from '@nextui-org/react'
import { LandingLayout } from '../../../layouts';
import { Box, Flex } from '../../../components/containers';

const MembershipPage = () => {
    return(
      <LandingLayout
        title='Plans'
        description='Seleccion Membresia'
      >
      </LandingLayout>

    )
}
export default MembershipPage