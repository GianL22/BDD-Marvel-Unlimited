import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {

    constructor(

        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>

    ){}

    
  async createPlace( namePlace : string): Promise<Place>{
    try {  

      const placeExists = await this.placeRepository.findOneBy( {
        name: namePlace
      } )

      if ( placeExists ) throw new Error(`El tipo ${namePlace} ya existe`)

      const newPlace = this.placeRepository.create( { name : namePlace } )
      return await this.placeRepository.save( newPlace )

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async findAllPlaces(): Promise<Place[]>{
    return await this.placeRepository.find({
        order : {
            name : 'ASC'
        }
    })
  }

  async findOnePlace( id : string ): Promise<Place>{
    try {
      return await this.placeRepository.findOneBy({id})
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }
  }


}
