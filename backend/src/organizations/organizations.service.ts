import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/input/create-organization.input';
import { UpdateOrganizationInput } from './dto/input/update-organization.input';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlacesService } from '../places/places.service';
import { CharactersService } from 'src/characters/characters.service';
import { BuildingType } from './entities/building-type.entity';
import { CreateHeadquarterInput } from './dto/input/create-headquarter.input';
import { Headquarter } from './entities/headquarter.entity';
import { UpdateHeadquarterInput } from './dto/input/update-headquarter.input';
import { JobPosition } from './entities/job-position.entity';
import { FormPart } from './entities/form-part.entity';
import { CreateFormPartInput } from './dto/input/create-form-part.input';


@Injectable()
export class OrganizationsService {

  constructor(

    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,

    @InjectRepository(BuildingType)
    private readonly buildingTypenRepository: Repository<BuildingType>,

    @InjectRepository(Headquarter)
    private readonly headquarterRepository: Repository<Headquarter>,

    @InjectRepository(JobPosition)
    private readonly jobPositionRepository: Repository<JobPosition>,

    @InjectRepository(FormPart)
    private readonly formPartRepository: Repository<FormPart>,

    private readonly placesService : PlacesService,

    private readonly charactersService : CharactersService,

  ){}

  async create(createOrganizationInput: CreateOrganizationInput) : Promise<Organization> {

    try {
      const { founderId, leaderId, placeId, ...rest } = createOrganizationInput

      const orgExists = await this.organizationRepository.findOne({where: {name: rest.name}})
      if ( orgExists ) throw new Error('Ya existe una organización con ese nombre');

      const creationPlace = await this.placesService.findOnePlace(placeId)
      const founder = await this.charactersService.findOneCharacterById(founderId)
      const leader = await this.charactersService.findOneCharacterById(leaderId)

      const newOrganization = this.organizationRepository.create({
        founder, 
        leader,
        creationPlace,
        ...rest,
      })
      return await this.organizationRepository.save(newOrganization)

    } catch (error) {
      throw new BadRequestException(error)
    }
  }


  async createHeadquarter(createHeadquarterInput: CreateHeadquarterInput) : Promise<Headquarter> {

    try {
      const { buildingTypeId, ubicationId, organizationId, ...rest } = createHeadquarterInput
      await this.organizationRepository.findOneByOrFail({ id : organizationId })

      const headquarterExist = await this.headquarterRepository.findOne( { where : { name : rest.name, organizationId} })
      if ( headquarterExist ) throw new Error(' Nombre de la sede ya existente para esa orgazanición')

      const ubication = await this.placesService.findOnePlace(ubicationId)
      const buildingType = await this.findOneBuildingType( buildingTypeId )

      const newOrganization = this.headquarterRepository.create({
        buildingType, 
        ubication,
        organizationId,
        ...rest,
      })
      return await this.headquarterRepository.save(newOrganization)

    } catch (error) {
      throw new BadRequestException(error)
    }
  }


  
  async createBuildingType(nameBuildingType: string) : Promise<BuildingType> {

    try {

      const buildingTypeExists = await this.buildingTypenRepository.findOne({where: {description: nameBuildingType}})
      if ( buildingTypeExists ) throw new Error('Ya existe ese tipo de edificación con ese nombre');

      const newBuildingType = this.buildingTypenRepository.create({ description : nameBuildingType})
      return await this.buildingTypenRepository.save( newBuildingType )

    } catch (error) {
      throw new BadRequestException(error)
    }
  }


    
  async createJobPosition(nameJobPosition: string) : Promise<JobPosition> {

    try {

      const JobPositionExists = await this.jobPositionRepository.findOne({where: { name : nameJobPosition}})
      if ( JobPositionExists ) throw new Error('Ya existe ese cargo con ese nombre');

      const newJobPosition = this.jobPositionRepository.create({ name : nameJobPosition})
      return await this.jobPositionRepository.save( newJobPosition )

    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async createFormPart({charactersAndJobs, organizationId}: CreateFormPartInput): Promise<FormPart[]> {
    
    try {   
      const formParts = charactersAndJobs.map( ({characterId, jobPositionId})=> {
        return this.formPartRepository.create({ characterId,  organizationId, jobPositionId })
      })

      return await this.formPartRepository.save( formParts );
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() : Promise<Organization[]> {
    return await this.organizationRepository.find()
  }

  async findAllBuildingTypes() : Promise<BuildingType[]> {
    return await this.buildingTypenRepository.find()
  }

  async findAllHeadquartersByOrganization( organizationId : string ) : Promise<Headquarter[]> {
    return await this.headquarterRepository.find({ where : { organizationId }})
  }

  async findAllJobPositions() : Promise<JobPosition[]> {
    return await this.jobPositionRepository.find()
  }
  
  async findAllFormPartsByOrganization( organizationId: string ): Promise<FormPart[]>{
    return await this.formPartRepository.findBy({ organizationId })
  }

  async findOneBuildingType( id: string ) : Promise<BuildingType> {
    try {
      return await this.buildingTypenRepository.findOneByOrFail( {id} )
    } catch (error) {
      throw new NotFoundException('buldingType no encontrado')
    }
  }

  async findOneHeadquarter( id : string ) : Promise<Headquarter> {
    try {
      return await this.headquarterRepository.findOneByOrFail( { id } )
    } catch (error) {
      throw new NotFoundException('headquarter no encontrado')
    }
  }

  async findOneJobPosition( id : string ) : Promise<JobPosition> {
    try {
      return await this.jobPositionRepository.findOneByOrFail( { id } )
    } catch (error) {
      throw new NotFoundException('Jobposition no encontrado')
    }
  }



  async findOne( id: string ) : Promise<Organization> {
      try {
        return await this.organizationRepository.findOneByOrFail( {id} )
      } catch (error) {
        throw new NotFoundException('Organization no encontrado')
      }
  }

  async update(id: string, updateOrganizationInput: UpdateOrganizationInput) : Promise<Organization> {

    await this.findOne(id);
    const organization = await this.organizationRepository.preload({id, ...updateOrganizationInput})

    if ( organization ) return this.organizationRepository.save( organization )
    throw new NotFoundException(`organization not found`)

  }


  async updateHeadquarter( updateHeadquarterInput: UpdateHeadquarterInput) : Promise<Headquarter> {

    const { id } = updateHeadquarterInput

    await this.findOneHeadquarter( id );
    const headquarter = await this.headquarterRepository.preload({...updateHeadquarterInput})

    if ( headquarter ) return this.headquarterRepository.save( headquarter )
    throw new NotFoundException(`organization not found`)

  }

  async remove( id: string ) : Promise<Boolean>{
    try {
      const organization = await this.organizationRepository.findOneByOrFail( { id } )
      await this.organizationRepository.remove( organization )
      return true;
    } catch (error) {
      throw new NotFoundException(`La organizacion: ${id} tiene otras relaciones`)
    }    
  }

  async removeFormPart(characterId: string, jobPositionId: string, organizationId : string) : Promise<Boolean> {
    try {
      const formPart = await this.formPartRepository.findOneByOrFail({ characterId, jobPositionId, organizationId })
      await this.formPartRepository.remove( formPart )
      return true;
    } catch (error) {
      throw new NotFoundException(`No existe esa relación`)
    } 
  }

}