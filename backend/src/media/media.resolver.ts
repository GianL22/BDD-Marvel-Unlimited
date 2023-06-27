import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Medio } from './entities/medio.entity';
import { Movie, Serie, VideoGame } from './entities';
import { CreateSerieInput } from './dto/input/create-serie.input';
import { CreateCompanyInput } from 'src/companies/dto/input/create-company.input';
import { AudioVisualType } from './types/audiovisual-type.entity';
import { CreateAudioVisualTypeInput } from './dto/input/create-audiovisual-type.input';
import { CreateMovieInput } from './dto/input/create-movie.input';
import { MediaResponse } from './types/media-response.type';
import { CreateVideoGameInput } from './dto/input/create-videogame.input';
import { UpdateSerieInput } from './dto/input/update-serie.input';

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

  // @Mutation(() => Serie, {name : 'updateSerie'})
  // async updateSerie( @Args('updateSerieInput') updateSerieInput : UpdateSerieInput):Promise<Serie> {
  //   return this.mediaService.updateSerie( updateSerieInput );
  // }

  @Mutation(() => Boolean, {name : 'removeMedio'})
  removeMedio(@Args('id') id: string) {
    return this.mediaService.removeMedio(id);
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
