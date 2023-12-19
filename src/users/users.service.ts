import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './model-entities/user.model-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(user: User): Promise<User> {
    return await this.entityManager.save(user);
  }
}
