import { BadRequestException, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Occupation } from './entities/occupation.entity';
import { CreateOccupationInput, UpdateOccupationInput } from './dto/inputs';

@Injectable()
export class OccupationsService {
  constructor(
    @InjectRepository(Occupation)
    private readonly occupationsRepository: Repository<Occupation>,
  ){}

  async create(createOccupationInput: CreateOccupationInput): Promise<Occupation> {
    try {
      const occupation = this.occupationsRepository.create( { ...createOccupationInput } );
      return await this.occupationsRepository.save(occupation);
    } catch (error) {
      throw new BadRequestException(`La ocupación: ${createOccupationInput.name} ya esta registrado `)
    }
  }

  async findAll(): Promise<Occupation[]> {
    return await this.occupationsRepository.find();
  }

  async update(id: string, updateOccupationInput: UpdateOccupationInput): Promise<Occupation> {
    try {
      const occupation = await this.occupationsRepository.preload({ ...updateOccupationInput, id  })
      return await this.occupationsRepository.save( occupation );
    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async remove(id: string) {
    try {
      const occupation = await this.occupationsRepository.findOne({ where:{id}})
      await this.occupationsRepository.remove( occupation )
      return true;
    } catch (error) {
      throw new MethodNotAllowedException(`La Ocupación: ${id} NO se puede eliminar`)
    } 
  }
}
