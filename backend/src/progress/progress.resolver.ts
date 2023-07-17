import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { MovieProgress } from './entities';
import { MovieProgressInput, SerieProgressInput, VideoGameProgressInput } from './dto/inputs';
import { ProfileProgressResponse } from './types/profile-progress-response.type';


@Resolver(() => MovieProgress)
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) { }

  @Mutation(() => Boolean, { name: 'saveMovieProgress' })
  async saveMovieProgress(
    @Args('movieProgressInput') movieProgressInput: MovieProgressInput,
  ): Promise<Boolean> {
    return this.progressService.saveMovieProgress(movieProgressInput);
  }

  @Mutation(() => Boolean, { name: 'saveSerieProgress' })
  async saveSerieProgress(
    @Args('serieProgressInput') serieProgressInput: SerieProgressInput,
  ): Promise<Boolean> {
    return this.progressService.saveSerieProgress(serieProgressInput);
  }

  @Mutation(() => Boolean, { name: 'saveVideoGameProgress' })
  async saveVideoGameProgress(
    @Args('videoGameProgressInput') videoGameProgressInput: VideoGameProgressInput,
  ): Promise<Boolean> {
    return this.progressService.saveVideoGameProgress(videoGameProgressInput);
  }

  @Query(() => ProfileProgressResponse, {name: 'profileProgress'})
  async findMediosInProgressByProfile(
    @Args('profileId', { type: () => String }, ParseUUIDPipe) profileId: string,
  ): Promise<ProfileProgressResponse>{
    return await this.progressService.findMediosInProgressByProfile(profileId)
  }
}
