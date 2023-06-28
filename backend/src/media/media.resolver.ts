import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Medio } from './entities/medio.entity';
import { Movie, Serie, VideoGame } from './entities';
import { CreateSerieInput } from './dto/input/create-serie.input';
import { AudioVisualType } from './types/audiovisual-type.entity';
import { CreateAudioVisualTypeInput } from './dto/input/create-audiovisual-type.input';
import { CreateMovieInput } from './dto/input/create-movie.input';
import { MediaResponse } from './types/media-response.type';
import { CreateVideoGameInput } from './dto/input/create-videogame.input';
import { Platform } from './entities/platform.entity';
import { CreateParticipatesInput } from './dto/input/create-participates.input';
import { Participates } from './entities/participates.entity';
import { Appears } from './entities/appears.entity';
import { CreateAppearsInput } from './dto/input/create-appears.input';

@Resolver(() => Medio)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => Serie)
  async createSerie(
    @Args('createSerieInput') createSerieInput: CreateSerieInput
    
  ): Promise<Serie> {
    return this.mediaService.createSerie( createSerieInput );
  }


  @Mutation(() => Movie)
  async createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput
  ): Promise<Movie> {
    return this.mediaService.createMovie( createMovieInput );
  }


  @Mutation(() => VideoGame)
  async createVideoGame(
    @Args('createVideoGame') createVideoGameInput : CreateVideoGameInput
  ): Promise<VideoGame> {
    return this.mediaService.createVideoGame( createVideoGameInput );
  }

  @Mutation(() => [Participates], {name : 'createParticipates'})
  async createParticipates(
    @Args('createParticipates') createParticipatesInput : CreateParticipatesInput
  ): Promise<Participates[]> {
    return this.mediaService.createParticipates( createParticipatesInput );
  }

  @Mutation(() => [Appears], {name : 'createAppears'})
  async createAppears(
    @Args('createAppears') createAppearsInput : CreateAppearsInput
  ): Promise<Appears[]> {
    return this.mediaService.createAppears( createAppearsInput );
  }

  @Query(() => MediaResponse, { name: 'media' })
  async findAll() : Promise<MediaResponse> {
    return await this.mediaService.findAll();
  }

  @Mutation(() => AudioVisualType, { name: 'createAudioVisualType' })
  async createAudioVisualType(
    @Args('createAudioVisualTypeInput') createAudioVisualTypeInput : CreateAudioVisualTypeInput 
  ): Promise<AudioVisualType>{
    return this.mediaService.createAudiovisualType(createAudioVisualTypeInput);
  }

  @Query(() => [ AudioVisualType ], { name: 'AudioVisualTypes' })
  async findAllAudioVisualTypes() : Promise<AudioVisualType[]> {
    return this.mediaService.findAllAudiovisualTypes();
  }

  @Query(() => Serie, {name : 'serie'})
  async findOneSerie( @Args('id') id : string ):Promise<Serie> {
    return this.mediaService.findSerieById(id);
  }

  @Query(() => Movie, {name : 'movie'})
  async findOneMovie( @Args('id') id : string ):Promise<Movie> {
    return this.mediaService.findMovieById(id);
  }

  @Query(() => VideoGame, {name : 'videoGame'})
  async findOneVideoGame( @Args('id') id : string ) {
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

  @Mutation(() => Platform, {name : 'createPlatform'})
  async createPlatform( @Args('namePlatform') namePlatform : string ) : Promise<Platform>{
    return this.mediaService.createPlatform( namePlatform )
  }

  @Query(() => [Platform], {name : 'platforms'})
  async findAllPlatforms() : Promise<Platform[]>{
    return this.mediaService.findAllPlatforms();
  }


  @Mutation(() => Boolean, {name : 'removeMedio'})
  async removeMedio(@Args('id') id: string) {
    return this.mediaService.removeMedio(id);
  }

  @Mutation(() => Boolean, {name : 'removeParticipates'})
  async removeParticipates(@Args('medioId') medioId: string, @Args('organizationId') organizationId: string) {
    return this.mediaService.removeParticipates(medioId, organizationId);
  }

  @Mutation(() => Boolean, {name : 'removeAppears'})
  async removeAppears(@Args('medioId') medioId: string,
    @Args('characterId') characterId: string, 
    @Args('actorId') actorId: string
    ) {
    return this.mediaService.removeAppears(medioId, characterId, actorId);
  }

  @ResolveField(() => String, {name : 'title'}) 
  async getTitle(@Parent() medio : Medio) : Promise<string> {
    return await this.mediaService.getTitle( medio.id );

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
