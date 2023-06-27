import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/input/create-organization.input';
import { UpdateOrganizationInput } from './dto/input/update-organization.input';
import { BuildingType } from './entities/building-type.entity';
import { Headquarter } from './entities/headquarter.entity';
import { CreateHeadquarterInput } from './dto/input/create-headquarter.input';
import { UpdateHeadquarterInput } from './dto/input/update-headquarter.input';
import { JobPosition } from './entities/job-position.entity';
import { FormPart } from './entities/form-part.entity';
import { CreateFormPartInput } from './dto/input/create-form-part.input';



@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation(() => Organization, {name: 'createOrganization'})
  createOrganization(@Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput)  : Promise<Organization> {
    return this.organizationsService.create(createOrganizationInput);
  }

  @Mutation(() => Headquarter, {name : 'createHeadquarter'})
  async createHeadquarter(@Args('createHeadquarterInput') createHeadquarterInput : CreateHeadquarterInput ) : Promise<Headquarter>{
    return this.organizationsService.createHeadquarter(createHeadquarterInput)
  }

  @Mutation(() => BuildingType, {name : 'createBuildingType'})
  async createBuildingType(@Args('nameBuildingType') nameBuildingType : string ) : Promise<BuildingType>{
    return this.organizationsService.createBuildingType(nameBuildingType)
  }

  @Mutation(() => JobPosition, {name : 'createJobPosition'})
  async createJobPosition(@Args('nameJobPosition') nameJobPosition : string ) : Promise<JobPosition>{
    return this.organizationsService.createJobPosition(nameJobPosition)
  }

  @Mutation(() => [FormPart], {name : 'createFormPart'})
  async createFormPart(@Args('createFormPartInput') createFormPartInput : CreateFormPartInput ) : Promise<FormPart[]>{
    return this.organizationsService.createFormPart( createFormPartInput )
  }

  @Query(() => [BuildingType], {name : 'buildingTypes'})
  async findAllBuildingTypes() : Promise<BuildingType[]>{
    return this.organizationsService.findAllBuildingTypes()
  }

  @Query(() => [JobPosition], {name : 'jobPositions'})
  async findAllJobPositions() : Promise<JobPosition[]>{
    return this.organizationsService.findAllJobPositions()
  }

  @Query(() => [Headquarter], {name : 'headquarters'})
  async findAllHeadquarters( @Args( 'organizationId') organizationId : string) : Promise<Headquarter[]>{
    return this.organizationsService.findAllHeadquartersByOrganization(organizationId)
  }

  @Query(() => [FormPart], {name : 'formPartsByOrganization'})
  async findAllFormPartsByOrganization( @Args( 'organizationId') organizationId : string) : Promise<FormPart[]>{
    return this.organizationsService.findAllFormPartsByOrganization(organizationId)
  }

  @Query(() => [Organization], { name: 'organizations' })
  findAll() {
    return this.organizationsService.findAll();
  }

  @Query(() => Organization, { name: 'organization' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.organizationsService.findOne( id );
  }

  @Query(() => Headquarter, { name: 'headquarter' })
  findOneHeadquarter(@Args('id') id: string) {
    return this.organizationsService.findOneHeadquarter( id );
  }

  @Query(() => JobPosition, { name: 'jobPosition' })
  findOneJobPosition(@Args('id') id: string) {
    return this.organizationsService.findOneJobPosition( id );
  }

  @Mutation(() => Organization)
  updateOrganization(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationsService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @Mutation(() => Headquarter)
  updateHeadquarter(@Args('updateHeadquarterInput') updateHeadquarterInput: UpdateHeadquarterInput) {
    return this.organizationsService.updateHeadquarter(updateHeadquarterInput);
  }

  @Mutation(() => Boolean)
  removeOrganization(@Args('id', { type: () => String }) id: string) {
    return this.organizationsService.remove( id );
  }
  //no usar
  @Mutation(() => Boolean)
  removeFormPart(
    @Args('organizationId', { type: () => String }) organizationId: string,
    @Args('jobPositionId', { type: () => String }) jobPositionId: string,
    @Args('characterId', { type: () => String }) characterId: string,
    
    ) {
    return this.organizationsService.removeFormPart( organizationId, jobPositionId, characterId );
  }
}
