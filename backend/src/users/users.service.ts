import { Injectable, BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';

import { UpdateUserInput } from './dto/inputs/update-user.input';

import { SignupInput } from '../auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger()

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> 
  ){}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create( {
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10)
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

  private handleDBError( error: any): never {
    
    if (error.code === '23505')
      throw new BadRequestException( error.detail.replace('Key ', ''));

    if(error.code === 'error-001')
      throw new BadRequestException( error.detail.replace('Key ', ''));

    
    this.logger.error( error );

    throw new InternalServerErrorException('Please check server logs')
  }
}
