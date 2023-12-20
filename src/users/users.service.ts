import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './model-entities/user.model-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserSettings } from './model-entities/user-settings.model-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) {}

  async find(): Promise<User[]> {
    return await this.usersRepository.find({ relations: { settings: true } });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.usersRepository.save(
      new User({ ...createUserInput, settings: new UserSettings({}) }),
    );
  }

  async update(user: User, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.usersRepository.save(
      new User({
        ...user,
        ...updateUserInput,
        settings: new UserSettings({
          ...updateUserInput.settings,
          id: user.settings?.id,
        }),
      }),
    );
  }
  async remove(user: User): Promise<User> {
    await this.usersRepository.delete(user.id);
    await this.userSettingsRepository.delete(user.settings.id);
    return user;
  }
}
