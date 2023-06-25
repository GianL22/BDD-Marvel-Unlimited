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

      const newDirector = this.directorRepository.create(createPersonInput)
      return await this.directorRepository.save(newDirector)
      
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async createCreator(createPersonInput: CreatePersonInput):Promise<Creator> {
    
    try {  

      const newCreator = this.creatorRepository.create(createPersonInput)
      return await this.creatorRepository.save(newCreator)
      
    } catch (error) {
      throw new BadRequestException(error)
    }
    
  }n

  async createActor(createPersonInput: CreatePersonInput):Promise<Actor> {
        
    try {  

      const newActor = this.actorRepository.create( createPersonInput )
      return await this.actorRepository.save( newActor )
      
    } catch (error) {
      throw new BadRequestException(error)
    }
    
  }


  async findAll() : Promise<PersonsResponse> {
    
    const repositories = [ this.directorRepository, this.creatorRepository, this.actorRepository ]
    const promiseRepositories = []
    
    
    for ( const repository of repositories ){
      promiseRepositories.push( repository.find() ) 
    }

    const [directors, creators, actors] = await Promise.all( promiseRepositories )

    

    return { directors, creators, actors }
  }


  async findCreatorById( id : string ) : Promise<Creator>{

    try {
    
      const creator = await this.creatorRepository.findOneByOrFail( { id })
      return creator

    } catch (error) {

      throw new BadRequestException(error)

    }
  }

  async findDirectorById( id : string ) : Promise<Director>{

    try {
    
      const director = await this.directorRepository.findOneByOrFail( { id })
      return director

    } catch (error) {

      throw new BadRequestException(error)

    }
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
