import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUseObjectInput } from './dto/inputs';
import { UseObject } from './entities/use-object.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UseObjectsService {
  constructor(

    @InjectRepository(UseObject)
    private readonly useObjectsRepository: Repository<UseObject>,
  ){}

  async create(createUseObjectInput: CreateUseObjectInput): Promise<UseObject> {
    try {
      const useObject = await this.findOneByIds(createUseObjectInput.characterId, createUseObjectInput.objectId);
      if(useObject)
        throw new Error
      const newUseObject = this.useObjectsRepository.create( {...createUseObjectInput} );
      return await this.useObjectsRepository.save(newUseObject);
    } catch (error) {
      throw new BadRequestException(`El personaje: ${createUseObjectInput.characterId} ya posee: ${createUseObjectInput.objectId} `)
    }
  }

  async findAll(): Promise<UseObject[]> {
    return await this.useObjectsRepository.find();
  }

  async findOneByIds(characterId: string, objectId: string): Promise<UseObject>{
    return await this.useObjectsRepository.findOneBy({characterId, objectId})
  }

  async remove(characterId: string, objectId: string) {
    try {
      const useObject = await this.findOneByIds(characterId, objectId)
      if(!useObject)
        throw new Error
      await this.useObjectsRepository.remove( useObject )
      return true;
    } catch (error) {
      throw new NotFoundException(`El objecto: ${objectId} no lo usa el personaje: ${characterId}`)
    } 
  }
}
