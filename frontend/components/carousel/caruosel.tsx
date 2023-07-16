import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { MedioCard } from '../medio/MedioCard';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface IMovie {
    title: string;
    poster: string;
    id: string;
    rating: { ratingAvg: number | null };
}

interface Props {
    medios: IMovie[];
    type: string;
}

export const Carousel: FC<Props> = ({ medios, type }) => {
    console.log(medios)
    return (
        <Swiper
            rewind={true}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }}
            navigation={true}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
        >
            {
                medios.map(medio => (
                    <SwiperSlide key={medio.id}>
                        <MedioCard
                            img={`/medios/${medio.poster}`}
                            rating={(medio.rating.ratingAvg) ? medio.rating.ratingAvg.toFixed(2) : 'N.C.'}
                            title={medio.title}
                            url={`/app/${type}`}
                            id={medio.id}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};