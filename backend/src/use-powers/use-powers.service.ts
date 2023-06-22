import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsePower } from './entities/use-power.entity';
import { Repository } from 'typeorm';
import { CreateUsePowerInput, UpdateUsePowerInput } from './dto/inputs';

@Injectable()
export class UsePowersService {

  constructor(
    @InjectRepository(UsePower)
    private readonly  usePowersRepository: Repository<UsePower>,
  ){}

  async create(createUsePowerInput: CreateUsePowerInput): Promise<UsePower> {
    try {
      const usePower = await this.findOneByIds(createUsePowerInput.characterId, createUsePowerInput.powerId);
      if(usePower)
        throw new Error
      const newUsePower = this.usePowersRepository.create( {...createUsePowerInput} );
      return await this.usePowersRepository.save(newUsePower);
    } catch (error) {
      throw new BadRequestException(`El personaje: ${createUsePowerInput.characterId} ya posee: ${createUsePowerInput.powerId} `)
    }
  }

  async findAll(): Promise<UsePower[]> {
    return await this.usePowersRepository.find();
  }

  async findOneByIds(characterId: string, powerId: string): Promise<UsePower>{
    return await this.usePowersRepository.findOneBy({characterId, powerId})
  }

  async remove(characterId: string, powerId: string) {
    try {
      const usePower = await this.findOneByIds(characterId, powerId)
      if(!usePower)
        throw new Error
      await this.usePowersRepository.remove( usePower )
      return true;
    } catch (error) {
      throw new NotFoundException(`El poder: ${powerId} no lo posee el personaje: ${characterId}`)
    } 
  }
}
