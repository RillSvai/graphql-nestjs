import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../model-entities/user.model-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UsernameExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async transform(value: any): Promise<any> {
    const { username, id } = value;
    if (!username) {
      return value;
    }
    const user: User | null = await this.usersRepository.findOne({
      where: {
        username,
        id: Not(id),
      },
    });
    if (user) {
      throw new BadRequestException(
        `User with name ${value.username} already exist`,
      );
    }
    return value;
  }
}
