import Image from "next/image";
import React, { FC } from "react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import 'tailwindcss/tailwind.css'
import { Link } from "@nextui-org/react";
import { useRouter } from "next/router";

export interface IMovie {
    title: string;
    poster: string;
    id: string;
}

interface Props {
    medios: IMovie[];
    type: string
}

export const Carousel: FC<Props> = ({ medios, type }) => {

    const {push} = useRouter()

    const scrollLeft = () => {
        document.getElementById(type)!.scrollLeft -= window.innerWidth;
    }

    const scrollRight = () => {
        document.getElementById(type)!.scrollLeft += window.innerWidth;
    }

    return (
        <div className="flex h-fit relative px-16">
            <button onClick={scrollLeft} className="px-1 z-20 absolute h-full left-2">
                < NavArrowLeft className="mx-auto text-4xl hover:scale-150 transition ease-out" />
            </button>

            <div id={type} className="flex gap-2 overflow-x-hidden scroll-smooth">
                {medios.map((medio) => (
                    <div key={medio.poster} className=" shrink-0 h-[220px] w-[350px] z-0 relative group ">
                        <h2 className="text-white text-xl font-bold absolute bottom-2 left-5 capitalize hidden group-hover:block z-20">{medio.title}</h2>
                        <Image
                            className="rounded object-cover h-full w-full group-hover:brightness-50 transition-all ease-out"
                            src={`/medios/${medio.poster}`}
                            alt={medio.title}
                            width={500}
                            height={300}
                            onClick={ () => push(`/app/${type}/${medio.id}`)}
                        />
                    </div>
                ))}
            </div>
            <button onClick={scrollRight} className="px-1 z-20 absolute h-full right-2">
                <NavArrowRight className="mx-auto text-4xl hover:scale-150 transition ease-out" />
            </button>
        </div>
    );
};