import { Query, Resolver } from '@nestjs/graphql';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { SuscriptionService } from '../suscription/suscription.service';
import { Movie, Serie } from 'src/media/entities';
import { MediaService } from '../media/media.service';
import { PowersService } from 'src/powers/powers.service';
import { Power, UsePower } from 'src/powers/entities';
import { MovieReportResponse, SerieReportResponse } from 'src/media/types/reports-response.type';

@Resolver()
export class ReportsResolver {

    constructor (
        private readonly suscriptionService : SuscriptionService,

        private readonly mediaService : MediaService,
         
        private readonly powersService : PowersService,
    ) {}

    @Query(() => [Suscription], { name : 'reportSuscription'})
    async reportSuscription() : Promise<Suscription[]>{
        return this.suscriptionService.reportSuscriptions()
    }



    @Query(() => SerieReportResponse, { name : 'reportSerie' })
    async reportSerie() : Promise<SerieReportResponse>{
        return this.mediaService.reportSerie()
    }
    
    @Query(() => MovieReportResponse, { name : 'reportMovie' })
    async reportMovie() : Promise<MovieReportResponse>{
        return this.mediaService.reportMovie()
    }


    @Query(() => [Power], { name : 'reportInheritedPowers'})
    async reportInheritedPowers() : Promise<UsePower[]>{
        return this.powersService.reportInheritedPowers();
    }

}
