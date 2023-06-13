import { Injectable, BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { Profile, User } from './entities';

import { UpdateUserInput } from './dto/inputs/update-user.input';

import { SignupInput } from '../auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileInput, UpdateProfileInput } from './dto/inputs';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger()

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ){}

  //* Funciones para usuarios
  async create(signupInput: SignupInput, cardNumber: string): Promise<User> {
    try {
      const newUser = this.userRepository.create( {
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10),
        creditCard: {cardNumber},
      });

      return await this.userRepository.save( newUser )

    } catch (error) {
      this.handleDBError(error)
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail( {email} )
    } catch (error) {
      throw new NotFoundException(`${ email } not found`);
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail( {id} )
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      //! Preload: busca por el ID y precarga los datos
      const user = await this.userRepository.preload( {...updateUserInput, id} ) 
      return await this.userRepository.save( user );

    } catch (error) {
      this.handleDBError(error);
    }
  }
  
  async block(id: string): Promise<User> {
    
    const userToBlock = await this.findOneById( id );
    userToBlock.isActive = false;
    
    return await this.userRepository.save( userToBlock );
  }

  //* Funciones para Perfiles
  async findAllProfiles(user: User): Promise<Profile[]> {

    const queryBuilder = this.profileRepository.createQueryBuilder()
      .where(`"userId" = :userId`, {userId: user.id});

    return queryBuilder.getMany();
  }

  async createProfile(createProfileInput: CreateProfileInput, user: User): Promise<Profile> {
    try {
      const newProfile = this.profileRepository.create( {
        ...createProfileInput,
        userId: user.id,
      });
      
      return await this.profileRepository.save( newProfile );

    } catch (error) {
      this.handleDBError(error)
    }
  }

  async updateProfile(id: string, updateProfileInput: UpdateProfileInput, userOwner: User): Promise<Profile> {
    try {
      const user = await this.profileRepository.preload(
        {
          ...updateProfileInput, 
          userId: userOwner.id,
          id
        } ) 
      return await this.profileRepository.save( user );

    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findProfileById(user: User): Promise<Profile[]>{
    try {
      return await this.profileRepository.find({
        where: {
          userId: user.id
        }
      })
    } catch (error) {
      throw new NotFoundException(`${ user.id } not found`);
    }
  }

  //* Funciones unicas del servicio
  private handleDBError( error: any): never {
    
    if (error.code === '23505')
      throw new BadRequestException( error.detail.replace('Key ', ''));

    if(error.code === 'error-001')
      throw new BadRequestException( error.detail.replace('Key ', ''));

    
    this.logger.error( error );

    throw new InternalServerErrorException('Please check server logs')
  }
}
