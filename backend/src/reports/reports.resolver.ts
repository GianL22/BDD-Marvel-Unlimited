import { Query, Resolver } from '@nestjs/graphql';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { SuscriptionService } from '../suscription/suscription.service';
import { MediaService } from '../media/media.service';
import { PowersService } from 'src/powers/powers.service';
import { Power, UsePower } from 'src/powers/entities';
import { MovieReportResponse, SerieReportResponse } from 'src/media/types/reports-response.type';
import { RatingsService } from '../ratings/ratings.service';
import { NaturalPowersReportResponse, ObjectsMostUsedReportResponse, PlacesFightReportResponse, VideoGameReportResponse } from './types/reports-response.type';
import { CharactersService } from '../characters/characters.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { FightsService } from '../fights/fights.service';

@Resolver()
export class ReportsResolver {

    constructor(
        private readonly suscriptionService: SuscriptionService,

        private readonly mediaService: MediaService,

        private readonly powersService: PowersService,

        private readonly ratingsService: RatingsService,

        private readonly charactersService: CharactersService,

        private readonly organizationsService: OrganizationsService,

        private readonly fightsService : FightsService
    ) { }

    @Query(() => [Suscription], { name: 'reportSuscription' })
    async reportSuscription(): Promise<Suscription[]> {
        return this.suscriptionService.reportSuscriptions()
    }

    @Query(() => SerieReportResponse, { name: 'reportSerie' })
    async reportSerie(): Promise<SerieReportResponse> {
        return this.mediaService.reportSerie()
    }

    @Query(() => MovieReportResponse, { name: 'reportMovie' })
    async reportMovie(): Promise<MovieReportResponse> {
        return this.mediaService.reportMovie()
    }

    @Query(() => [Power], { name: 'reportInheritedPowers' })
    async reportInheritedPowers(): Promise<UsePower[]> {
        return this.powersService.reportInheritedPowers();
    }

    @Query(() => VideoGameReportResponse, { name: 'reportPlayingAtThelimit' })
    async reportPlayingAtThelimit(): Promise<VideoGameReportResponse> {
        const { videoGames: mediosIds, avg } = await this.ratingsService.reportPlayingAtThelimit();
        const videoGames = await Promise.all(mediosIds.map(async (videoGame) => {
            return await this.mediaService.findVideoGameById(videoGame.medioId);
        }));
        return {
            avg,
            videoGames: videoGames
        };
    }

    @Query(() => [NaturalPowersReportResponse], { name: 'reportNaturalPowers' })
    async reportNaturalPowers(): Promise<NaturalPowersReportResponse[]> {
        const characters = await this.powersService.reportNaturalPowers();
        const reportResponse = await Promise.all(characters.map(async (hero) => {
            return {
                characterName: await this.charactersService.getNameCharacter(hero.characterId),
                characterRol: await this.charactersService.getRolCharacter(hero.characterId),
                naturalPowers: await this.powersService.getPowers(hero.powers),
                organizationName: await this.organizationsService.getOrganizationName(hero.characterId),
            }
        }));
        return reportResponse;
    }
    @Query(() => [PlacesFightReportResponse], { name: 'reportPlacesFight' })
    async reportPlacesFight() : Promise<PlacesFightReportResponse[]>{
        return this.fightsService.reportPlacesFight();
    }

    @Query(() => [ObjectsMostUsedReportResponse], { name: 'reportObjectsMostUsed' })
    async reportObjectsMostUsed() : Promise<ObjectsMostUsedReportResponse[]>{
        return this.fightsService.reportObjectsMostUsed();
    }


}
