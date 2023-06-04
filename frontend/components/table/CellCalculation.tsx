import { FC } from "react"
import { Grid, Text } from "@nextui-org/react"
import { FastArrowRight } from 'iconoir-react'

interface Props{
    label: string,
    value: string,
}

export const CellCalculation: FC<Props> = ({label, value}) => {
  return (
    <Grid.Container direction='row' css={{ borderBottom:'$primary 4px solid',  width:'100%' }}>
        <Grid xs={1} alignItems="center" >
            <Text b color='$primary'>   
                <FastArrowRight/>
            </Text>
        </Grid>
        <Grid xs={11} alignItems="center" css={{pb:'$5', pl:'$5', width:'max-content'}}>
            <Text b size='$2xl'>
                {label}: {value}
            </Text>
        </Grid>
    </Grid.Container>
  )
}
