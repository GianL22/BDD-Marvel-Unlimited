import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/inputs/update-user.input';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Profile } from './entities';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateProfileInput, UpdateProfileInput } from './dto/inputs';
import { Membership } from 'src/memberships/entities/membership.entity';
import { SuscriptionService } from 'src/suscription/suscription.service';
import { Suscription } from 'src/suscription/entities/suscription.entity';

@Resolver(() => User)
// @UseGuards( JwtAuthGuard ) //*Si lo activo pide Token
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly suscriptionService: SuscriptionService,
  ) {}

  //* Query -> Users
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll( );
  }

  //* Query -> Usuario
  @Query(() => User, { name: 'userById' })
  async findOneById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Query(() => User, { name: 'userByEmail' })
  async findOneByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  //* Actualizar usuario
  @Mutation(() => User, {name: 'updateUser'})
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput, 
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput );
  }

  //* Bloquear (Desactivar) -> Usuario
  @Mutation(() => User, {name: 'blockUser'})
  blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<User> {
    return this.usersService.block(id);
  }

  //* Funciones para profile
  @ResolveField( () => [Profile], {name: 'profiles'} )
  async getProfilesByUser(
    @Parent() user: User,
  ): Promise<Profile[]>{
    return this.usersService.findAllProfiles(user);
  }

  @Mutation( () => Profile, {name: 'createProfile'})
  @UseGuards( JwtAuthGuard )
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @CurrentUser() user: User,
  ): Promise<Profile>{
    return this.usersService.createProfile( createProfileInput, user);
  }

  @Mutation(() => Profile, {name: 'updateProfile'})
  @UseGuards( JwtAuthGuard )
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput, 
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.usersService.updateProfile(updateProfileInput.id, updateProfileInput, user);
  }

  @Query(() => [Profile], { name: 'profileByUser' })
  @UseGuards( JwtAuthGuard )
  async findProfileById(
    @CurrentUser() user: User,
  ): Promise<Profile[]> {
    return this.usersService.findProfileById(user);
  }

  @Mutation(() => Profile, {name: 'blockProfile'})
  @UseGuards( JwtAuthGuard )
  blockProfile(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.usersService.blockProfile(id, user);
  }

  @ResolveField( () => Membership, {name: 'membership'} )
  async getActiveMembership(
    @Parent() user: User,
  ): Promise<Membership>{
    return this.suscriptionService.findMembershipByUser(user);
  }

  // @ResolveField( () => [Membership], {name: 'otherMemberships'} )
  // async getOtherMemberships(
  //   @Parent() user: User,
  // ): Promise<Membership[]>{
  //   return this.suscriptionService.findOtherSuscriptionsByUser(user);
  // }
}
