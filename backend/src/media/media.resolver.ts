import { Resolver, Query, Mutation, Args, ResolveField, Parent, Float, Int } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Medio } from './entities/medio.entity';
import { Appears, Movie, Participates, Platform, Serie, VideoGame } from './entities';
import { AudioVisualType } from './types/audiovisual-type.entity';
import { RatingsService } from 'src/ratings/ratings.service';
import { CreateAppearsInput, CreateAudioVisualTypeInput, CreateMovieInput, CreateParticipatesInput, CreateSerieInput, CreateVideoGameInput, UpdateMovieInput, UpdateSerieInput, UpdateVideoGameInput } from './dto/input';
import { MediaResponse } from './types';
import { RatingsResponse } from './types/ratings-response.type';

@Resolver(() => Medio)
export class MediaResolver {
  constructor(
    private readonly mediaService: MediaService,
    private readonly ratingsService: RatingsService,
  ) { }

  @Mutation(() => Serie)
  async createSerie(
    @Args('createSerieInput') createSerieInput: CreateSerieInput

  ): Promise<Serie> {
    return this.mediaService.createSerie(createSerieInput);
  }


  @Mutation(() => Movie)
  async createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput
  ): Promise<Movie> {
    return this.mediaService.createMovie(createMovieInput);
  }

  @Mutation(() => VideoGame)
  async createVideoGame(
    @Args('createVideoGame') createVideoGameInput: CreateVideoGameInput
  ): Promise<VideoGame> {
    return this.mediaService.createVideoGame(createVideoGameInput);
  }

  @Mutation(() => [Participates], { name: 'createParticipates' })
  async createParticipates(
    @Args('createParticipatesInput') createParticipatesInput: CreateParticipatesInput
  ): Promise<Participates[]> {
    return this.mediaService.createParticipates(createParticipatesInput);
  }

  @Mutation(() => [Appears], { name: 'createAppears' })
  async createAppears(
    @Args('createAppearsInput') createAppearsInput: CreateAppearsInput
  ): Promise<Appears[]> {
    return this.mediaService.createAppears(createAppearsInput);
  }

  @Query(() => MediaResponse, { name: 'media' })
  async findAll(): Promise<MediaResponse> {
    return await this.mediaService.findAll();
  }

  @Query(() => [Medio], { name: 'mediosTitleAndIds' })
  async findAllMediosTitleAndIds(): Promise<Medio[]> {
    return await this.mediaService.findAllMediosTitleAndIds();
  }

  @Mutation(() => AudioVisualType, { name: 'createAudioVisualType' })
  async createAudioVisualType(
    @Args('createAudioVisualTypeInput') createAudioVisualTypeInput: CreateAudioVisualTypeInput
  ): Promise<AudioVisualType> {
    return this.mediaService.createAudiovisualType(createAudioVisualTypeInput);
  }

  @Query(() => [AudioVisualType], { name: 'AudioVisualTypes' })
  async findAllAudioVisualTypes(): Promise<AudioVisualType[]> {
    return this.mediaService.findAllAudiovisualTypes();
  }

  @Query(() => Serie, { name: 'serie', nullable: true })
  async findOneSerie(@Args('id') id: string): Promise<Serie> {
    return this.mediaService.findSerieById(id);
  }

  @Query(() => Movie, { name: 'movie' })
  async findOneMovie(@Args('id') id: string): Promise<Movie> {
    return this.mediaService.findMovieById(id);
  }

  @Query(() => VideoGame, { name: 'videoGame' })
  async findOneVideoGame(@Args('id') id: string) {
    return this.mediaService.findVideoGameById(id);
  }

  // @Query(() => [Participates], {name : 'participatesByMedio'})
  // async findAllParticipatesByMedio(
  //   @Args('Id') medioId : Medio
  // ) : Promise<Participates[]>{
  //   return this.mediaService.findAllParticipatesByMedio( medio.id );
  // }

  // @Query(() => [Appears], {name : 'appearsByMedio'})
  // async findAllApppearsByMedio(
  //   @Parent() medio : Medio
  // ) : Promise<Appears[]>{
  //   return this.mediaService.findAllApppearsByMedio( medio.id );
  // }

  @Mutation(() => Platform, { name: 'createPlatform' })
  async createPlatform(@Args('namePlatform') namePlatform: string): Promise<Platform> {
    return this.mediaService.createPlatform(namePlatform)
  }

  @Query(() => [Platform], { name: 'platforms' })
  async findAllPlatforms(): Promise<Platform[]> {
    return this.mediaService.findAllPlatforms();
  }


  @Mutation(() => Boolean, { name: 'removeMedio' })
  async removeMedio(@Args('id') id: string) {
    return this.mediaService.removeMedio(id);
  }

  @Mutation(() => Movie, { name: 'updateMovie' })
  async updateMovie(
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ): Promise<Movie> {
    return this.mediaService.updateMovie(updateMovieInput);
  }

  @Mutation(() => Serie, { name: 'updateSerie' })
  async updateSerie(
    @Args('updateSerieInput') updateSerieInput: UpdateSerieInput,
  ): Promise<Serie> {
    return this.mediaService.updateSerie(updateSerieInput);
  }

  @Mutation(() => VideoGame, { name: 'updateVideoGame' })
  async updateVideoGame(
    @Args('updateVideoGameInput') updateVideoGameInput: UpdateVideoGameInput,
  ): Promise<VideoGame> {
    return this.mediaService.updateVideoGame(updateVideoGameInput);
  }

  @Mutation(() => Boolean, { name: 'removeParticipates' })
  async removeParticipates(@Args('medioId') medioId: string, @Args('organizationId') organizationId: string) {
    return this.mediaService.removeParticipates(medioId, organizationId);
  }

  @Mutation(() => Boolean, { name: 'removeAppears' })
  async removeAppears(@Args('medioId') medioId: string,
    @Args('characterId') characterId: string,
    @Args('actorId') actorId: string
  ) {
    return this.mediaService.removeAppears(medioId, characterId, actorId);
  }

  @ResolveField(() => String, { name: 'title' })
  async getTitle(@Parent() medio: Medio): Promise<string> {
    return await this.mediaService.getTitle(medio.id);
  }

  @ResolveField(() => String, { name: 'poster' })
  async getPoster(@Parent() medio: Medio): Promise<string> {
    return await this.mediaService.getPoster(medio.id);
  }

  @ResolveField(() => String, { name: 'type' })
  async getTypeMedio(@Parent() medio: Medio): Promise<string> {
    return await this.mediaService.getTypeMedio(medio.id);
  }

  @ResolveField(() => RatingsResponse, { name: 'rating', nullable: true })
  async getRatingMedio(@Parent() medio: Medio): Promise<RatingsResponse> {
    return await this.ratingsService.getAverageRating(medio.id);
  }

  // @Query(() => Media, { name: 'media' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.mediaService.findOne(id);
  // }

  // @Mutation(() => Media)
  // updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
  //   return this.mediaService.update(updateMediaInput.id, updateMediaInput);
  // }

  // @Mutation(() => Media)
  // removeMedia(@Args('id', { type: () => Int }) id: number) {
  //   return this.mediaService.remove(id);
  // }
}
