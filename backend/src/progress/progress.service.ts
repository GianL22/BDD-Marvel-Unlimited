import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieProgress, SerieProgress, VideoGameProgress } from './entities';
import { MovieProgressInput, SerieProgressInput, VideoGameProgressInput } from './dto/inputs';
import { Movie, Serie } from 'src/media/entities';
import { MediaService } from '../media/media.service';

@Injectable()
export class ProgressService {

    constructor(
        @InjectRepository(MovieProgress)
        private readonly movieProgressRepository: Repository<MovieProgress>,

        @InjectRepository(SerieProgress)
        private readonly serieProgressRepository: Repository<SerieProgress>,

        @InjectRepository(VideoGameProgress)
        private readonly videoGameProgressRepository: Repository<VideoGameProgress>,

        private readonly mediaService :MediaService,
    ) { }

    async findMovieProgress(profileId: string, movieId: string): Promise<MovieProgress> {
        return await this.movieProgressRepository.findOne({
            where: {
                profileId,
                movieId,
            }
        })
    }

    async findSerieProgress(profileId: string, serieId: string): Promise<SerieProgress> {
        return await this.serieProgressRepository.findOne({
            where: {
                profileId,
                serieId,
            }
        })
    }

    async findVideoGameProgress(profileId: string, videoGameId: string): Promise<VideoGameProgress> {
        return await this.videoGameProgressRepository.findOne({
            where: {
                profileId: profileId,
                videoGameId: videoGameId,
            }
        })
    }

    async saveMovieProgress(movieProgressInput: MovieProgressInput): Promise<boolean> {
        const { timeWatched, ...restInput } = movieProgressInput;
        try {
            const movie = await this.mediaService.findMovieById(restInput.movieId)
            if (timeWatched > movie.duration) throw new Error()
            const movieProgress = await this.findMovieProgress(restInput.profileId, restInput.movieId)
            if (movieProgress) {
                const updateProgress = await this.movieProgressRepository.preload({
                    ...restInput,
                    timeWatched: timeWatched
                })
                await this.movieProgressRepository.save(updateProgress);
                return false;
            } else {
                const createProgress = this.movieProgressRepository.create({
                    ...restInput,
                    timeWatched: timeWatched
                });
                await this.movieProgressRepository.save(createProgress);
                return true
            }
        } catch (error) {
            throw new BadRequestException(`El progreso debe estar dentro del rango de la Película`)
        }
    }

    async saveSerieProgress(serieProgressInput: SerieProgressInput) {
        const { viewedEpisodes, ...restInput } = serieProgressInput;
        try {
            const serie = await this.mediaService.findSerieById(restInput.serieId)
            if (viewedEpisodes > serie.episodes) throw new Error()
            const serieProgress = await this.findSerieProgress(restInput.profileId, restInput.serieId)
            if (serieProgress) {
                const updateProgress = await this.serieProgressRepository.preload({
                    ...restInput,
                    viewedEpisodes: viewedEpisodes
                })
                await this.serieProgressRepository.save(updateProgress);
                return false;
            } else {
                const createProgress = this.serieProgressRepository.create({
                    ...restInput,
                    viewedEpisodes: viewedEpisodes
                });
                await this.serieProgressRepository.save(createProgress);
                return true
            }
        } catch (error) {
            throw new BadRequestException(`El progreso debe estar dentro del rango de la Serie`)
        }
    }

    async saveVideoGameProgress(videoGameProgressInput: VideoGameProgressInput) {
        try {
            const videoGameProgress = await this.findVideoGameProgress(videoGameProgressInput.profileId, videoGameProgressInput.videoGameId)
            if (videoGameProgress) {
                const updateProgress = await this.videoGameProgressRepository.preload({
                    ...videoGameProgressInput
                })
                await this.videoGameProgressRepository.save(updateProgress);
                return false;
            } else {
                const createProgress = this.videoGameProgressRepository.create({
                    ...videoGameProgressInput
                });
                await this.videoGameProgressRepository.save(createProgress);
                return true
            }
        } catch (error) {
            throw new BadRequestException()
        }
    }
}
