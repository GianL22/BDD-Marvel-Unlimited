import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColorInput } from './dto/inputs/create-color.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {

  constructor(
    @InjectRepository(Color)
    private readonly colorsRepository: Repository<Color>,
  ){}

  async create({description}: CreateColorInput): Promise<Color> {
    try {
      const colorExist  = await this.colorsRepository.findOne({
         where:{
          description: description.toLowerCase().charAt(0).toUpperCase() + description.toLowerCase().slice(1),
        }
      })

      if (colorExist)
        throw new Error

      const color = this.colorsRepository.create( { description: description } );
      return await this.colorsRepository.save(color);
    } catch (error) {
      throw new BadRequestException(`El color: ${description} ya esta registrado `)
    }

  }

  async findAll(): Promise<Color[]> {
    return await this.colorsRepository.find() ;
  }

  async findOneBy(id: string): Promise<Color> {
    return await this.colorsRepository.findOneBy({id}) ;
  }

}
