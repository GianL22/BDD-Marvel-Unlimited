import { Query, Resolver } from '@nestjs/graphql';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { ReportsService } from './reports.service';
import { SuscriptionService } from '../suscription/suscription.service';

@Resolver()
export class ReportsResolver {

    constructor (
        private readonly reportsService : ReportsService

    ) {}

    @Query(() => [Suscription], { name : 'reportSuscription'})
    async reportSuscription() : Promise<Suscription[]>{
        return this.reportsService.reportSuscriptions()
    }

}
