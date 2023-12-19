import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './model-entities/user.model-entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }
}
