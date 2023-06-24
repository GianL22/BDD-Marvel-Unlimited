import { Query, Resolver } from '@nestjs/graphql';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { SuscriptionService } from '../suscription/suscription.service';
import { PowersService } from 'src/powers/powers.service';
import { Power, UsePower } from 'src/powers/entities';

@Resolver()
export class ReportsResolver {

    constructor (
        private readonly suscriptionService : SuscriptionService,
        private readonly powersService : PowersService,
    ) {}

    @Query(() => [Suscription], { name : 'reportSuscription'})
    async reportSuscription() : Promise<Suscription[]>{
        return this.suscriptionService.reportSuscriptions()
    }

    @Query(() => [Power], { name : 'reportInheritedPowers'})
    async reportInheritedPowers() : Promise<UsePower[]>{
        return this.powersService.reportInheritedPowers();
    }
}
