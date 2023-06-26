import { Injectable, BadRequestException, MethodNotAllowedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character, Civil, Hero, Villain } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterInput, CreateCivilInput, CreateHeroInput, CreateVillainInput, UpdateCivilInput, UpdateHeroInput, UpdateVillainInput } from './dto/inputs';
import { CharactersResponse } from './types/characters-response.type';
import { Nacionality } from 'src/nacionality/entities/nacionality.entity';
import { Objects } from 'src/objects/entities';
import { RelationsInput } from './dto/inputs/create-character.input';
import { Color } from 'src/colors/entities/color.entity';
import { Occupation } from 'src/occupations/entities/occupation.entity';

@Injectable()
export class CharactersService {

  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
    
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    
    @InjectRepository(Villain)
    private readonly villainRepository: Repository<Villain>,
    
    @InjectRepository(Civil)
    private readonly civilRepository: Repository<Civil>,

    @InjectRepository(Nacionality)
    private readonly nacionalitiesRepository: Repository<Nacionality>,

    @InjectRepository(Objects)
    private readonly objectsRepository: Repository<Objects>,

    @InjectRepository(Color)
    private readonly colorsRepository: Repository<Color>,

    @InjectRepository(Occupation)
    private readonly occupationsRepository: Repository<Occupation>,
  ){}

  //* Creación de Personaje

  private changeDataType(nacionalities:RelationsInput[] = [] , objects: RelationsInput[] = [], occupations: RelationsInput[] = []){
    const saveNacionalities: Nacionality[] = nacionalities.map((nacionality) => {
      return this.nacionalitiesRepository.create( {id: nacionality.id} )
    });
    const saveObjects: Objects[] = objects.map((objects) => {
      return this.objectsRepository.create( {id: objects.id} )
    });
    const saveOccupations: Occupation[] = occupations.map((occupation) => {
      return this.occupationsRepository.create( {id: occupation.id} )
    });
    return {
      saveNacionalities,
      saveObjects,
      saveOccupations
    }
  }

  async createCharacter(createCharacterInput: CreateCharacterInput): Promise<Character> {
    try {
      const { eyeColor, hairColor, nacionalities, objects, occupations} = createCharacterInput
      const character = this.charactersRepository.create({
        hairColor: hairColor, 
        eyeColor:  eyeColor,
      })
      const {saveNacionalities, saveObjects, saveOccupations} = this.changeDataType(nacionalities,objects, occupations)
      character.nacionalities = [...saveNacionalities];
      character.objects = [...saveObjects];
      character.occupations = [...saveOccupations];
      return await this.charactersRepository.save( character );
    } catch (error) {
      throw new BadRequestException(`Ha ocurrido un error al crear el personaje!`)
    }
  }

  async createVillain(createVillainInput: CreateVillainInput, createCharacterInput: CreateCharacterInput): Promise<Villain> {
    try {
      const villainExist = await this.villainRepository.findOne({where: {nameVillain: createVillainInput.nameVillain}})
      if(villainExist)
        throw new Error
      const character = await this.createCharacter( createCharacterInput )
      const villain = this.villainRepository.create({
        ...createVillainInput,
        characterId: character.id,
      })
      return await this.villainRepository.save( villain )
    } catch (error) {
      throw new BadRequestException(`Ha ocurrido un error al crear el Villano!`)
    }
  }

  async createHero(createHeroInput: CreateHeroInput, createCharacterInput: CreateCharacterInput): Promise<Hero> {
    try {
      const heroExist = await this.heroRepository.findOne({
        where : [
            { nameHero: createHeroInput.nameHero },
            { archEnemy: createHeroInput.archEnemy },
        ],
      })
      if(heroExist)
        throw new Error
      const character = await this.createCharacter( createCharacterInput )
      const newHero = this.heroRepository.create({
        ...createHeroInput,
        characterId: character.id,
      })
      const saveColors: Color[] = createHeroInput.suitColors.map((colors) => {
        return this.colorsRepository.create( {id: colors.id} )
      });
      newHero.suitColors = [...saveColors]
      return await this.heroRepository.save( newHero )
    } catch (error) {
      throw new BadRequestException(`Ha ocurrido un error al crear el Hero!`)
    }
  }

  async createCivil(createCivilInput: CreateCivilInput, createCharacterInput: CreateCharacterInput): Promise<Civil> {
    try {
      const civilExist = await this.civilRepository.findOne({where: {name: createCivilInput.name, lastName: createCivilInput.lastName}})
      if(civilExist)
        throw new Error
      const character = await this.createCharacter( createCharacterInput )
      const {heroId = null, villainId=null, ...restCivil} = createCivilInput
      const civil = this.civilRepository.create({
        ...restCivil,
        characterId: character.id,
        hero: {characterId: heroId},
        villain: {characterId: villainId}
      })
      return await this.civilRepository.save( civil )
    } catch (error) {
      throw new BadRequestException(`Ha ocurrido un error al crear el Civil!`)
    }
  }

  //* Update de personajes
  async updateHero(id: string, updateHeroInput: UpdateHeroInput): Promise<Hero> {
    try {
      const { eyeColor, hairColor, nacionalities, objects, suitColors, occupations,...updateHero } = updateHeroInput;
      await this.updateCharacter(id, eyeColor, hairColor, nacionalities, objects, occupations);
      const hero = await this.heroRepository.preload({ ...updateHero, characterId: id  })
      if(suitColors.length !== 0){
        hero.suitColors = [...suitColors.map((colors) => {
          return this.colorsRepository.create( {id: colors.id} )
          })
        ]
      } 
      return await this.heroRepository.save( hero );
    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async updateVillain(id: string, updateVillainInput: UpdateVillainInput): Promise<Villain> {
    try {
      const { eyeColor, hairColor, nacionalities, objects, occupations, ...updateVillain } = updateVillainInput;
      await this.updateCharacter(id, eyeColor, hairColor, nacionalities, objects, occupations);
      const villain = await this.villainRepository.preload({ ...updateVillain, characterId: id  })
      return await this.villainRepository.save( villain );

    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async updateCivil(id: string, updateCivilInput: UpdateCivilInput): Promise<Civil> {
    try {
      const { eyeColor, hairColor, nacionalities, objects, occupations , ...updateCivil } = updateCivilInput;
      await this.updateCharacter(id, eyeColor, hairColor, nacionalities, objects, occupations);
      const civil = await this.civilRepository.preload({ ...updateCivil, characterId: id  })
      return await this.civilRepository.save( civil );

    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async updateCharacter(
    id: string, 
    eyeColor: string, 
    hairColor: string,
    nacionalities: RelationsInput[],
    objects: RelationsInput[],
    occupations: RelationsInput[],
  ): Promise<Character>{    
    try {
      const {saveNacionalities , saveObjects, saveOccupations } = this.changeDataType(nacionalities,objects, occupations)
      const character = await this.charactersRepository.preload({
        id: id, 
        hairColor: eyeColor, 
        eyeColor:  hairColor,
      })
      if(saveNacionalities.length !== 0) character.nacionalities = [...saveNacionalities]
      if(saveObjects.length !== 0) character.objects = [...saveObjects]
      if(saveOccupations.length !== 0) character.occupations = [...saveOccupations]

      return await this.charactersRepository.save( character );
    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  //*Eliminacion de un personaje.
  async removeCharacter(id: string) {
    try {
      const character = await this.charactersRepository.findOne({ where:{id}})
      await this.charactersRepository.remove( character )
      return true;
    } catch (error) {
      throw new MethodNotAllowedException(`El personaje: ${id} tiene otras relaciones`)
    }    
  }

  //*Busqueda de personajes
  async findCharacters(): Promise<CharactersResponse>{
    const repositories = [this.heroRepository, this.villainRepository, this.civilRepository];
    const repositoriesPromise = [];
    
    for (const repository of repositories) { 
      repositoriesPromise.push( repository.find() )
    }
    const [ hero, villain, civil ] = await Promise.all(repositoriesPromise)

    return {
      hero,
      villain,
      civil
    }
  }

  async findCharacterById(id: string): Promise<CharactersResponse>{
    const repositories = [this.heroRepository, this.villainRepository, this.civilRepository];
    const repositoriesPromise = [];
    for (const repository of repositories) { 
      repositoriesPromise.push( repository.findOneBy({characterId: id}) )
    }
    const character = await this.charactersRepository.findOneBy({id})
    const [ hero, villain, civil ] = await Promise.all(repositoriesPromise)
    const characterResponse = {
      ...character,
      hero,
      villain,
      civil
    }
    return characterResponse;
  }

  async findVillain(villains: string[]): Promise<Villain[]>{
    const result = await Promise.all(villains.map(async (villainId) => {
      return await this.villainRepository.findOneBy({characterId: villainId});
    }));
    return result
  }
}