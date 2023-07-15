import { Injectable, BadRequestException, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreatePowerInput, UpdatePowerInput, CreateUsePowerInput, UpdateUsePowerInput } from './dto/inputs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsePower, Power } from './entities';

interface VillainResult {
  characterId: string;
}

interface PowersResult {
  powerId: string;
}

interface Character {
  characterId: string;
  powers: string[];
}

interface QueryResponse {
  powerId: string,
  characterId: string
}

@Injectable()
export class PowersService {

  constructor(
    @InjectRepository(Power)
    private readonly powersRepository: Repository<Power>,

    @InjectRepository(UsePower)
    private readonly usePowersRepository: Repository<UsePower>,
  ) { }

  //TODO: Pensar luego a futuro, si guardo todo en mayuscula (La inicial)
  //! NOTA: Lo q haga aqui hacerlo en color luego
  async create(createPowerInput: CreatePowerInput): Promise<Power> {
    try {
      const { name, description } = createPowerInput;
      const power = this.powersRepository.create({
        name: name,
        description
      });
      return await this.powersRepository.save(power);
    } catch (error) {
      throw new BadRequestException(`El poder: ${createPowerInput.name} ya se encuentra registrado`)
    }
  }

  async findAll(): Promise<Power[]> {
    return await this.powersRepository.find({
      order: {
        name: 'ASC'
      }
    });
  }

  async findOneById(id: string): Promise<Power> {
    try {
      return await this.powersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${id} not found`);
    }
  }

  async update(id: string, updatePowerInput: UpdatePowerInput): Promise<Power> {
    try {
      const power = await this.powersRepository.preload({ ...updatePowerInput, id })
      return await this.powersRepository.save(power);
    } catch (error) {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }
  }

  async remove(id: string) {
    try {
      const power = await this.powersRepository.findOne({ where: { id } })
      await this.powersRepository.remove(power)
      return true;
    } catch (error) {
      throw new MethodNotAllowedException(`El poder: ${id} NO se puede eliminar`)
    }
  }

  async getPowerName(id: string): Promise<string> {
    return (await this.findOneById(id)).name
  }

  async getPowerDescription(id: string): Promise<string> {
    return (await this.findOneById(id)).description
  }

  async getPowers(powersId: string[]): Promise<Power[]> {
    const powers = Promise.all(
      powersId.map(powerId => this.findOneById(powerId))
    );
    return powers;
  }

  //* Funciones para la relación UsePower

  async createRelation({ powers, characterId }: CreateUsePowerInput): Promise<UsePower[]> {
    try {
      const usePowers = powers.map((power) => {
        return this.usePowersRepository.create({ ...power, characterId: characterId })
      })
      return await this.usePowersRepository.save(usePowers);
    } catch (error) {
      throw new BadRequestException(`Hubo un error al crear los poderes`)
    }
  }

  async findOneByIds(characterId: string, powerId: string): Promise<UsePower> {
    return await this.usePowersRepository.findOneBy({ characterId, powerId })
  }

  async removeRelation(characterId: string, powerId: string) {
    try {
      const usePower = await this.findOneByIds(characterId, powerId)
      if (!usePower)
        throw new Error
      await this.usePowersRepository.remove(usePower)
      return true;
    } catch (error) {
      throw new NotFoundException(`El poder: ${powerId} no lo posee el personaje: ${characterId}`)
    }
  }

  async updateRelation(powerId: string, characterId: string, updateUsePowerInput: UpdateUsePowerInput): Promise<UsePower> {
    try {
      const usePower = await this.usePowersRepository.preload({ ...updateUsePowerInput, characterId, powerId })
      return await this.usePowersRepository.save(usePower);
    } catch (error) {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }
  }

  async reportInheritedPowers(): Promise<any[]> {
    const villain: VillainResult[] = await this.usePowersRepository.query(`
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
        ${villain.map(vil => `'${vil.characterId}'`).join(',')}
      )
      AND "p"."name" LIKE '%Super%' AND "use"."inherited" = TRUE
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

  async reportNaturalPowers(): Promise<Character[]> {

    const characters = await this.usePowersRepository.query(`
      Select usepower."powerId", usepower."characterId"
      from "Organization" org JOIN "UsePower" usepower ON org.leader = usepower."characterId"
      where usepower."type" = 'Artificial' 
        AND( 
          org.leader IN (Select "characterId" from "Villain") OR
          org.leader IN (Select "characterId" from "Hero")
        )
    `)

    const results: Character[] = characters.reduce((acc: Character[], curr: QueryResponse) => {
      const existingCharacter = acc.find(c => c.characterId === curr.characterId);
      if (existingCharacter)
        existingCharacter.powers.push(curr.powerId);
      else {
        acc.push({
          characterId: curr.characterId,
          powers: [curr.powerId]
        });
      }
      return acc;
    }, []);

    return results;
  }

}