import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { Fight } from './entities/fight.entity';
import { PlacesService } from 'src/places/places.service';
import { CharactersService } from 'src/characters/characters.service';
import { PowersService } from 'src/powers/powers.service';
import { ObjectsService } from 'src/objects/objects.service';
import { RemoveFightInput } from './dto/remove-fight.input';
import { CharacterPowerAndObject, FightResponse, PowerAndObjectUsedInputElement } from './types/fight-response.type';
import { ObjectsMostUsedReportResponse, PlacesFightReportResponse } from 'src/reports/types/reports-response.type';


@Injectable()
export class FightsService {

  constructor(

    @InjectRepository(Fight)
    private readonly fightRepository: Repository<Fight>,

    private readonly placesService: PlacesService,

    private readonly charactersService: CharactersService,

    private readonly powersService: PowersService,

    private readonly objectsService: ObjectsService,

  ) { }
  async create({ characterPowerAndObjects, date, placeId }: CreateFightInput): Promise<Fight[]> {

    try {
      const place = await this.placesService.findOnePlace(placeId)
      console.log(characterPowerAndObjects)
      const allFightsPromises = characterPowerAndObjects.map(async ({ characterId, powerAndObjectUsedInput }) => {

        const character = await this.charactersService.findOneCharacterById(characterId)
        if (powerAndObjectUsedInput.length == 0) powerAndObjectUsedInput.push({ powerId: null, objectId: null })

        const fightsPromises = powerAndObjectUsedInput.map(async ({ powerId, objectId }) => {

          const powerAndObject = { power: null, object: null };

          if (powerId) powerAndObject.power = await this.powersService.findOneById(powerId)
          if (objectId) powerAndObject.object = await this.objectsService.findOneById(objectId)

          const fight = this.fightRepository.create({ ...powerAndObject, character, place, date })
          return fight;
        })

        const fightsByCharacter = await Promise.all(fightsPromises)

        await this.fightRepository.save(fightsByCharacter)

        return fightsByCharacter;

      })

      const allFights = await Promise.all(allFightsPromises)

      return allFights.flat();

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }




  async findAll(): Promise<any[]> { //cambiar tipo

    const res = await this.fightRepository.createQueryBuilder()
      .select('f.date')
      .addSelect('f.placeId')
      .from('Fight', 'f')
      .groupBy('f.placeId')
      .addGroupBy('f.date')
      .getRawMany()

    const placesAndDate = res.map(async (r) => {


      const place = await this.placesService.findOnePlace(r.placeId);
      return { date: r.f_date.toISOString(), place }
    })
    return placesAndDate;

  }

  async findAllByPlaceAndDate(placeId: string, date: string): Promise<FightResponse> {


    console.log("entro")

    const fights = await this.fightRepository.find({
      where: {
        place: { id: placeId },
        date,
      },
    });


    const characterPowerAndObjects: CharacterPowerAndObject[] = []

    fights.forEach(({ character: c1 }) => {

      const finded = characterPowerAndObjects.find((c) => c.character.id == c1.id)

      if (!finded) {
        const powerAndObjectUsedInput: PowerAndObjectUsedInputElement[] = [];

        fights.forEach(({ character: c2, power, object }) => {

          if (c1.id == c2.id) {
            powerAndObjectUsedInput.push({
              power: power || null,
              object: object || null,
            })
          }
        })

        characterPowerAndObjects.push({
          character: c1,
          powerAndObjectUsedInput,
        })
      }

    })

    const res: FightResponse = {
      place: fights[0].place,
      date,
      characterPowerAndObjects
    }
    console.log("salio")

    return res

  }


  async remove(removeFightInput: RemoveFightInput): Promise<Boolean> {

    const { date, characterId, objectId, powerId } = removeFightInput
    let removeOptions = { date }

    if ((objectId || powerId) && (!characterId)) {
      throw new BadRequestException('No se puede eliminar un objeto o poder sin un personaje');
    }
    if (objectId && powerId) {
      throw new BadRequestException('No se puede eliminar un objeto y un poder al mismo tiempo');
    }

    Object.keys(removeFightInput).forEach(key => {
      if (key == "date") return;

      let keyOption = key.substring(0, key.length - 2)

      removeOptions[keyOption] = { id: removeFightInput[key] }
    })
    const fights = await this.fightRepository.findBy(removeOptions)
    if (fights.length == 0) throw new NotFoundException(`Combate no encontrado`)

    await this.fightRepository.remove(fights)
    return true;
  }

  async reportPlacesFight(): Promise<PlacesFightReportResponse[]> {

    const res = await this.fightRepository.createQueryBuilder()
      .select('COUNT(DISTINCT("f"."date"))', 'count')
      .addSelect('MAX(f.date)', 'max')
      .addSelect('p.name', 'name')
      .from('Fight', 'f')
      .innerJoin('Place', 'p', 'f.placeId = p.id')
      .groupBy('f.placeId')
      .addGroupBy('p.name')
      .orderBy('COUNT(DISTINCT("f"."date"))', 'DESC')
      .limit(3)
      .getRawMany()


    return res.map(({ count, max, name }) => {
      return {
        id: name,
        name,
        count,
        max: max.toISOString().substring(0, 10)
      }
    })

  }

  async reportObjectsMostUsed(): Promise<ObjectsMostUsedReportResponse[]> {

    const res = await this.fightRepository.query(`
        SELECT "O"."name", "O"."description", "Ob"."description" "type", COUNT(DISTINCT("F"."id"))
        FROM "Fight" "F" JOIN "Object" "O"
        ON ("F"."objectId" = "O".id)
        JOIN "ObjectType" "Ob"
        ON ("O"."objectTypeId" = "Ob".id) 
        WHERE "F"."powerId" is NULL
        AND (
          "F"."characterId" IN (Select "characterId" from "Villain") 
          OR "F"."characterId" IN (Select "characterId" from "Hero")
        ) 
        GROUP BY ("O"."name", "O"."description", "Ob"."description", "F"."objectId") 
        ORDER BY COUNT(DISTINCT("F"."date")) DESC
        LIMIT 5

    
    `)


    return res.map(({ count, name, description, type }) => {
      return {
        id: name,
        name,
        description,
        type,
        count
      }
    })

  }



}
