import { Query, Resolver } from '@nestjs/graphql';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { SuscriptionService } from '../suscription/suscription.service';
import { UsePowersService } from 'src/use-powers/use-powers.service';
import { UsePower } from 'src/use-powers/entities/use-power.entity';

@Resolver()
export class ReportsResolver {

    constructor (
        private readonly suscriptionService : SuscriptionService,
        private readonly usePowersService : UsePowersService
    ) {}

    @Query(() => [Suscription], { name : 'reportSuscription'})
    async reportSuscription() : Promise<Suscription[]>{
        return this.suscriptionService.reportSuscriptions()
    }

    @Query(() => [UsePower], { name : 'reportInheritedPowers'})
    async reportInheritedPowers() : Promise<UsePower[]>{
        return this.usePowersService.reportInheritedPowers();
    }
}
