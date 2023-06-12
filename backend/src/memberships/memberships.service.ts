import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembershipInput, UpdateMembershipInput } from './dto/inputs';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsService {

  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository : Repository<Membership>
  ){}

  async create(createMembershipInput: CreateMembershipInput): Promise<Membership> {
    const newMembership = this.membershipRepository.create( createMembershipInput )
    return await this.membershipRepository.save( newMembership )
  }

  async findAll() : Promise<Membership[]> {
    return await this.membershipRepository.find()
  }

  async findOne(id: string): Promise<Membership> {
    try {
      const membership = await this.membershipRepository.findOneByOrFail({ id })
      return membership
    } catch (error) {
      throw new NotFoundException(`membership #${id} not found`)
    }
  
  }

  // update(id: number, updateMembershipInput: UpdateMembershipInput) {
  //   return `This action updates a #${id} membership`;
  // }

  async remove(id: string): Promise<Membership> {
    const membership = await this.findOne(id);
    if ( !membership ) throw new NotFoundException(`membership #${id} not found`)
    await this.membershipRepository.remove(membership)
    return {...membership, id}
  }
}
