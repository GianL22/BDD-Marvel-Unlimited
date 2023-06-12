import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuscriptionService } from './suscription.service';
import { Suscription } from './entities/suscription.entity';
import { CreateSuscriptionInput } from './dto/create-suscription.input';
import { UpdateSuscriptionInput } from './dto/update-suscription.input';

@Resolver(() => Suscription)
export class SuscriptionResolver {
  // constructor(private readonly suscriptionService: SuscriptionService) {}

  // @Mutation(() => Suscription)
  // createSuscription(@Args('createSuscriptionInput') createSuscriptionInput: CreateSuscriptionInput) {
  //   return this.suscriptionService.create(createSuscriptionInput);
  // }

  // @Query(() => [Suscription], { name: 'suscription' })
  // findAll() {
  //   return this.suscriptionService.findAll();
  // }

  // @Query(() => Suscription, { name: 'suscription' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.suscriptionService.findOne(id);
  // }

  // @Mutation(() => Suscription)
  // updateSuscription(@Args('updateSuscriptionInput') updateSuscriptionInput: UpdateSuscriptionInput) {
  //   return this.suscriptionService.update(updateSuscriptionInput.id, updateSuscriptionInput);
  // }

  // @Mutation(() => Suscription)
  // removeSuscription(@Args('id', { type: () => Int }) id: number) {
  //   return this.suscriptionService.remove(id);
  // }
}
