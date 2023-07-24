import { Card, Grid, Progress, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react'

interface Props {
    url: string;
    title: string;
    rating: string;
    img: string;
    id?: string;
    progress?: number;
    maxProgress?: number;
}

export const MedioCard: FC<Props> = ({ url, title, rating, img, id, progress, maxProgress }) => {
    const { push } = useRouter()
    return (
        <Card
            isHoverable
            isPressable
            onPress={() => push(url + '/' + id)}
        >
            <Card.Body css={{ p: '0' }}>
                <Card.Image
                    src={img}
                    objectFit='cover'
                    css={{
                        maxWidth: 'fit-content',
                    }}
                    alt="Product Image"
                />
            </Card.Body>
            {
                (progress && maxProgress) &&
                <Card.Footer css={{ p: '0' }}>
                    <Progress size={'sm'} max={maxProgress} value={progress} css={{ width: '100%' }} squared />
                </Card.Footer>
            }
            {
                (!progress && !maxProgress) &&
                <Card.Footer
                    isBlurred
                    css={{
                        position: "absolute",
                        bottom: 0,
                        zIndex: 1,
                        bgBlur: "#0f111466",
                        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                        py: 2
                    }}
                >
                    <Grid.Container gap={0} direction='row'>
                        <Grid xs={9}>
                            <Text size={'$md'} color='#FFFFFF'> {title} </Text>
                        </Grid>
                        <Grid xs={3} css={{ width: '100%' }} direction='row' justify='center' alignItems='center'>
                            <Text size={'$md'} color='#FFFFFF'>
                                {rating} ⭐
                            </Text>
                        </Grid>
                    </Grid.Container>
                </Card.Footer>
            }
        </Card >
    )
}