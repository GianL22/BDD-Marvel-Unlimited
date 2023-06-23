import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsePower } from './entities/use-power.entity';
import { Repository } from 'typeorm';
import { CreateUsePowerInput } from './dto/inputs';

interface VillainResult {
  characterId: string;
}

interface PowersResult{
  powerId: string;
}

@Injectable()
export class UsePowersService {

  constructor(
    @InjectRepository(UsePower)
    private readonly  usePowersRepository: Repository<UsePower>,
  ){}

  async create(createUsePowerInput: CreateUsePowerInput): Promise<UsePower> {
    try {
      const usePower = await this.findOneByIds(createUsePowerInput.characterId, createUsePowerInput.powerId);
      if(usePower)
        throw new Error
      const newUsePower = this.usePowersRepository.create( {...createUsePowerInput} );
      return await this.usePowersRepository.save(newUsePower);
    } catch (error) {
      throw new BadRequestException(`El personaje: ${createUsePowerInput.characterId} ya posee: ${createUsePowerInput.powerId} `)
    }
  }

  async findAll(): Promise<UsePower[]> {
    return await this.usePowersRepository.find();
  }

  async findOneByIds(characterId: string, powerId: string): Promise<UsePower>{
    return await this.usePowersRepository.findOneBy({characterId, powerId})
  }

  async remove(characterId: string, powerId: string) {
    try {
      const usePower = await this.findOneByIds(characterId, powerId)
      if(!usePower)
        throw new Error
      await this.usePowersRepository.remove( usePower )
      return true;
    } catch (error) {
      throw new NotFoundException(`El poder: ${powerId} no lo posee el personaje: ${characterId}`)
    } 
  }

  async reportInheritedPowers(): Promise<any[]>{
    const  villain: VillainResult[]  = await this.usePowersRepository.query(`
      SELECT DISTINCT "use"."characterId"
      FROM "UsePower" "use" JOIN "Power" "p" ON "use"."powerId" = "p"."id"
      where "p"."name" LIKE '%Super%' 
            AND "use"."inherited" = TRUE
            AND "use"."characterId" IN ( Select "characterId"
                                         from "Villain")
    `)

    const queryResults: PowersResult[] = await this.usePowersRepository.query(`
      SELECT "use"."powerId"
      FROM "UsePower" "use" JOIN "Power" "p" ON "use"."powerId" = "p"."id"
      where  "use"."characterId" IN ( 
        ${ villain.map(vil => `'${vil.characterId}'`).join(',') }
      )
      group by "use"."powerId"
      HAVING ( COUNT("use"."characterId") > 1 )
    `)

    const inheritedPowers = await Promise.all(queryResults.map(async (queryResult) => {
      const filterResult = Promise.all(villain.map(async (vil) => {
        return await this.findOneByIds(vil.characterId, queryResult.powerId);
      }));
      return (await filterResult).filter((value) => value !== null)
    }));

    const reportResult = inheritedPowers.map(result => {
      const powerId = result[0].powerId;
      const characterIds = result.map(villain => villain.characterId);
      return {
        powerId,
        characterIds
      };
    })
    .flat();
    return reportResult;
  }
}
