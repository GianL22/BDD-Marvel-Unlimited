import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonInput } from './dto/inputs/create-person.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';
import { Creator } from './entities/creator.entity';
import { Actor } from './entities/actor.entity';
import { PersonsResponse } from './types/persons-response.type';

@Injectable()
export class PersonsService {

  constructor(

    @InjectRepository( Director )
    private readonly directorRepository: Repository<Director>,

    @InjectRepository( Creator )
    private readonly creatorRepository: Repository<Creator>,

    @InjectRepository( Actor )
    private readonly actorRepository: Repository<Actor>
    
  ){}

  async createDirector(createPersonInput: CreatePersonInput):Promise<Director> {
    
    
    try {  
      
      const directorExists = await this.directorRepository.findOne( {
        where:{
          name: createPersonInput.name,
          lastName: createPersonInput.lastName
        }
      } )

      if( directorExists ) return directorExists

      const newDirector = this.directorRepository.create(createPersonInput)
      return await this.directorRepository.save(newDirector)
      
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async createCreator(createPersonInput: CreatePersonInput):Promise<Director> {
    
    
    try {  
      
      const creatorExists = await this.creatorRepository.findOne( {
        where:{
          name: createPersonInput.name,
          lastName: createPersonInput.lastName
        }
      } )

      if ( creatorExists ) return creatorExists

      const newCreator = this.directorRepository.create(createPersonInput)
      return await this.directorRepository.save(newCreator)
      
    } catch (error) {
      throw new BadRequestException(error)
    }
    
  }

  async createActor(createPersonInput: CreatePersonInput):Promise<Director> {
    
    
    try {  
      
      const createActor = await this.actorRepository.findOne( {
        where:{
          name: createPersonInput.name,
          lastName: createPersonInput.lastName
        }
      } )

      if( createActor ) return createActor

      const newActor = this.actorRepository.create( createPersonInput )
      return await this.actorRepository.save( newActor )
      
    } catch (error) {
      throw new BadRequestException(error)
    }
    
  }


  async findAll() : Promise<PersonsResponse> {
    
    const repositories = [ this.directorRepository, this.creatorRepository, this.actorRepository ]
    const [ directors, creators, actors ] = await Promise.all(
      repositories.map( repository => repository.find() )
    )

    return { directors, creators, actors }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} person`;
  // }

  // update(id: number, updatePersonInput: UpdatePersonInput) {
  //   return `This action updates a #${id} person`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} person`;
  // }
}
