import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ObjectsService } from './objects.service';
import { ObjectsType, Objects } from './entities';
import { CreateObjectInput, UpdateObjectInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Objects)
export class ObjectsResolver {
  constructor(
    private readonly objectsService: ObjectsService,
  ) {}

  @Mutation(() => Objects, {name: 'createObject'})
  async createObject(
    @Args('createObjectInput') createObjectInput: CreateObjectInput,
  ): Promise<Objects> {
    return this.objectsService.createObject(createObjectInput);
  }

  @Mutation(() => Objects, {name: 'updateObject'})
  async updateObject(
    @Args('updateObjectInput') updateObjectInput: UpdateObjectInput,
  ): Promise<Objects> {
    return this.objectsService.updateObject(updateObjectInput.id, updateObjectInput);
  }

  @Mutation(() => Boolean, {name: 'removeObject'})
  async removeObject(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Boolean> {
    return this.objectsService.removeObject(id);
  }

  @Query(() => [Objects], { name: 'objects' })
  async findAllObjects(): Promise<Objects[]> {
    return this.objectsService.findAllObjects();
  }

  @Query(() => Objects, { name: 'objectById' })
  async findOneObject(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Objects> {
    return this.objectsService.findOneById(id);
  }

  @Query(() => [ObjectsType], { name: 'objectsType' })
  async findAllObjectsType(): Promise<ObjectsType[]> {
    return this.objectsService.findAllObjectsType();
  }
}
