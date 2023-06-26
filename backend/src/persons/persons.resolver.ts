import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/inputs/create-person.input';
import { PersonsResponse } from '../persons/types/persons-response.type';
import { Actor, Creator, Director } from './entities';


@Resolver(() => Person)
export class PersonsResolver {

  constructor(
  
    private readonly personsService: PersonsService
    
  ) {}

  @Mutation(() => Director, { name: 'createDirector' })
  async createDirector(@Args('createPersonInput') createPersonInput: CreatePersonInput) : Promise<Director> {
    return this.personsService.createDirector( createPersonInput );
  }

  @Mutation(() => Creator, { name: 'createCreator' })
  async createCreator(@Args('createPersonInput') createPersonInput: CreatePersonInput) : Promise<Creator> {
    return this.personsService.createCreator( createPersonInput );
  }

  @Mutation(() => Actor, { name: 'createActor' })
  async createActor(@Args('createPersonInput') createPersonInput: CreatePersonInput) : Promise<Actor> {
    return this.personsService.createActor( createPersonInput );
  }

  @Query(() => PersonsResponse , { name: 'persons' })
  async findAll() : Promise<PersonsResponse> {
    return this.personsService.findAll();
  }

  // @Query(() => Person, { name: 'person' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.personsService.findOne(id);
  // }

  // @Mutation(() => Person)
  // updatePerson(@Args('updatePersonInput') updatePersonInput: UpdatePersonInput) {
  //   return this.personsService.update(updatePersonInput.id, updatePersonInput);
  // }

  // @Mutation(() => Person)
  // removePerson(@Args('id', { type: () => Int }) id: number) {
  //   return this.personsService.remove(id);
  // }
}
