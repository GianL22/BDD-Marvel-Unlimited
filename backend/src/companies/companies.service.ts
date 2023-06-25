import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyInput } from './dto/input/create-company.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';

@Injectable()
export class CompaniesService {
  
  constructor(

    @InjectRepository( Company )
    private readonly companyRepository: Repository<Company>

  ){}
  
  
  async create(createCompanyInput: CreateCompanyInput) : Promise<Company> {
    try {  

      const companyExists = await this.companyRepository.findOneBy( {description: createCompanyInput.description} )
      if ( companyExists ) throw new Error(`La compañía ${createCompanyInput.description} ya existe`)
      const newCompany = this.companyRepository.create( createCompanyInput )
      return await this.companyRepository.save( newCompany )
      
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  async findAll() : Promise<Company[]> {

    return await this.companyRepository.find()

  }

  async findOneById( id : string ) : Promise<Company> {
    try {
      
      return await this.companyRepository.findOneByOrFail( {id} )

    } catch (error) {
      throw new BadRequestException(error)
    }

  }


  // async findOneByDescription( description : string) : Promise<Company> {

  //   return await this.companyRepository.findOne( {
  //     where:{
  //       description,
  //     }
  //   } )

  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} company`;
  // }

  // update(id: number, updateCompanyInput: UpdateCompanyInput) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}
