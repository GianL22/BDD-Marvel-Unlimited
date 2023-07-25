import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { RatingRelationInput } from './dto/inputs/rating-relarion.input';
import { RatingsResponse } from 'src/media/types/ratings-response.type';
import { VideoGame } from 'src/media/entities';
import { VideoGameReportResponse } from 'src/reports/types/reports-response.type';

@Injectable()
export class RatingsService {

  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) { }

  async toggleRating(ratingRelationInput: RatingRelationInput): Promise<Boolean> {
    const { rating, ...restInput } = ratingRelationInput
    const ratingMedio = await this.ratingRepository.findOne({ where: { ...restInput } })
    if (ratingMedio) {
      const updateRating = await this.ratingRepository.preload({
        ...ratingRelationInput,
      })
      await this.ratingRepository.save(updateRating);
      return false;
    } else {
      const newRelation = this.ratingRepository.create({
        ...ratingRelationInput,
        rating: rating,
      });
      await this.ratingRepository.save(newRelation);
      return true
    }
  }

  async getAverageRating(medioId: string): Promise<RatingsResponse> {
    const rating: { avg: number, count: number } = await this.ratingRepository.createQueryBuilder('Rating')
      .select('AVG(rating), COUNT("profileId")')
      .where(`"medioId" = '${medioId}'`)
      .getRawOne()
    return {
      ratingAvg: rating.avg,
      ratingCount: rating.count
    }
  }

  async getRatingByProfileId(profileId: string, medioId: string): Promise<number> {
    const rating = await this.ratingRepository.findOne({
      where: {
        profileId: profileId,
        medioId: medioId,
      },
    })
    if (rating)
      return rating.rating
    return 0;
  }

  async reportPlayingAtThelimit(): Promise<VideoGameReportResponse> {

    const videoGames = await this.ratingRepository
      .createQueryBuilder()
      .select(`vg.medioId`)
      .from(VideoGame, "vg")
      .getMany()

    const results: { medioId: string }[] = await this.ratingRepository
      .query(`
        SELECT v."medioId"
        FROM "VideoGame" v JOIN "VideoGamePlatform" vp ON v."medioId" = vp."videoGameId"
          JOIN "Platform" p ON p.id = vp."platformId"
        WHERE	v."type" = 'Acción' AND p."name" = 'PlayStation 4' 
      `)

    const videoGameAvgRating: { avg: number } = await this.ratingRepository
      .createQueryBuilder('Rating')
      .select('AVG(rating)')
      .where(`"medioId" IN (${videoGames.map(videoGame => `'${videoGame.medioId}'`).join(',')})`)
      .getRawOne()

    const ratingsVideoGames = [];
    for (const videoGame of results) {
      const { ratingAvg = 0 } = await this.getAverageRating(videoGame.medioId);
      if (ratingAvg < videoGameAvgRating.avg)
        ratingsVideoGames.push({ ...videoGame, ratingAvg });
    }
    return {
      videoGames: ratingsVideoGames.sort((a, b) => b.ratingAvg - a.ratingAvg),
      avg: videoGameAvgRating.avg
    };
  }

  async getTopRatedMedia(): Promise<any> {
    const ratings = await this.ratingRepository.createQueryBuilder('r')
      .select(`"medioId"`)
      .groupBy(`"medioId"`)
      .orderBy('AVG(rating)', 'DESC')
      .limit(5)
      .getRawMany<{ medioId: string }>();
    const results = await Promise.all(ratings.map(async (queryResult) => {
      return await this.ratingRepository.findOne({ where: { medioId: queryResult.medioId } });
    }));
    return results;
  }

  async getRecommendations(): Promise<{ medioId: string }[]> {
    const results = await this.ratingRepository.query(`
      (SELECT "medioId"
      from "Rating"
      where "medioId" IN (select "medioId" from "Movie")
      group by "medioId"
      order by AVG(rating) DESC
      LIMIT 3)
      
      UNION
      
      (SELECT "medioId"
      from "Rating"
      where "medioId" IN (select "medioId" from "Serie")
      group by "medioId"
      order by AVG(rating) DESC
      LIMIT 3)
      
      UNION
      
      (SELECT "medioId"
      from "Rating"
      where "medioId" IN (select "medioId" from "VideoGame")
      group by "medioId"
      order by AVG(rating) DESC
      LIMIT 3)
    `)

    return results
  }
}
