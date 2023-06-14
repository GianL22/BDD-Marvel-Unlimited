import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suscription } from './entities/suscription.entity';
import { CreateSuscriptionInput, UpdateSuscriptionInput } from './dto/inputs';
import { User } from 'src/users/entities';
import { MembershipsService } from '../memberships/memberships.service';
import { TypeMemberships } from 'src/memberships/enums/type-memberships.enum';

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
        membership : membership.id,
        user : user.id,
        dateSuscription: new Date(dateSuscription),
        dateEnd, 
        userId : user.id,
        membershipId : membership.id,
      })
      return await this.suscriptionRepository.save(newSuscription);
    } catch (error) {
      throw new InternalServerErrorException('Algo ocurrió mal en la creacion de la suscripcion')
    }
  }

  async changeSuscription(createSuscriptionInput: CreateSuscriptionInput, user : User): Promise<Suscription> {

    const suscription = await this.suscriptionRepository.findOne({ where: { userId : user.id, isActive : true }})
    if ( suscription ){
      suscription.isActive = false;
      suscription.dateEnd = new Date();
      return await this.suscriptionRepository.save(suscription);
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

  async reportSuscriptions() : Promise<Suscription[]> {
    try {


      const { id  :  goldId } = await this.membershipsService.findOneByName(TypeMemberships.gold);  
      const { id  :  premiumId } = await this.membershipsService.findOneByName(TypeMemberships.premium);  

  
      const today = new Date()
      const fourMonthsAgo = new Date()
      fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);


      const subQuery = this.suscriptionRepository.createQueryBuilder("Suscription")
        .select('Suscription.userId')
        // .addSelect('Suscription.dateSuscription')
        .where("Suscription.membershipId = :oldMembership", { oldMembership: premiumId })
        .andWhere("Suscription.isActive = :active", { active: true })
        // .andWhere(`Suscription.dateSuscription > '${fourMonthsAgo.toISOString().slice(0,10)}'`)

      const queryBuilder = this.suscriptionRepository.createQueryBuilder()
        .select('Suscription')
        .where("Suscription.membershipId = :oldMembership", { oldMembership: goldId })
        .andWhere("Suscription.isActive = :active", { active: false })
        .andWhere(`Suscription.dateEnd BETWEEN '${fourMonthsAgo.toISOString().slice(0,10)}' AND '${today.toISOString().slice(0,10)}'`)
        .andWhere("Suscription.userId IN (" + subQuery.getQuery() + ")")
        .setParameters( subQuery.getParameters() )
        
        console.log(queryBuilder.getQuery())

      return  await queryBuilder.getMany(); 

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error en el servidor')
    }

  }


  update(id: number, updateSuscriptionInput: UpdateSuscriptionInput) {
    return `This action updates a #${id} suscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscription`;
  }
}
