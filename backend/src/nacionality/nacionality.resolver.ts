import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { NacionalityService } from './nacionality.service';
import { Nacionality } from './entities/nacionality.entity';
import { CreateNacionalityInput } from './dto/inputs';

@Resolver(() => Nacionality)
export class NacionalityResolver {
  constructor(
    private readonly nacionalityService: NacionalityService,
  ) {}

  @Mutation(() => Nacionality)
  async createNacionality(
    @Args('createNacionalityInput') createNacionalityInput: CreateNacionalityInput
  ): Promise<Nacionality> {
    return this.nacionalityService.create(createNacionalityInput);
  }

  @Query(() => [Nacionality], { name: 'nacionality' })
  findAll() {
    return this.nacionalityService.findAll();
  }
}
