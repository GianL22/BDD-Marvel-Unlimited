import { DataResponse, Hero, Villain } from "@/models/Character";
import { Person } from "@/models/Information";
import { Medio } from "@/models/Medio";
import { Characters, ResponseToShow } from "@/pages/dashboard/characters";
import { MedioResponse } from "@/pages/dashboard/medios";

export const convertCharacters = (initialValues: DataResponse): { id: string; description: string }[] => {

    let characters: {id: string; description: string}[] = [];
    initialValues?.findCharacters.hero.forEach(hero => {
    const character = {
        id: hero.character.id,
        description: hero.nameHero
    };
    characters.push(character);
    });
    
    initialValues?.findCharacters.villain.forEach(villain => {
    const character = {
        id: villain.character.id,
        description: villain.nameVillain
    };
    characters.push(character);
    });
      
    initialValues?.findCharacters.civil.forEach(civil => {
    const character = {
        id: civil.character.id,
        description: civil.name + ' ' +civil.lastName
    };
    characters.push(character);
    });

    return characters;
}

export const convertToShow = (initialValues: ResponseToShow): Characters[] => {

    let characters: Characters[] = [];
    initialValues?.findCharacters.hero.forEach(hero => {
      const character = {
        ...hero,
        id: hero.character.id,
        type: "Heroe"
      };
      characters.push(character);
    });
  
    initialValues?.findCharacters.villain.forEach(villain => {
      const character = {
        ...villain,
        id: villain.character.id,
        type: "Villano"
      };
      characters.push(character);
    });
    
    initialValues?.findCharacters.civil.forEach(civil => {
      const character = {
        ...civil,
        id: civil.character.id,
        type: "Civil"
      };
      characters.push(character);
    });

    return characters;
}

export const convertMedioToShow = (initialValues: MedioResponse): Medio[] => {

  let medios: Medio[] = [];
  initialValues?.media.movies.forEach(movie => {
    const date = movie.releaseDate.split('-')
    const medio = {
      ...movie,
      releaseDate: `${date[2]}-${date[1]}-${date[0]}`,
      type: "Película"
    };
    medios.push(medio);
  });

  initialValues?.media.series.forEach(serie => {
    const date = serie.releaseDate.split('-')
    const medio = {
        ...serie,
        releaseDate: `${date[2]}-${date[1]}-${date[0]}`,
        type: "Serie"
    };
    medios.push(medio);
  });

  initialValues?.media.videoGames.forEach(videoGame => {
    const date = videoGame.releaseDate.split('-')
    const medio = {
        ...videoGame,
        releaseDate: `${date[2]}-${date[1]}-${date[0]}`,
        type: "Video-Juego"
    };
    medios.push(medio);
  });

  return medios;
}

export const convertForCharacters = (creators: Person[], hero: Hero[], villain: Villain[]) => {
  const heroes = hero.map(({ nameHero, character }) => ({
    id: character.id,
    description: nameHero,
  }));
  const villains = villain.map(({ nameVillain, character }) => ({
    id: character.id,
    description: nameVillain,
  }));
  const creatorsData = creators.map(creator => {
    return {
      id: creator.id,
      description: creator.name + ' ' + creator.lastName
    };
  });
  
  return{
    heroes,
    villains,
    creatorsData
  }
}