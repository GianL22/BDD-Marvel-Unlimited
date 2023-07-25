import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medio } from 'src/media/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {

    constructor(

        @InjectRepository(Medio)
        private readonly medioRepository: Repository<Medio>,


    ){}

    private async getMediosId (list: {medioId: string}[]): Promise<Medio[]> {
        const results = list.map((queryResult) => {
          queryResult.medioId
          return this.medioRepository.create({ id: queryResult.medioId })
        })
        return results;
      }


    async getSearchResults(toSearch : string): Promise<Medio[]>{

        if (toSearch == '') return []; 

        const res = await  this.medioRepository.query(`
        (SELECT "medioId"
        FROM "Movie"
        WHERE title ILIKE '%${toSearch}%'
        UNION
        SELECT "medioId"
        FROM "VideoGame"
        WHERE title ILIKE '%${toSearch}%'
        UNION
        SELECT "medioId"
        FROM "Serie"
        WHERE title ILIKE '%${toSearch}%')
        ORDER BY ("medioId") ASC    
        `)


        return await this.getMediosId(res)

    }

    
}
