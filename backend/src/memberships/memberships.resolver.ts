import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MembershipsService } from './memberships.service';
import { Membership } from './entities/membership.entity';
import { CreateMembershipInput, UpdateMembershipInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Membership)
@UseGuards(JwtAuthGuard)
export class MembershipsResolver {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Mutation(() => Membership, {name : 'createMembership'})
  async createMembership(@Args('createMembershipInput') createMembershipInput: CreateMembershipInput): Promise<Membership> {
    return this.membershipsService.create(createMembershipInput);
  }

  @Query(() => [Membership], { name: 'memberships' })
  async findAll():Promise<Membership[]> {
    return this.membershipsService.findAll();
  }

  @Query(() => Membership, { name: 'membership' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.membershipsService.findOne(id);
  }

  // @Mutation(() => Membership)
  // updateMembership(@Args('updateMembershipInput') updateMembershipInput: UpdateMembershipInput) {
  //   return this.membershipsService.update(updateMembershipInput.id, updateMembershipInput);
  // }

  @Mutation(() => Membership, { name: 'removeMembership' })
  removeMembership(@Args('id', { type: () => String }) id: string) {
    return this.membershipsService.remove(id);
  }
}
