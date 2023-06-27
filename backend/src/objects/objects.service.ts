import { Injectable, BadRequestException, MethodNotAllowedException } from '@nestjs/common';
import { Objects, ObjectsType } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObjectInput, CreateObjectsTypeInput, UpdateObjectInput } from './dto/inputs';

@Injectable()
export class ObjectsService {

  constructor(
    @InjectRepository(Objects)
    private readonly objectsRepository: Repository<Objects>,

    @InjectRepository(ObjectsType)
    private readonly objectsTypeRepository: Repository<ObjectsType>
  ){}

  async createObject(createObjectInput: CreateObjectInput): Promise<Objects> {
    try {
      const objects = this.objectsRepository.create( { ...createObjectInput });
      return await this.objectsRepository.save(objects);
    } catch (error) {
      throw new BadRequestException(`El Objecto: ${createObjectInput.name} ya se encuentra registrado`)
    }
  }

  async findAllObjects(): Promise<Objects[]> {
    return await this.objectsRepository.find({
      order:{
        name: 'ASC'
      }
    });
  }

  async findOneById(id: string): Promise<Objects>{
    return await this.objectsRepository.findOneByOrFail({id})
  }

  async updateObject(id: string, updateObjectInput: UpdateObjectInput): Promise<Objects> {
    try {
      const object = await this.objectsRepository.preload({ ...updateObjectInput, id  })
      return await this.objectsRepository.save( object );
    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async removeObject(id: string) {
    try {
      const object = await this.objectsRepository.findOne({ where:{id}})
      await this.objectsRepository.remove( object )
      return true;
    } catch (error) {
      throw new MethodNotAllowedException(`El objeto: ${id} NO se puede eliminar`)
    } 
  }

  //* Funciones para los ObjectsType
  async findAllObjectsType(): Promise<ObjectsType[]> {
    return await this.objectsTypeRepository.find({
      order:{
        description: 'ASC',
      }
    });
  }

  async createObjectsType(createObjectsTypeInput: CreateObjectsTypeInput): Promise<ObjectsType>{
    try {
      const objectsType = this.objectsTypeRepository.create( { ...createObjectsTypeInput });
      return await this.objectsTypeRepository.save(objectsType);
    } catch (error) {
      throw new BadRequestException(`El Tipo de Objecto: ${createObjectsTypeInput.description} ya se encuentra registrado`)
    }
  }
}
