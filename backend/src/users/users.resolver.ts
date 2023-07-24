import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, Float } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/inputs/update-user.input';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateProfileInput, UpdateProfileInput } from './dto/inputs';
import { Membership } from 'src/memberships/entities/membership.entity';
import { SuscriptionService } from 'src/suscription/suscription.service';
import { Profile, User } from './entities';
import { ProfileRelationInput } from './dto/inputs/profile-relation.input';
import { RelationResponse, ProgressResponse } from './types';
import { RatingsService } from '../ratings/ratings.service';
import { ProgressService } from 'src/progress/progress.service';
import { Medio } from 'src/media/entities';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly suscriptionService: SuscriptionService,
    private readonly ratingsService: RatingsService,
    private readonly progressService: ProgressService,
  ) { }

  //* Query -> Users
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
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
  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  //* Bloquear (Desactivar) -> Usuario
  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<User> {
    return this.usersService.block(id);
  }

  //* Funciones para profile
  @ResolveField(() => [Profile], { name: 'profiles' })
  async getProfilesByUser(
    @Parent() user: User,
  ): Promise<Profile[]> {
    return this.usersService.findAllProfiles(user);
  }

  @Mutation(() => Profile, { name: 'createProfile' })
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.usersService.createProfile(createProfileInput, user);
  }

  @Mutation(() => Profile, { name: 'updateProfile' })
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.usersService.updateProfile(updateProfileInput.id, updateProfileInput, user);
  }

  @Query(() => [Profile], { name: 'profileByUser' })
  @UseGuards(JwtAuthGuard)
  async findProfileById(
    @CurrentUser() user: User,
  ): Promise<Profile[]> {
    return this.usersService.findProfileById(user);
  }

  @Mutation(() => Profile, { name: 'blockProfile' })
  @UseGuards(JwtAuthGuard)
  async blockProfile(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return this.usersService.blockProfile(id, user);
  }

  @ResolveField(() => Membership, { name: 'membership' })
  async getActiveMembership(
    @Parent() user: User,
  ): Promise<Membership> {
    return this.suscriptionService.findMembershipByUser(user);
  }

  //* Mutations n Query para las relations

  @Mutation(() => Boolean, { name: 'relateMyList' })
  @UseGuards(JwtAuthGuard)
  async toggleMedioInMyList(
    @Args('profileRelationInput') profileRelationInput: ProfileRelationInput,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.usersService.toggleMedioInMyList(profileRelationInput, user.id);
  }

  @Mutation(() => Boolean, { name: 'relatePreferenceList' })
  @UseGuards(JwtAuthGuard)
  async toggleMedioInPreferenceList(
    @Args('profileRelationInput') profileRelationInput: ProfileRelationInput,
    @CurrentUser() user: User,
  ): Promise<Boolean> {
    return this.usersService.toggleMedioInPreferenceList(profileRelationInput, user.id);
  }

  @Query(() => RelationResponse, { name: 'profileMyList' })
  @UseGuards(JwtAuthGuard)
  async profileMyList(
    @Args('profileId', { type: () => String }) profileId: string,
    @CurrentUser() user: User,
  ): Promise<RelationResponse> {
    return this.usersService.getMyList(profileId, user.id);
  }

  @Query(() => RelationResponse, { name: 'profilePreferenceList' })
  @UseGuards(JwtAuthGuard)
  async profilePreferenceList(
    @Args('profileId', { type: () => String }) profileId: string,
    @CurrentUser() user: User,
  ): Promise<RelationResponse> {
    return this.usersService.getPreferenceList(profileId, user.id);
  }

  @Query(() => [Medio], { name: 'profileRecommendation' })
  async getRecommendationByProfile(
    @Args('profileId', { type: () => String }) profileId: string,
  ): Promise<Medio[]> {
    return this.usersService.getRecomendations(profileId);
  }

  @Query(() => Float, { name: 'ratingOfMedioByProfile' })
  async getRatingByProfileId(
    @Args('profileId', { type: () => String }, ParseUUIDPipe) profileId: string,
    @Args('medioId', { type: () => String }, ParseUUIDPipe) medioId: string,
  ): Promise<number> {
    return await this.ratingsService.getRatingByProfileId(profileId, medioId);
  }

  @Query(() => ProgressResponse, { name: 'progressOfMedios' })
  async getProgressOfMediosByProfile(
    @Args('profileId', { type: () => String }, ParseUUIDPipe) profileId: string,
    @Args('medioId', { type: () => String }, ParseUUIDPipe) medioId: string,
  ): Promise<ProgressResponse> {
    const movieProgress = await this.progressService.findMovieProgress(profileId, medioId);
    const serieProgress = await this.progressService.findSerieProgress(profileId, medioId)
    const videoGameProgress = await this.progressService.findVideoGameProgress(profileId, medioId);
    return {
      movieProgress: (!movieProgress) ? 0 : movieProgress.timeWatched,
      serieProgress: (!serieProgress) ? 0 : serieProgress.viewedEpisodes,
      videoGameProgress: (!videoGameProgress) ? false : videoGameProgress.played,
    }
  }
}
