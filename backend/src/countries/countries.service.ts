import { Injectable, NotFoundException } from '@nestjs/common';
import { City, Country } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountriesService {
  
  
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ){}
  
  
  async findAllCountries():Promise<Country[]> {
    return await this.countriesRepository.find({
      order:{
        description: 'ASC'
      }
    })
  }

  async findAllCitiesByCountry(countryName : string): Promise<City[]> {
    return await this.citiesRepository.find({
      where: {
        country : {
          description : countryName
        }
      },
      order:{
        description: 'ASC'
      }
    })
  }
  async findCitiesById(id : string): Promise<City> {
    try {
      return await this.citiesRepository.findOneBy({id})
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }
  }
}
