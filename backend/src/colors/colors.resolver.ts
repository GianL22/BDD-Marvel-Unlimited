import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ColorsService } from './colors.service';
import { Color } from './entities/color.entity';
import { CreateColorInput } from './dto/inputs/create-color.input';

@Resolver(() => Color)
export class ColorsResolver {
  constructor(
    private readonly colorsService: ColorsService
  ) {}

  @Mutation(() => Color,{ name:'createColor' })
  async createColor(
    @Args('createColorInput') createColorInput: CreateColorInput,
  ): Promise<Color> {
    return this.colorsService.create(createColorInput);
  }

  @Query(() => [Color], { name: 'colors' })
  async findAll(): Promise<Color[]> {
    return this.colorsService.findAll();
  }
}
