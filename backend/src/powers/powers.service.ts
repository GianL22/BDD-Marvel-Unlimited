import { Injectable, BadRequestException, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreatePowerInput, UpdatePowerInput } from './dto/inputs';
import { Power } from './entities/power.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PowersService {

  constructor(
    @InjectRepository(Power)
    private readonly powersRepository: Repository<Power>
  ){}

  //TODO: Pensar luego a futuro, si guardo todo en mayuscula (La inicial)
  //! NOTA: Lo q haga aqui hacerlo en color luego
  async create(createPowerInput: CreatePowerInput): Promise<Power> {
    try {
      const { name, description} = createPowerInput;
      const power = this.powersRepository.create( {
        name: name, 
        description 
      });
      return await this.powersRepository.save(power);
    } catch (error) {
      throw new BadRequestException(`El poder: ${createPowerInput.name} ya se encuentra registrado`)
    }
  }

  async findAll(): Promise<Power[]> {
    return await this.powersRepository.find();
  }

  async findOneById(id: string): Promise<Power>{
    try {
      return await this.powersRepository.findOneByOrFail( {id} )
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }
  }

  async update(id: string, updatePowerInput: UpdatePowerInput): Promise<Power> {
    try {
      const power = await this.powersRepository.preload({ ...updatePowerInput, id  })
      return await this.powersRepository.save( power );
    } catch (error) {
      throw new BadRequestException( error.detail.replace('Key ', ''));
    }
  }

  async remove(id: string) {
    try {
      const power = await this.powersRepository.findOne({ where:{id}})
      await this.powersRepository.remove( power )
      return true;
    } catch (error) {
      throw new MethodNotAllowedException(`El poder: ${id} NO se puede eliminar`)
    } 
  }

}