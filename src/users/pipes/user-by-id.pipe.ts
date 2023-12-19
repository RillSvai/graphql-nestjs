import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from '../model-entities/user.model-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserByIdPipe implements PipeTransform<number, Promise<User>> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async transform(value: number): Promise<User> {
    const user: User | null = await this.usersRepository.findOneBy({
      id: value,
    });

    if (!user) {
      throw new NotFoundException(
        'User doesn`t exist',
        'Try provide another identifier',
      );
    }
    return user;
  }
}
