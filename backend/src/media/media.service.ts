import { Injectable, BadRequestException, NotFoundException, MethodNotAllowedException } from '@nestjs/common';
import { CreateMediaInput } from './dto/input/create-media.input';
import { Medio, Movie, Serie, VideoGame } from './entities';
import { CreateSerieInput } from './dto/input/create-serie.input';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCompanyInput } from '../companies/dto/input/create-company.input';
import { CompaniesService } from 'src/companies/companies.service';
import { PersonsService } from 'src/persons/persons.service';
import { CreateAudioVisualTypeInput } from './dto/input/create-audiovisual-type.input';
import { AudioVisualType } from './types/audiovisual-type.entity';
import { CreateMovieInput } from './dto/input/create-movie.input';
import { MediaResponse } from './types/media-response.type';
import { CreateVideoGameInput } from './dto/input/create-videogame.input';
import { UpdateSerieInput } from './dto/input/update-serie.input';
import { UpdateMovieInput } from './dto/input/update-movie.input';
import { UpdateVideoGameInput } from './dto/input/update-videogame';
import { Platform } from './entities/platform.entity';
import { MovieReportResponse, SerieReportResponse } from './types/reports-response.type';

@Injectable()
export class MediaService {


  constructor(


    @InjectRepository(Medio)
    private readonly medioRepository: Repository<Medio>,

    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>,

    @InjectRepository(AudioVisualType)
    private readonly audiovisualTypeRepository: Repository<AudioVisualType>,

    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
    
    private readonly companyService: CompaniesService,

    private readonly personsService: PersonsService,




  ){}

  async createMedio( createMediaInput: CreateMediaInput ):Promise<Medio> {

    try {

      const { companyId } = createMediaInput
      const newMedio = this.medioRepository.create({
        companyProduction: { id : companyId },
      })
      return await this.medioRepository.save(newMedio)

    } catch (error) {
      throw new BadRequestException(error)
    }
  }


  async createSerie( createSerieInput: CreateSerieInput ) : Promise<Serie> {

    try {


      const { companyId, creatorId, audioVisualTypeId, ...rest} = createSerieInput

      await this.companyService.findOneById(companyId)
      const serieCreator = await this.personsService.findCreatorById(creatorId)
      const serieAudioVisualType = await this.findOneAudioVisualTypeById(audioVisualTypeId)

      const newMedio = await this.createMedio(createSerieInput)
      const serie = this.serieRepository.create({
        ...rest,
        medioId : newMedio.id,
        releaseDate : new Date(createSerieInput.releaseDate),
        creator : serieCreator,
        audioVisualType : serieAudioVisualType
      })

      return await this.serieRepository.save(serie)


    } catch (error) {
      throw new BadRequestException(error)
    }
  }


  async createMovie( createMovieInput: CreateMovieInput ) : Promise<Movie> {

    try {


      const { companyId, companyDistId, directorId, audioVisualTypeId, ...rest} = createMovieInput

      await this.companyService.findOneById(companyId)
      
      const companyDist = await this.companyService.findOneById(companyDistId)
      const director = await this.personsService.findDirectorById(directorId)
      const audioVisualType = await this.findOneAudioVisualTypeById(audioVisualTypeId)

      const newMedio = await this.createMedio(createMovieInput)
      const movie = this.movieRepository.create({
        ...rest,
        medioId : newMedio.id,
        releaseDate : new Date(createMovieInput.releaseDate),
        director,
        audioVisualType,
        companyDist,
      })

      return await this.movieRepository.save(movie)


    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async createVideoGame( createVideoGameInput: CreateVideoGameInput ) : Promise<VideoGame> {

    try {
    
      const { companyId, companyPublisherId,...rest} = createVideoGameInput

      await this.companyService.findOneById(companyId)
      const companyPublisher = await this.companyService.findOneById(companyPublisherId)

      const platforms : Platform[] = createVideoGameInput.platforms.map( (platform) => {
        return this.platformRepository.create({ id : platform.id })
      })

      const newMedio = await this.createMedio(createVideoGameInput)
      const movie = this.videoGameRepository.create({
        ...rest,
        medioId : newMedio.id,
        releaseDate : new Date(createVideoGameInput.releaseDate),
        companyPublisher,
        platforms,
      })

      return await this.videoGameRepository.save(movie)


    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async createAudiovisualType(createAudioVisualTypeInput : CreateAudioVisualTypeInput) : Promise<AudioVisualType>{
    try {  

      const audioVisualTypeExists = await this.audiovisualTypeRepository.findOneBy( {
        description: createAudioVisualTypeInput.description
      } )
      if ( audioVisualTypeExists ) throw new Error(`El tipo ${createAudioVisualTypeInput.description} ya existe`)
      const newAudioVisualType = this.audiovisualTypeRepository.create( createAudioVisualTypeInput )
      return await this.audiovisualTypeRepository.save( newAudioVisualType )
      
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async createPlatform( namePlatform : string): Promise<Platform>{
    try {  

      const platformExists = await this.platformRepository.findOneBy( {
        name: namePlatform
      } )
      if ( platformExists ) throw new Error(`El tipo ${namePlatform} ya existe`)
      const newPlatform = this.platformRepository.create( { name : namePlatform } )
      return await this.platformRepository.save( newPlatform )

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  

  async findAllPlatforms(): Promise<Platform[]>{
    return await this.platformRepository.find({
        order : {
            name : 'ASC'
        }
    })
  }

  
  async updateMedio ( updateSerieInput : UpdateSerieInput) : Promise<Serie>{

    const { medioId } = updateSerieInput
    await this.findSerieById( medioId )

    const updatedSerie = await this.serieRepository.preload( updateSerieInput )
    if ( updatedSerie ) return this.serieRepository.save( updatedSerie )
    throw new NotFoundException(`serie con el id ${ medioId } no se encontro`)

  }

  async updateSerie ( updateSerieInput : UpdateSerieInput) : Promise<Serie>{

    const { medioId } = updateSerieInput
    await this.findSerieById( medioId )

    const updatedSerie = await this.serieRepository.preload( updateSerieInput )
    if ( updatedSerie ) return this.serieRepository.save( updatedSerie )
    throw new NotFoundException(`serie con el id ${ medioId } no se encontro`)

  }

  async updateMovie ( updateMovieInput : UpdateMovieInput ) : Promise<Movie>{

    const { medioId } = updateMovieInput
    await this.findMovieById( medioId )
    const updatedMovie = await this.movieRepository.preload( updateMovieInput )
    if ( updatedMovie ) return this.movieRepository.save( updatedMovie )
    throw new NotFoundException(`serie con el id ${ medioId } no se encontro`)

  }

  async updateVideoGame ( updateVideoGameInput : UpdateVideoGameInput ) : Promise<VideoGame>{

    const { medioId } = updateVideoGameInput
    await this.findVideoGameById( medioId )

    const updatedVideoGame = await this.videoGameRepository.preload( updateVideoGameInput )
    if ( updatedVideoGame ) return this.videoGameRepository.save( updateVideoGameInput )
    throw new NotFoundException(`serie con el id ${ medioId } no se encontro`)

  }

  async findOneAudioVisualTypeById(id : string) : Promise<AudioVisualType>{

    try {
      return await this.audiovisualTypeRepository.findOneByOrFail({id})      
    } catch (error) {
      throw new NotFoundException(`${id} not found`)
    }

  }

  async findAllAudiovisualTypes() : Promise<AudioVisualType[]>{
    try {
      return await this.audiovisualTypeRepository.find()
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findSerieById( id : string ):Promise<Serie> {
    try {
      return this.serieRepository.findOneByOrFail( { medioId : id } )
    } catch (error) {
      throw new NotFoundException('Serie no encontrada')
    }
  } 

  
  async findMovieById( id : string ):Promise<Movie> {
    try {
      return this.movieRepository.findOneByOrFail( { medioId : id } )
    } catch (error) {
      throw new NotFoundException('Movie no encontrada')
    }
  } 

  
  async findVideoGameById( id : string ):Promise<VideoGame> {
    try {
      return this.videoGameRepository.findOneByOrFail( { medioId : id } )
    } catch (error) {
      throw new NotFoundException('Videogame no encontrada')
    }
  } 


  async findAll():Promise<MediaResponse> {
    
    const repositories = [ this.movieRepository, this.serieRepository, this.videoGameRepository ]
    const promiseRepositories = []
    
    
    for ( const repository of repositories ){
      promiseRepositories.push( repository.find() ) 
    }

    const [ movies, series, videoGames ] = await Promise.all( promiseRepositories )

    return { movies, series, videoGames }
  }

  
  async removeMedio( id: string ) {
    try {
      const medio = await this.medioRepository.findOneByOrFail( { id } )
      await this.medioRepository.remove( medio )
      return true;
    } catch (error) {
      throw new NotFoundException(`El personaje: ${id} tiene otras relaciones`)
    }    
  }

  async reportSerie() : Promise<SerieReportResponse>{


    const querybuilder = this.serieRepository.createQueryBuilder('serie')

    const series = await querybuilder
    .select()
    .where(
      `serie.episodes > ${querybuilder
        .subQuery()
        .select('AVG(episodes)')
        .from(Serie, 'serie')
        .getQuery()}`
    )
    .getMany();


    const avg = await this.serieRepository.average('episodes')

    return {avg, series}
  
  }


  async reportMovie() : Promise<MovieReportResponse>{

    const querybuilder = this.movieRepository.createQueryBuilder('movie')
    
    const { id } = await this.audiovisualTypeRepository.findOneByOrFail({
      description : 'Animada' //por cambiar
    })


    const movies = await querybuilder
    .select()
    .where(`"audioVisualType" = '${id}'`)
    .andWhere(`"duration" > '150'`)
    .andWhere(`"revenue" > ${querybuilder
      .subQuery()
      .select('AVG("revenue")')
      .from(Movie, 'movie')
      .getQuery()}`
      )
    .getMany();

    const avg = await this.movieRepository.average('revenue')

    return {avg, movies}
    
  
  }



  // findOne(id: number) {
  //   return `This action returns a #${id} media`;
  // }

  // update(id: number, updateMediaInput: UpdateMediaInput) {
  //   return `This action updates a #${id} media`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} media`;
  // }
}
