import { BadRequestException, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nacionality } from './entities/nacionality.entity';
import { Repository } from 'typeorm';
import { CreateNacionalityInput, UpdateNacionalityInput } from './dto/inputs';

@Injectable()
export class NacionalityService {
  constructor(
    @InjectRepository(Nacionality)
    private readonly nacionalityRepository: Repository<Nacionality>,
  ){}

  async create(createNacionalityInput: CreateNacionalityInput): Promise<Nacionality> {
    try {
      const nacionality = this.nacionalityRepository.create( { ...createNacionalityInput } );
      return await this.nacionalityRepository.save(nacionality);
    } catch (error) {
      throw new BadRequestException(`La nacionalidad: ${createNacionalityInput.name} ya esta registrado `)
    }
  }

  async findAll(): Promise<Nacionality[]> {
    return await this.nacionalityRepository.find({
      order:{
        name:'ASC'
      }
    });
  }

  async update(id: string, updateNacionalityInput: UpdateNacionalityInput): Promise<Nacionality> {
    try {
      const nacionality = await this.nacionalityRepository.preload({ ...updateNacionalityInput, id  })
      return await this.nacionalityRepository.save( nacionality );
    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async remove(id: string) {
    try {
      const nacionality = await this.nacionalityRepository.findOne({ where:{id}})
      await this.nacionalityRepository.remove( nacionality )
      return true;
    } catch (error) {
      throw new MethodNotAllowedException(`La nacionalidad: ${id} NO se puede eliminar`)
    } 
  }
}
