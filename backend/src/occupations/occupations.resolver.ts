import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OccupationsService } from './occupations.service';
import { Occupation } from './entities/occupation.entity';
import { CreateOccupationInput } from './dto/inputs/create-occupation.input';

@Resolver(() => Occupation)
export class OccupationsResolver {
  constructor(private readonly occupationsService: OccupationsService) {}

  @Mutation(() => Occupation)
  createOccupation(@Args('createOccupationInput') createOccupationInput: CreateOccupationInput) {
    return this.occupationsService.create(createOccupationInput);
  }

  @Query(() => [Occupation], { name: 'occupations' })
  findAll() {
    return this.occupationsService.findAll();
  }
}
