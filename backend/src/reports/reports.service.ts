import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MembershipsService } from 'src/memberships/memberships.service';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { TypeMemberships } from 'src/memberships/enums/type-memberships.enum';

@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(Suscription)
        private readonly suscriptionRepository : Repository<Suscription>,
       
        private readonly membershipsService : MembershipsService,
    ){}



    async reportSuscriptions() : Promise<Suscription[]> {
        try {
          
          const { id  :  goldId } = await this.membershipsService.findOneByName(TypeMemberships.Gold);  
          const { id  :  premiumId } = await this.membershipsService.findOneByName(TypeMemberships.Premium);  

          const today = new Date()
          const fourMonthsAgo = new Date()
          fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
    
          const queryresults  : Suscription[] = await this.suscriptionRepository.query(`
            SELECT *
            from "Suscription"
            where "membershipId" = '${premiumId}'
              AND "isActive" = TRUE
              AND "userId" IN ( SELECT "userId"
                                from "Suscription"
                                where "membershipId" = '${goldId}'
                                AND "isActive" = false
                                AND "dateEnd" BETWEEN '${fourMonthsAgo.toISOString().slice(0,10)}' AND '${today.toISOString().slice(0,10)}')
          `)
    
          const suscriptions = queryresults.map((queryResult) => {
              return this.suscriptionRepository.create({...queryResult})
          })           
          
          return suscriptions
    
        } catch (error) {
          console.log(error)
          throw new InternalServerErrorException('Error en el servidor')
        }
    
      }
}
