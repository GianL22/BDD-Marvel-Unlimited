import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';
import { Suscription } from './entities/suscription.entity';
import { CreateSuscriptionInput, UpdateSuscriptionInput } from './dto/inputs';
import { User } from 'src/users/entities';
import { MembershipsService } from '../memberships/memberships.service';
import { TypeMemberships } from 'src/memberships/enums/type-memberships.enum';
import { Membership } from 'src/memberships/entities/membership.entity';


@Injectable()
export class SuscriptionService {

  constructor(

    private readonly membershipsService : MembershipsService,

    @InjectRepository(Suscription)  
    private readonly suscriptionRepository: Repository<Suscription>,

  ){}

  async createSuscription(createSuscriptionInput: CreateSuscriptionInput, user : User): Promise<Suscription> {

    try { 
    
      const { dateSuscription } = createSuscriptionInput;
      const dateEnd = new Date(dateSuscription);
      dateEnd.setMonth(dateEnd.getMonth() + 1);
      
      const membership = await this.membershipsService.findOne(createSuscriptionInput.membership);

      const newSuscription = this.suscriptionRepository.create({
        dateSuscription: new Date(dateSuscription),
        dateEnd : dateEnd,
        userId : user.id,
        membershipId : membership.id,
      })
      
      return await this.suscriptionRepository.save(newSuscription);
    } catch (error) {
      // console.log(error)
      throw new InternalServerErrorException('Algo ocurrió mal en la creacion de la suscripcion')
    }
  }

  async changeSuscription(createSuscriptionInput: CreateSuscriptionInput, user : User): Promise<Suscription> {

    const suscription = await this.suscriptionRepository.findOne({ where: { userId : user.id, isActive : true }})
    if ( suscription ){
      suscription.isActive = false;
      suscription.dateEnd = new Date();
      await this.suscriptionRepository.save(suscription);
    }
    return await this.createSuscription(createSuscriptionInput, user);
  }

  async findOneActiveByUser(user : User) : Promise<Suscription> {
    try {
        return await this.suscriptionRepository.findOneOrFail({ where: { userId : user.id, isActive : true }})
    } catch (error) {
        throw new NotFoundException('No existe una suscripcion activa para este usuario')
    }
  }


  async findMembershipByUser(user : User): Promise<Membership>{
    const suscriptionActive = await this.findOneActiveByUser(user)
    return await this.membershipsService.findOne(suscriptionActive.membershipId)
  }

  update(id: number, updateSuscriptionInput: UpdateSuscriptionInput) {
    return `This action updates a #${id} suscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscription`;
  }


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
      // console.log(error)
      throw new InternalServerErrorException('Error en el servidor')
    }
  }


}
